'use client';

import React, { useState } from 'react';
import { Radio, Sparkles, MapPin, Zap, Activity } from 'lucide-react';
import indiaMapData from '@svg-maps/india';

interface IndianHub {
  id: string;
  name: string;
  stateName: string;
  region: string;
  x: number;
  y: number;
  role: string;
  status: string;
  activeColor: string;
  isHQ?: boolean;
}

const INDIAN_HUBS: IndianHub[] = [
  {
    id: 'delhi',
    name: 'Delhi NCR',
    stateName: 'Delhi',
    region: 'North Hub',
    x: 186,
    y: 210,
    role: 'Operations & Strategy',
    status: '100% Operational',
    activeColor: '#FF4D5A',
    isHQ: true,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    stateName: 'Maharashtra',
    region: 'West Hub',
    x: 122,
    y: 430,
    role: 'Client Growth & Media',
    status: 'High Bandwidth',
    activeColor: '#FF4D5A',
  },
  {
    id: 'pune',
    name: 'Pune',
    stateName: 'Maharashtra',
    region: 'West Tech',
    x: 152,
    y: 448,
    role: 'Automation & QA Testing',
    status: 'Active',
    activeColor: '#FF4D5A',
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    stateName: 'Gujarat',
    region: 'West Commerce',
    x: 92,
    y: 345,
    role: 'E-commerce & Systems',
    status: 'Active',
    activeColor: '#FF4D5A',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    stateName: 'Karnataka',
    region: 'South HQ',
    x: 195,
    y: 560,
    role: 'AI Systems & Engineering',
    status: 'Primary Tech Lab',
    activeColor: '#E11D2E',
    isHQ: true,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    stateName: 'Telangana',
    region: 'Central-South',
    x: 236,
    y: 460,
    role: 'Cloud & Database Pipelines',
    status: 'Active Sync',
    activeColor: '#FF4D5A',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    stateName: 'Tamil Nadu',
    region: 'South-East',
    x: 248,
    y: 570,
    role: 'Infrastructure & Web Core',
    status: 'Active',
    activeColor: '#FF4D5A',
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    stateName: 'West Bengal',
    region: 'East Gateway',
    x: 410,
    y: 345,
    role: 'Content & Search Analytics',
    status: 'Active',
    activeColor: '#FF4D5A',
  },
];

// Active corridor lines connecting Indian hubs
const CORRIDORS = [
  { from: 'delhi', to: 'ahmedabad', path: 'M 186 210 Q 135 270 92 345' },
  { from: 'delhi', to: 'mumbai', path: 'M 186 210 Q 140 315 122 430' },
  { from: 'ahmedabad', to: 'mumbai', path: 'M 92 345 Q 102 385 122 430' },
  { from: 'mumbai', to: 'pune', path: 'M 122 430 L 152 448' },
  { from: 'pune', to: 'hyderabad', path: 'M 152 448 Q 194 452 236 460' },
  { from: 'delhi', to: 'hyderabad', path: 'M 186 210 Q 206 335 236 460' },
  { from: 'hyderabad', to: 'bengaluru', path: 'M 236 460 Q 220 510 195 560' },
  { from: 'mumbai', to: 'bengaluru', path: 'M 122 430 Q 150 495 195 560' },
  { from: 'bengaluru', to: 'chennai', path: 'M 195 560 Q 220 562 248 570' },
  { from: 'hyderabad', to: 'chennai', path: 'M 236 460 Q 244 515 248 570' },
  { from: 'delhi', to: 'kolkata', path: 'M 186 210 Q 295 270 410 345' },
  { from: 'hyderabad', to: 'kolkata', path: 'M 236 460 Q 330 405 410 345' },
];

// External outbound international lines to global hubs
const GLOBAL_ARCS = [
  { id: 'arc-seattle', fromX: 186, fromY: 210, toX: 25, toY: 80, label: 'Seattle (PST)' },
  { id: 'arc-utah', fromX: 122, fromY: 430, toX: 20, toY: 230, label: 'Utah (MST)' },
  { id: 'arc-newyork', fromX: 195, fromY: 560, toX: 20, toY: 380, label: 'New York (EST)' },
  { id: 'arc-uk', fromX: 186, fromY: 210, toX: 585, toY: 80, label: 'UK (BST)' },
  { id: 'arc-canada', fromX: 410, fromY: 345, toX: 590, toY: 240, label: 'Canada (EDT)' },
];

const ACTIVE_STATE_NAMES = [
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Telangana',
  'Tamil Nadu',
  'West Bengal',
  'Gujarat',
];

export function IndiaMap() {
  const [selectedHub, setSelectedHub] = useState<IndianHub>(INDIAN_HUBS[4]); // Default Bengaluru HQ
  const [hoveredHub, setHoveredHub] = useState<IndianHub | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const activeHub = hoveredHub || selectedHub;

  return (
    <div className="relative mx-auto flex w-full max-w-[640px] flex-col items-center select-none">
      {/* Interactive Map Canvas Container */}
      <div className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-line-subtle bg-gradient-to-b from-surface/95 via-surface/80 to-surface-secondary/90 p-4 shadow-2xl backdrop-blur-xl">
        {/* Subtle grid pattern background */}
        <div className="grid-pattern absolute inset-0 opacity-[0.035]" />

        {/* Ambient radial glows */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-4 top-4 h-[200px] w-[200px] rounded-full bg-crimson/8 blur-[90px]" />

        {/* Top Header Badge */}
        <div className="relative z-20 flex items-center justify-between px-2 pt-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-surface/90 px-3.5 py-1.5 shadow-md shadow-crimson/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
            </span>
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-content">
              Official India Operations Map
            </span>
            <span className="rounded bg-crimson/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-crimson">
              LIVE
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-content-faint">
            {hoveredState ? (
              <span className="rounded-md border border-crimson/30 bg-crimson/10 px-2 py-0.5 text-xs font-semibold text-crimson">
                {hoveredState}
              </span>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-crimson animate-pulse" />
                <span>8 Active Indian Hubs</span>
              </div>
            )}
          </div>
        </div>

        {/* SVG Interactive India Map using @svg-maps/india */}
        <div className="relative z-10 flex h-[430px] w-full items-center justify-center pt-1">
          <svg
            viewBox={indiaMapData.viewBox || '0 0 612 696'}
            className="h-full w-full max-h-[440px] drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Crimson gradient line */}
              <linearGradient id="crimsonTrace" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4D5A" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#E11D2E" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#991B1B" stopOpacity="0.35" />
              </linearGradient>

              {/* International outbound arc gradient */}
              <linearGradient id="globalArcGrad" x1="50%" y1="50%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FF4D5A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E11D2E" stopOpacity="0.05" />
              </linearGradient>

              {/* Glowing dot filter */}
              <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outbound Global Wave Arcs */}
            {GLOBAL_ARCS.map((arc) => (
              <g key={arc.id}>
                <path
                  d={`M ${arc.fromX} ${arc.fromY} Q ${(arc.fromX + arc.toX) / 2} ${(arc.fromY + arc.toY) / 2 - 35} ${arc.toX} ${arc.toY}`}
                  stroke="url(#globalArcGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="opacity-40 animate-pulse"
                />
                <circle r="2.5" fill="#FF4D5A" filter="url(#glowFilter)">
                  <animateMotion
                    path={`M ${arc.fromX} ${arc.fromY} Q ${(arc.fromX + arc.toX) / 2} ${(arc.fromY + arc.toY) / 2 - 35} ${arc.toX} ${arc.toY}`}
                    dur="3.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}

            {/* Authentic Geographic States of India from @svg-maps/india */}
            <g id="india-states-group">
              {indiaMapData.locations.map((loc) => {
                const isActiveState = ACTIVE_STATE_NAMES.includes(loc.name);
                const isHovered = hoveredState === loc.name;
                const isHubActive = activeHub?.stateName === loc.name;

                return (
                  <path
                    key={loc.id}
                    id={loc.id}
                    d={loc.path}
                    fill={
                      isHovered
                        ? 'rgba(225, 29, 46, 0.32)'
                        : isHubActive
                        ? 'rgba(225, 29, 46, 0.2)'
                        : isActiveState
                        ? 'rgba(225, 29, 46, 0.08)'
                        : 'rgba(255, 255, 255, 0.025)'
                    }
                    stroke={
                      isHovered
                        ? '#FF4D5A'
                        : isHubActive
                        ? 'rgba(225, 29, 46, 0.8)'
                        : isActiveState
                        ? 'rgba(225, 29, 46, 0.38)'
                        : 'rgba(255, 255, 255, 0.12)'
                    }
                    strokeWidth={isHovered ? 1.6 : isHubActive ? 1.2 : isActiveState ? 0.9 : 0.55}
                    className="transition-colors duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredState(loc.name)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    <title>{loc.name}</title>
                  </path>
                );
              })}
            </g>

            {/* Connecting Active Tech Corridors between Hubs */}
            {CORRIDORS.map((c, i) => (
              <g key={`corridor-${i}`}>
                {/* Static trace line */}
                <path
                  d={c.path}
                  stroke="url(#crimsonTrace)"
                  strokeWidth="1.6"
                  strokeOpacity="0.45"
                  strokeLinecap="round"
                />

                {/* Animated Moving Data Packet Dot */}
                <circle r="3" fill="#FF4D5A" filter="url(#glowFilter)">
                  <animateMotion
                    path={c.path}
                    dur={`${2.2 + (i % 3) * 0.8}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Secondary reverse flow dot on main pipelines */}
                {i % 2 === 0 && (
                  <circle r="2.2" fill="#FFFFFF" opacity="0.85">
                    <animateMotion
                      path={c.path}
                      dur={`${3.2 + (i % 2) * 0.7}s`}
                      repeatCount="indefinite"
                      keyPoints="1;0"
                      keyTimes="0;1"
                    />
                  </circle>
                )}
              </g>
            ))}

            {/* Indian Tech Hub Nodes */}
            {INDIAN_HUBS.map((hub) => {
              const isSelected = activeHub.id === hub.id;
              return (
                <g
                  key={hub.id}
                  className="cursor-pointer transition-transform duration-300"
                  onClick={() => setSelectedHub(hub)}
                  onMouseEnter={() => {
                    setHoveredHub(hub);
                    setHoveredState(hub.stateName);
                  }}
                  onMouseLeave={() => {
                    setHoveredHub(null);
                    setHoveredState(null);
                  }}
                >
                  {/* Outer Radar Ripple Wave */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 18 : 12}
                    fill="none"
                    stroke="#E11D2E"
                    strokeWidth="1"
                    className="animate-ping opacity-35"
                    style={{ animationDuration: hub.isHQ ? '2s' : '3s' }}
                  />

                  {/* Secondary Pulsing Glow Disc */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 10 : 7}
                    fill="#E11D2E"
                    fillOpacity={isSelected ? 0.45 : 0.25}
                    filter="url(#glowFilter)"
                  />

                  {/* Core Node Dot */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 5.5 : 4}
                    fill={isSelected ? '#FFFFFF' : '#FF4D5A'}
                    stroke="#E11D2E"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />

                  {/* Hub City Label Pill */}
                  <g
                    transform={`translate(${hub.x + 8}, ${hub.y - 10})`}
                    className="pointer-events-none transition-opacity duration-200"
                  >
                    <rect
                      x="0"
                      y="0"
                      width={hub.name.length * 6.6 + 18}
                      height="17"
                      rx="8.5"
                      fill="#121216"
                      fillOpacity="0.88"
                      stroke={isSelected ? '#FF4D5A' : 'rgba(255,255,255,0.18)'}
                      strokeWidth={isSelected ? '1.2' : '0.6'}
                    />
                    <circle cx="6" cy="8.5" r="2.2" fill={isSelected ? '#FF4D5A' : '#E11D2E'} />
                    <text
                      x="12"
                      y="11.5"
                      fill={isSelected ? '#FFFFFF' : '#E0E0E6'}
                      fontSize="8.5"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight={isSelected ? '700' : '500'}
                      letterSpacing="0.2px"
                    >
                      {hub.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Global Connection Badges Footer */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-t border-line-subtle/60 pt-2.5 text-[11px] text-content-faint">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-content">Active Corridors:</span>
            <span className="text-content-muted">Delhi ↔ Mumbai ↔ Bengaluru ↔ Hyderabad</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-crimson">
            <Activity className="h-3 w-3" />
            <span>&lt;25ms Backbone Latency</span>
          </div>
        </div>
      </div>

      {/* Selected Active Hub Live Status Detail Card */}
      <div className="mt-4 w-full rounded-2xl border border-line-subtle bg-surface/80 p-4 shadow-lg backdrop-blur-md transition-all duration-300">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-crimson/30 bg-crimson/10 text-crimson shadow-md shadow-crimson/15">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display text-base font-bold text-content">
                  {activeHub.name}
                </h4>
                {activeHub.isHQ && (
                  <span className="rounded bg-crimson/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-crimson">
                    Primary HQ
                  </span>
                )}
                <span className="text-xs text-content-faint">({activeHub.stateName})</span>
              </div>
              <p className="text-xs text-content-muted">{activeHub.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-line-subtle bg-surface-secondary/70 px-3 py-1.5 text-right">
              <span className="block text-[10px] uppercase tracking-wider text-content-faint">Live Status</span>
              <span className="font-mono text-xs font-semibold text-emerald-400">
                ● {activeHub.status}
              </span>
            </div>

            <div className="rounded-xl border border-line-subtle bg-surface-secondary/70 px-3 py-1.5 text-right">
              <span className="block text-[10px] uppercase tracking-wider text-content-faint">Region</span>
              <span className="text-xs font-medium text-content">{activeHub.region}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
