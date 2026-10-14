'use client';

import React from 'react';
import {
  MessageSquare,
  Globe,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  CreditCard,
  Cloud,
  Code2,
  Workflow,
} from 'lucide-react';

interface TechPill {
  name: string;
  category: string;
  icon: typeof Globe;
  color: string;
}

const TECH_ECOSYSTEM: TechPill[] = [
  { name: 'Next.js 15', category: 'Full-Stack Core', icon: Globe, color: 'text-white' },
  { name: 'WhatsApp Cloud API', category: 'Omnichannel AI', icon: MessageSquare, color: 'text-emerald-400' },
  { name: 'Zoho CRM & Desk', category: 'India Enterprise', icon: Database, color: 'text-amber-400' },
  { name: 'LeadSquared', category: 'Sales Pipeline', icon: Workflow, color: 'text-blue-400' },
  { name: 'HubSpot', category: 'Global Inbound', icon: Layers, color: 'text-orange-400' },
  { name: 'Razorpay', category: 'Payment Gateway', icon: CreditCard, color: 'text-blue-500' },
  { name: 'Supabase & Postgres', category: 'Database & Auth', icon: Database, color: 'text-emerald-400' },
  { name: 'Google Cloud', category: 'Global CDN Edge', icon: Cloud, color: 'text-sky-400' },
  { name: 'Voice IVR & Twilio', category: 'Telephony Agents', icon: Cpu, color: 'text-crimson' },
  { name: 'DPDP & SOC-2', category: 'Security & Privacy', icon: ShieldCheck, color: 'text-purple-400' },
  { name: 'TypeScript 5', category: 'Strict Engineering', icon: Code2, color: 'text-blue-400' },
];

export function TechEcosystemMarquee() {
  return (
    <div className="relative border-y border-line-subtle bg-surface/60 backdrop-blur-md py-4 overflow-hidden select-none">
      {/* Top and Bottom hairline gradient accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />

      {/* Edge gradient masks for smooth fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />

      {/* Infinite scrolling ticker */}
      <div className="flex w-max animate-marquee gap-4 items-center">
        {[...TECH_ECOSYSTEM, ...TECH_ECOSYSTEM, ...TECH_ECOSYSTEM].map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${index}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-line-subtle bg-surface/80 px-4 py-1.5 shadow-sm hover:border-crimson/40 hover:bg-surface hover:shadow-md hover:shadow-crimson/10 transition-all shrink-0 cursor-default group"
            >
              <div className={`flex h-5 w-5 items-center justify-center rounded-md bg-white/5 ${tech.color} group-hover:scale-110 transition-transform`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-content tracking-tight">
                {tech.name}
              </span>
              <span className="text-[10px] font-medium text-content-muted border-l border-line-subtle pl-2">
                {tech.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
