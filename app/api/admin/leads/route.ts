import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { SERVICE_LABELS, STATUS_LABELS } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(searchParams.get('pageSize') || String(PAGE_SIZE), 10))
    );
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || '';
    const service = searchParams.get('service')?.trim() || '';

    const offset = (page - 1) * pageSize;

    let query = supabaseAdmin
      .from('enquiries')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,company.ilike.%${search}%`
      );
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (service && service !== 'all') {
      query = query.eq('service', service);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error('Leads fetch error:', error.message);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count || 0) / pageSize);

    return NextResponse.json({
      leads: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages,
      filters: {
        serviceOptions: Object.entries(SERVICE_LABELS),
        statusOptions: Object.entries(STATUS_LABELS),
      },
    });
  } catch (err) {
    console.error('Leads API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
