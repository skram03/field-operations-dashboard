import React from "react";
import Link from "next/link";
import {
  Truck,
  Kanban,
  Wrench,
  FileText,
  Smartphone,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border p-4 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight leading-none">OpsFlow</h1>
              <span className="text-[11px] text-muted-foreground">Dispatch &amp; Field Ops</span>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Truck className="h-4 w-4 text-primary" />
              <span>Live Dispatch</span>
            </Link>
            <Link
              href="/kanban"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Kanban className="h-4 w-4" />
              <span>Job Pipeline</span>
            </Link>
            <Link
              href="/inventory"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Wrench className="h-4 w-4" />
              <span>Fleet &amp; Equipment</span>
            </Link>
            <Link
              href="/pitch-guide"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Client Pitch Guide</span>
            </Link>
          </nav>
        </div>

        <div className="p-3 bg-muted/60 rounded-xl text-xs space-y-2">
          <p className="font-semibold text-foreground flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5 text-primary" /> Mobile Field App
          </p>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Operators open live links on smartphones without App Store installs.
          </p>
          <Link
            href="/field/job-001"
            className="text-primary font-semibold hover:underline block pt-1"
          >
            Preview Mobile View &rarr;
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Central Dispatch Hub</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">Connected to Fleet Realtime</span>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
