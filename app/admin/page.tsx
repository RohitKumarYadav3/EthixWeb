'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, Filter, Trash2, Edit3, X, LogOut, Inbox, TrendingUp,
  CheckCircle2, XCircle, Phone, Mail, Building2, Calendar, ArrowLeft,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { SERVICE_LABELS, STATUS_LABELS } from '@/lib/validation';
import { Logo } from '@/components/site/logo';
import { ThemeToggle } from '@/components/site/theme-toggle';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  budget: string | null;
  message: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
  contacted: 'bg-amber-500/15 text-amber-800 dark:text-amber-400 border-amber-500/30',
  qualified: 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-400 border-cyan-500/30',
  won: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border-emerald-500/30',
  lost: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30',
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [stats, setStats] = useState({ total: 0, new: 0, won: 0 });

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'GET' });
      if (res.status === 401) {
        router.push('/admin/login');
        return false;
      }
      setAuthChecked(true);
      return true;
    } catch {
      router.push('/admin/login');
      return false;
    }
  }, [router]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: '10',
      });
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (serviceFilter !== 'all') params.set('service', serviceFilter);

      const res = await fetch(`/api/admin/leads?${params}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data: LeadsResponse = await res.json();
      setLeads(data.leads);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setStats({
        total: data.total,
        new: data.leads.filter(l => l.status === 'new').length,
        won: 0,
      });
    } catch {
      console.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, serviceFilter, router]);

  useEffect(() => {
    checkAuth().then((ok) => {
      if (ok) fetchLeads();
    });
  }, [checkAuth, fetchLeads]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const openLeadDetail = async (lead: Lead) => {
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedLead(data.lead);
        setEditStatus(data.lead.status);
        setEditNotes(data.lead.notes || '');
      }
    } catch {
      console.error('Failed to fetch lead detail');
    }
  };

  const handleSaveLead = async () => {
    if (!selectedLead) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: editStatus, notes: editNotes }),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedLead(data.lead);
        fetchLeads();
      }
    } catch {
      console.error('Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSelectedLead(null);
        fetchLeads();
      }
    } catch {
      console.error('Failed to delete lead');
    } finally {
      setDeleting(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleServiceFilter = (value: string) => {
    setServiceFilter(value);
    setPage(1);
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-content-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary text-content">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line-subtle bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <Logo size="sm" priority />
            <div className="hidden sm:block h-4 w-px bg-line-subtle" />
            <span className="hidden sm:inline-block rounded-md bg-surface-tertiary px-2 py-0.5 text-xs font-medium text-content-muted">
              Lead Management
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="hidden items-center gap-2 text-sm text-content-muted transition-colors hover:text-crimson sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              View site
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-line-subtle px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:border-destructive/30 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line-subtle bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <Inbox className="h-5 w-5 text-crimson" />
              <p className="text-sm text-content-muted">Total enquiries</p>
            </div>
            <p className="font-display text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-line-subtle bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <p className="text-sm text-content-muted">New on this page</p>
            </div>
            <p className="font-display text-3xl font-bold">{stats.new}</p>
          </div>
          <div className="rounded-xl border border-line-subtle bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <p className="text-sm text-content-muted">Current page</p>
            </div>
            <p className="font-display text-3xl font-bold">{leads.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-content-faint" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or company..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-line-subtle bg-surface py-2.5 pl-11 pr-4 text-sm text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-faint" />
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="appearance-none rounded-lg border border-line-subtle bg-surface py-2.5 pl-9 pr-8 text-sm text-content transition-colors focus:border-crimson focus:outline-none"
              >
                <option value="all">All statuses</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <select
              value={serviceFilter}
              onChange={(e) => handleServiceFilter(e.target.value)}
              className="appearance-none rounded-lg border border-line-subtle bg-surface py-2.5 px-4 text-sm text-content transition-colors focus:border-crimson focus:outline-none"
            >
              <option value="all">All services</option>
              {Object.entries(SERVICE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads table */}
        <div className="overflow-hidden rounded-xl border border-line-subtle">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line-subtle bg-surface/50">
                <th className="type-eyebrow px-4 py-3 text-left !text-[11px] text-content-faint">Name</th>
                <th className="type-eyebrow hidden px-4 py-3 text-left !text-[11px] text-content-faint md:table-cell">Service</th>
                <th className="type-eyebrow hidden px-4 py-3 text-left !text-[11px] text-content-faint lg:table-cell">Date</th>
                <th className="type-eyebrow px-4 py-3 text-left !text-[11px] text-content-faint">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-content-faint">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-content-faint">No enquiries found. Adjust your filters or check back later.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="cursor-pointer border-b border-line-subtle bg-surface transition-colors hover:bg-surface-tertiary"
                    onClick={() => openLeadDetail(lead)}
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium text-content">{lead.name}</p>
                      <p className="text-sm text-content-faint">{lead.email}</p>
                    </td>
                    <td className="hidden px-4 py-4 text-sm text-content-muted md:table-cell">
                      {SERVICE_LABELS[lead.service] || lead.service}
                    </td>
                    <td className="hidden px-4 py-4 text-sm text-content-muted lg:table-cell">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${STATUS_COLORS[lead.status] || 'border-line-strong text-content-muted'}`}>
                        {STATUS_LABELS[lead.status] || lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Edit3 className="inline h-4 w-4 text-content-faint" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-line-subtle px-4 py-2 text-sm text-content-secondary transition-colors hover:bg-content/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-content-muted">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-line-subtle px-4 py-2 text-sm text-content-secondary transition-colors hover:bg-content/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lead detail modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line-subtle bg-surface p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="type-card-title !text-2xl md:!text-3xl">{selectedLead.name}</h2>
                <p className="type-caption mt-1 text-content-faint">
                  Enquiry received {new Date(selectedLead.created_at).toLocaleString('en-IN')}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-2 text-content-faint transition-colors hover:bg-content/5 hover:text-content"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="type-body-sm flex items-center gap-3">
                <Mail className="h-4 w-4 text-crimson" />
                <a href={`mailto:${selectedLead.email}`} className="text-content-secondary hover:text-crimson">{selectedLead.email}</a>
              </div>
              <div className="type-body-sm flex items-center gap-3">
                <Phone className="h-4 w-4 text-crimson" />
                <a href={`tel:${selectedLead.phone}`} className="text-content-secondary hover:text-crimson">{selectedLead.phone}</a>
              </div>
              {selectedLead.company && (
                <div className="type-body-sm flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-crimson" />
                  <span className="text-content-secondary">{selectedLead.company}</span>
                </div>
              )}
              <div className="type-body-sm flex items-center gap-3">
                <Calendar className="h-4 w-4 text-crimson" />
                <span className="text-content-secondary">{SERVICE_LABELS[selectedLead.service] || selectedLead.service}</span>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-line-subtle bg-surface-secondary p-4">
              <p className="type-eyebrow mb-2 !text-xs text-content-faint">Message</p>
              <p className="type-body-sm text-content-secondary text-pretty">{selectedLead.message}</p>
              {selectedLead.budget && (
                <p className="type-caption mt-3 text-content-muted">
                  Budget: {selectedLead.budget.replace(/-/g, ' ').replace('under', 'Under ₹').replace('plus', '+')}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="type-eyebrow mb-2 block !text-xs text-content-faint">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full rounded-lg border border-line-subtle bg-surface py-2.5 px-4 text-sm text-content transition-colors focus:border-crimson focus:outline-none"
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="type-eyebrow mb-2 block !text-xs text-content-faint">Notes</label>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-line-subtle bg-surface py-2.5 px-4 text-sm text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                placeholder="Add internal notes about this lead..."
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleDeleteLead}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={handleSaveLead}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-crimson px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
