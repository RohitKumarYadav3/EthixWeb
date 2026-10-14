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

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by IP (5 submissions per 10 minutes)
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

    // 2. Body size check (prevent payload inflation attacks)
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

    // 3. JSON parse check
    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // 4. Strict Zod schema validation
    const result = enquirySchema.safeParse(parsed);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    const { website, ...data } = result.data;

    // 5. Honeypot check — if the hidden field is filled, silently reject spam
    if (website && website.length > 0) {
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    }

    // 6. Format location message if city was supplied
    const messageWithLocation = data.city
      ? `${data.message}\n\n[Location: ${data.city}]`
      : data.message;

    // 7. Persist to Supabase enquiries table
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
