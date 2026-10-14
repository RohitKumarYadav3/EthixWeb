import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { enquirySchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_SIZE = 10_000; // 10 KB

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIP = req.headers.get('x-real-ip');
  if (realIP) return realIP.trim();
  return 'unknown';
}

/**
 * Robust same-origin & allowed-origins validator.
 * Automatically permits:
 * 1. Same-origin requests (origin/referer host matches the request's own host).
 * 2. Any Vercel deployment (*.vercel.app, *.vercel.sh).
 * 3. Localhost and loopback IPs.
 * 4. Custom domains configured in NEXT_PUBLIC_SITE_URL or SITE_URL.
 */
function isOriginAllowed(req: NextRequest): boolean {
  const origin = req.headers.get('origin') || req.headers.get('referer');
  if (!origin) {
    // Non-browser or direct requests without origin header
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host.toLowerCase();
    const originHostname = originUrl.hostname.toLowerCase();

    // 1. Same-origin match against the current incoming request host
    const reqHostRaw = req.headers.get('x-forwarded-host') || req.headers.get('host');
    if (reqHostRaw) {
      const cleanReqHost = reqHostRaw.split(',')[0].trim().toLowerCase();
      const cleanReqHostname = cleanReqHost.split(':')[0];

      if (originHost === cleanReqHost || originHostname === cleanReqHostname) {
        return true;
      }
    }

    // 2. Any Vercel domain (*.vercel.app / *.vercel.sh)
    if (originHostname.endsWith('.vercel.app') || originHostname.endsWith('.vercel.sh')) {
      return true;
    }

    // 3. Local development
    if (originHostname === 'localhost' || originHostname === '127.0.0.1') {
      return true;
    }

    // 4. Configured custom domain URLs from environment
    const configuredUrls = [
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.SITE_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    ].filter(Boolean) as string[];

    for (const configured of configuredUrls) {
      try {
        const confUrl = new URL(configured.startsWith('http') ? configured : `https://${configured}`);
        if (confUrl.hostname.toLowerCase() === originHostname) {
          return true;
        }
      } catch {
        // ignore malformed configured URL
      }
    }

    return false;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Origin check — reject foreign cross-origin requests
    if (!isOriginAllowed(req)) {
      console.warn('Blocked enquiry with unauthorized origin:', req.headers.get('origin'));
      return NextResponse.json(
        { error: 'Origin not allowed' },
        { status: 403 }
      );
    }

    // Rate limiting
    const ip = getClientIP(req);
    const rateResult = await checkRateLimit(`enquiry:${ip}`, 5);
    if (!rateResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: rateResult.retryAfter,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateResult.retryAfter) },
        }
      );
    }

    // Body size check
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }

    const body = await req.text();
    if (body.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const result = enquirySchema.safeParse(parsed);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    const { website, ...data } = result.data;

    // Honeypot check — if the hidden field is filled, silently reject spam
    if (website && website.length > 0) {
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    }

    const messageWithLocation = data.city
      ? `${data.message}\n\n[Location: ${data.city}]`
      : data.message;

    const { error } = await supabaseAdmin.from('enquiries').insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      service: data.service,
      budget: data.budget || null,
      message: messageWithLocation,
      status: 'new',
    });

    if (error) {
      console.error('Enquiry insert error:', error.message, error.details);
      return NextResponse.json(
        { error: 'Failed to submit enquiry. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Enquiry submitted successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Enquiry API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
