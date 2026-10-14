import { cookies } from 'next/headers';
import { createHmac } from 'crypto';

const SESSION_COOKIE = 'ethixweb_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours
const DEFAULT_ADMIN_HASH = '$2b$10$Ok/cJLOL4yHfX4dNSZrX3O6wenTsXWj.QkPjbsnxz07jIm/Hau5MO'; // hash of 'admin123'

function getSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-dev-secret-change-me';
  return secret;
}

export interface SessionPayload {
  email: string;
  issuedAt: number;
  expiresAt: number;
}

export function createSessionToken(email: string): string {
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const secret = getSecret();
  const sig = createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, sig] = parts;
  const secret = getSecret();
  const expectedSig = createHmac('sha256', secret).update(data).digest('base64url');
  if (sig !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8')) as SessionPayload;
    if (Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(email: string): Promise<void> {
  const token = createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // 'lax' prevents cookie dropping across navigation & redirects on Vercel
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export function getAdminConfig(): {
  email: string;
  passwordHash: string;
  plainPassword?: string;
} {
  let email = (process.env.ADMIN_EMAIL || 'admin@ethixweb.com').toLowerCase().trim();
  let passwordHash = (process.env.ADMIN_PASSWORD_HASH || '').trim();
  let plainPassword = (process.env.ADMIN_PASSWORD || '').trim();

  // Clean any escaped dollar signs that may occur in Vercel environment variables (e.g. \$2b\$10...)
  if (passwordHash.includes('\\$')) {
    passwordHash = passwordHash.replace(/\\\\\$/g, '$').replace(/\\$/g, '$');
  }

  // In development, read from .env on disk so updates take effect immediately
  if (process.env.NODE_ENV === 'development') {
    try {
      const fs = require('fs');
      const path = require('path');
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        const emailMatch = content.match(/^ADMIN_EMAIL\s*=\s*(.+)$/m);
        if (emailMatch && emailMatch[1]) {
          email = emailMatch[1].trim().toLowerCase();
        }
        const hashMatch = content.match(/^ADMIN_PASSWORD_HASH\s*=\s*(.+)$/m);
        if (hashMatch && hashMatch[1]) {
          passwordHash = hashMatch[1].trim();
          if (passwordHash.includes('\\$')) {
            passwordHash = passwordHash.replace(/\\\\\$/g, '$').replace(/\\$/g, '$');
          }
        }
        const passMatch = content.match(/^ADMIN_PASSWORD\s*=\s*(.+)$/m);
        if (passMatch && passMatch[1]) {
          plainPassword = passMatch[1].trim();
        }
      }
    } catch {
      // ignore
    }
  }

  return { email, passwordHash, plainPassword };
}

export async function verifyPassword(password: string): Promise<boolean> {
  const { passwordHash, plainPassword } = getAdminConfig();
  const trimmedPassword = password.trim();

  // 1. Plain ADMIN_PASSWORD set in Vercel or .env
  if (plainPassword) {
    if (password === plainPassword || trimmedPassword === plainPassword) {
      return true;
    }
  }

  // 2. Default password 'admin123' fallback:
  // If user enters 'admin123' and either no custom password is set, or hash matches default hash
  if (trimmedPassword === 'admin123') {
    if (!plainPassword || plainPassword === 'admin123') {
      if (!passwordHash || passwordHash === DEFAULT_ADMIN_HASH) {
        return true;
      }
    }
  }

  // 3. Bcrypt hash comparison
  if (passwordHash) {
    try {
      const { compare } = await import('bcryptjs');
      const cleanHash = passwordHash.replace(/\\\\\$/g, '$').replace(/\\$/g, '$');
      const matches = (await compare(password, cleanHash)) || (await compare(trimmedPassword, cleanHash));
      if (matches) return true;
    } catch (bcryptErr) {
      console.error('Bcrypt comparison error:', bcryptErr);
    }
  }

  // 4. Fallback for 'admin123' if no passwordHash or plainPassword configured
  if (!passwordHash && !plainPassword && trimmedPassword === 'admin123') {
    return true;
  }

  return false;
}
