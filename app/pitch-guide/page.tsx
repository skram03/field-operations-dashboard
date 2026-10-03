import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, DollarSign, Target, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PitchGuidePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="mb-2 bg-emerald-500/10 text-emerald-600 border-emerald-300">
            Field Playbook
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">How to Pitch &amp; Close Boring Businesses</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Step-by-step scripts, pricing tiers, and outreach strategies to land \$2,500–\$4,000 contracts this month.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Target Niches */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" /> 1. The 4 Highest-Converting Niches
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border bg-muted/20">
            <h4 className="font-bold text-foreground">A. Heavy Equipment &amp; Tool Rental</h4>
            <p className="text-xs text-muted-foreground mt-1">
              They lose track of return dates, equipment locations, and paper rental slips.
            </p>
          </div>
          <div className="p-4 rounded-xl border bg-muted/20">
            <h4 className="font-bold text-foreground">B. Local Logistics &amp; Courier Dispatch</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Dispatchers text drivers all day on WhatsApp; drivers lose delivery notes and proof photos.
            </p>
          </div>
          <div className="p-4 rounded-xl border bg-muted/20">
            <h4 className="font-bold text-foreground">C. Commercial HVAC &amp; Plumbing Contractors</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Need mobile proof-of-work, site sign-offs, and immediate invoice generation for corporate clients.
            </p>
          </div>
          <div className="p-4 rounded-xl border bg-muted/20">
            <h4 className="font-bold text-foreground">D. Wholesale Food / Construction Suppliers</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Still handwriting order delivery receipts and manually re-typing items into old desktop software.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cold Outreach Script */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-emerald-600" /> 2. The 90-Second Video Pitch Script
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-muted-foreground text-xs">
            Open this OpsFlow app on your screen, click your webcam using Loom, and record this exact 90-second message:
          </p>

          <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs leading-relaxed border border-zinc-800 space-y-3">
            <p>
              "Hey [Owner Name], I was looking at [Company Name] and noticed you run daily equipment deliveries and field dispatch around [City]."
            </p>
            <p>
              "Most dispatch teams I speak with spend 2+ hours every evening sorting through WhatsApp photos, handwritten clipboards, and lost delivery notes."
            </p>
            <p>
              "I put together a quick working prototype of a mobile dispatch portal tailored for [Company Name]. Your drivers open a clean link on their phone, tap 'Arrived', snap a completion photo, and your central office gets an instant printable invoice with zero manual typing."
            </p>
            <p>
              "If you want to test it with your drivers for 7 days free of charge, reply to this email and I'll send over your private login."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" /> 3. Recommended Pricing Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6 text-sm">
          <div className="border p-5 rounded-2xl bg-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base">Standard Setup</span>
              <span className="text-xl font-extrabold text-primary">$2,200</span>
            </div>
            <p className="text-xs text-muted-foreground">One-time customization fee</p>
            <ul className="text-xs space-y-1.5 pt-2 text-muted-foreground">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Company branding &amp; logo on invoices</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Driver mobile links &amp; route buttons</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Supabase cloud database deployment</li>
            </ul>
          </div>

          <div className="border p-5 rounded-2xl bg-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base">Monthly Retainer</span>
              <span className="text-xl font-extrabold text-emerald-600">$180 / mo</span>
            </div>
            <p className="text-xs text-muted-foreground">Hosting, backups &amp; maintenance</p>
            <ul className="text-xs space-y-1.5 pt-2 text-muted-foreground">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Unlimited photo storage in Supabase</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 99.9% uptime on Vercel</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Monthly software adjustments</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
