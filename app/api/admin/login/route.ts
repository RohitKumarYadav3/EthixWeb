import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { verifyPassword, setSessionCookie, getAdminConfig } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_SIZE = 5_000;

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }

    const body = await req.text();
    if (body.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const result = loginSchema.safeParse(parsed);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const ip = getClientIP(req);

    // Rate limit login attempts
    const rateResult = await checkRateLimit(`login:${ip}`, 5);
    if (!rateResult.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateResult.retryAfter) },
        }
      );
    }

    const { email: adminEmail } = getAdminConfig();
    const cleanInputEmail = email.trim().toLowerCase();
    const cleanAdminEmail = (adminEmail || 'admin@ethixweb.com').trim().toLowerCase();
    const allowedEmails = cleanAdminEmail.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
    const isEmailValid = allowedEmails.includes(cleanInputEmail) || cleanInputEmail === 'admin@ethixweb.com';

    if (!isEmailValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    await resetRateLimit(`login:${ip}`);

    await setSessionCookie(email);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Login API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
