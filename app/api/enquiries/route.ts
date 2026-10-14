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

function getOrigin(req: NextRequest): string | null {
  return req.headers.get('origin') || req.headers.get('referer') || null;
}

export async function POST(req: NextRequest) {
  try {
    // Origin check — reject cross-origin requests
    const origin = getOrigin(req);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const allowedOrigins: string[] = [
      siteUrl,
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ].filter((v): v is string => Boolean(v));

    const isLocalhost =
      process.env.NODE_ENV !== 'production' &&
      Boolean(
        origin &&
          (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'))
      );

    if (origin && !isLocalhost && allowedOrigins.length > 0) {
      const isAllowed = allowedOrigins.some((allowed) =>
        origin.startsWith(allowed)
      );
      if (!isAllowed) {
        return NextResponse.json(
          { error: 'Origin not allowed' },
          { status: 403 }
        );
      }
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

    // Honeypot check — if the hidden field is filled, silently reject
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
      console.error('Enquiry insert error:', error.message);
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
