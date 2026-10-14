import { supabaseAdmin } from './supabase';

const RATE_WINDOW_MINUTES = 10;

interface RateRecord {
  count: number;
  window_start: number;
}

/**
 * Rate limiter backed by Supabase for persistence across serverless instances.
 * Tracks request counts per identifier (IP or email) in a dedicated table.
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 5
): Promise<{ allowed: boolean; remaining: number; retryAfter: number }> {
  const now = Date.now();
  const windowMs = RATE_WINDOW_MINUTES * 60 * 1000;

  const { data, error } = await supabaseAdmin
    .from('rate_limits')
    .select('id, count, window_start')
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) {
    console.error('Rate limit check error:', error.message);
    return { allowed: true, remaining: maxRequests, retryAfter: 0 };
  }

  if (!data) {
    await supabaseAdmin.from('rate_limits').insert({
      identifier,
      count: 1,
      window_start: now,
    });
    return { allowed: true, remaining: maxRequests - 1, retryAfter: 0 };
  }

  const record = data as unknown as RateRecord;
  const windowStart = Number(record.window_start);

  if (now - windowStart > windowMs) {
    await supabaseAdmin
      .from('rate_limits')
      .update({ count: 1, window_start: now })
      .eq('identifier', identifier);
    return { allowed: true, remaining: maxRequests - 1, retryAfter: 0 };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((windowStart + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  await supabaseAdmin
    .from('rate_limits')
    .update({ count: record.count + 1 })
    .eq('identifier', identifier);

  return {
    allowed: true,
    remaining: maxRequests - record.count - 1,
    retryAfter: 0,
  };
}

export async function resetRateLimit(identifier: string): Promise<void> {
  await supabaseAdmin.from('rate_limits').delete().eq('identifier', identifier);
}
