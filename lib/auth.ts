import { cookies } from 'next/headers';
import { createHmac, randomBytes } from 'crypto';

const SESSION_COOKIE = 'ethixweb_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

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
    email,
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
    sameSite: 'strict',
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
  let passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
  let plainPassword = process.env.ADMIN_PASSWORD;

  // In development, read from .env on disk so updates take effect immediately
  // without requiring a Next.js dev server restart
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
        }
        const passMatch = content.match(/^ADMIN_PASSWORD\s*=\s*(.+)$/m);
        if (passMatch && passMatch[1]) {
          plainPassword = passMatch[1].trim();
        }
      }
    } catch {
      // ignore read error
    }
  }

  return { email, passwordHash, plainPassword };
}

export async function verifyPassword(password: string): Promise<boolean> {
  const { passwordHash, plainPassword } = getAdminConfig();

  // If plain ADMIN_PASSWORD is set in .env
  if (plainPassword && password === plainPassword) {
    return true;
  }

  // If bcrypt hash is configured
  if (passwordHash) {
    const { compare } = await import('bcryptjs');
    const matches = await compare(password, passwordHash);
    if (matches) return true;
  }

  // Development convenience: default fallback to 'admin123' if default hash matches or in development
  if (process.env.NODE_ENV === 'development' && password === 'admin123') {
    return true;
  }

  if (!passwordHash && !plainPassword) {
    console.error('ADMIN_PASSWORD_HASH is not configured');
  }

  return false;
}

