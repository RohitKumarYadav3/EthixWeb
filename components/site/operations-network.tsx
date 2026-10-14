'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, Wrench, TrendingUp, Radio, Clock, Shield, Sparkles } from 'lucide-react';
import { IndiaMap } from './india-map';

interface CityTimezone {
  name: string;
  timeZone: string;
  label: string;
}

const CITY_TIMEZONES: CityTimezone[] = [
  { name: 'India Hub', timeZone: 'Asia/Kolkata', label: 'Primary Ops' },
  { name: 'Seattle', timeZone: 'America/Los_Angeles', label: 'PST' },
  { name: 'Utah', timeZone: 'America/Denver', label: 'MST' },
  { name: 'New York', timeZone: 'America/New_York', label: 'EST' },
  { name: 'Canada', timeZone: 'America/Toronto', label: 'EDT' },
  { name: 'UK', timeZone: 'Europe/London', label: 'BST' },
];

export function OperationsNetwork() {
  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTimes = () => {
      const now = new Date();
      const newTimes: { [key: string]: string } = {};

      CITY_TIMEZONES.forEach((city) => {
        try {
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: city.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
          newTimes[city.name] = formatter.format(now);
        } catch (e) {
          newTimes[city.name] = now.toLocaleTimeString();
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-line-subtle bg-surface-secondary/70 py-16 md:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-crimson/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="reveal mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 type-eyebrow text-crimson">
            Global Operations Network
          </p>
          <h2 className="font-display type-section-title text-content text-balance">
            Built for fast moving<br />teams across time zones.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl type-body text-content-muted text-pretty">
            Seattle, Utah, New York, Canada, the United Kingdom, and India stay connected through
            one responsive digital operations layer.
          </p>
        </div>

        {/* Live Running Timezone Bar */}
        <div className="reveal mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex min-w-max items-center justify-center gap-3">
            {CITY_TIMEZONES.map((city) => (
              <div
                key={city.name}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs backdrop-blur-md transition-all ${
                  city.name === 'India Hub'
                    ? 'border-crimson/50 bg-crimson/10 text-content shadow-sm shadow-crimson/20'
                    : 'border-line-subtle bg-surface/70 text-content-secondary'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    city.name === 'India Hub' ? 'bg-crimson animate-ping' : 'bg-crimson/60'
                  }`}
                />
                <span className="font-semibold text-content">{city.name}</span>
                <span className="font-mono text-content-muted">
                  {mounted ? times[city.name] || '--:--:--' : '--:--:--'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Globe & City Cards Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: Animated India Map */}
          <div className="lg:col-span-8 flex items-center justify-center">
            <IndiaMap />
          </div>

          {/* Right: Live City Status Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Seattle Card */}
            <div className="group rounded-2xl border border-line-subtle bg-surface/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-crimson/40 hover:shadow-xl hover:shadow-crimson/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                  <span className="type-card-title !text-base md:!text-lg text-content">Seattle</span>
                </div>
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="type-caption mt-1 text-content-muted">Active Projects</p>
              <div className="mt-4 text-right">
                <span className="font-mono text-base font-bold text-content">
                  {mounted ? times['Seattle'] || '11:43 AM' : '11:43 AM'}
                </span>
              </div>
            </div>

            {/* Utah Card */}
            <div className="group rounded-2xl border border-line-subtle bg-surface/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-crimson/40 hover:shadow-xl hover:shadow-crimson/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                  <span className="type-card-title !text-base md:!text-lg text-content">Utah</span>
                </div>
                <Wrench className="h-4 w-4 text-amber-400" />
              </div>
              <p className="type-caption mt-1 text-content-muted">Maintenance &amp; Support</p>
              <div className="mt-4 text-right">
                <span className="font-mono text-base font-bold text-content">
                  {mounted ? times['Utah'] || '12:43 PM' : '12:43 PM'}
                </span>
              </div>
            </div>

            {/* New York Card */}
            <div className="group rounded-2xl border border-line-subtle bg-surface/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-crimson/40 hover:shadow-xl hover:shadow-crimson/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                  <span className="type-card-title !text-base md:!text-lg text-content">New York</span>
                </div>
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </div>
              <p className="type-caption mt-1 text-content-muted">Strategy &amp; Growth</p>
              <div className="mt-4 text-right">
                <span className="font-mono text-base font-bold text-content">
                  {mounted ? times['New York'] || '02:43 PM' : '02:43 PM'}
                </span>
              </div>
            </div>

            {/* Live Network Activity Pill */}
            <div className="flex items-center justify-between rounded-xl border border-crimson/30 bg-crimson/5 px-4 py-3 backdrop-blur-sm">
              <div className="type-eyebrow flex items-center gap-2 !text-xs text-crimson">
                <Radio className="h-3.5 w-3.5 animate-pulse text-crimson" />
                Live Network Activity
              </div>
              <div className="flex items-center gap-1.5 text-xs text-content-secondary">
                <span>AI agent reply</span>
                <span className="rounded bg-crimson/15 px-1.5 py-0.5 font-mono text-[11px] text-crimson font-medium">Utah</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Key Metric Cards */}
        <div className="reveal mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          <div className="rounded-2xl border border-line-subtle bg-surface/80 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-crimson/30 hover:bg-surface">
            <div className="font-display text-3xl font-bold tracking-tight text-crimson md:text-4xl">
              50+
            </div>
            <p className="type-eyebrow mt-2 !text-xs text-content-faint">
              Projects Delivered
            </p>
          </div>

          <div className="rounded-2xl border border-line-subtle bg-surface/80 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-crimson/30 hover:bg-surface">
            <div className="font-display text-3xl font-bold tracking-tight text-content md:text-4xl">
              &lt;1h
            </div>
            <p className="type-eyebrow mt-2 !text-xs text-content-faint">
              Avg. Response Time
            </p>
          </div>

          <div className="rounded-2xl border border-line-subtle bg-surface/80 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-crimson/30 hover:bg-surface">
            <div className="font-display text-3xl font-bold tracking-tight text-crimson md:text-4xl">
              India &amp; US
            </div>
            <p className="type-eyebrow mt-2 !text-xs text-content-faint">
              Operations Focus
            </p>
          </div>

          <div className="rounded-2xl border border-line-subtle bg-surface/80 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-crimson/30 hover:bg-surface">
            <div className="font-display text-3xl font-bold tracking-tight text-content md:text-4xl">
              24/7
            </div>
            <p className="type-eyebrow mt-2 !text-xs text-content-faint">
              Global Availability
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
