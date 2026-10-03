"use client";

import React, { useState } from "react";
import { DispatchJob } from "@/types/ops.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PrintableVoucher } from "@/components/ops/pdf-invoice";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Truck,
  MapPin,
  Calendar,
  DollarSign,
  FileCheck,
  Plus,
  Printer,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const initialJobs: DispatchJob[] = [
  {
    id: "job-001",
    job_number: "DSP-2026-081",
    client_id: "c-1",
    client_name: "Apex Civil Foundations",
    client_phone: "+1 (555) 234-8901",
    assigned_operator: "Marcus Vance",
    destination: "742 Evergreen Terrace, Sector 4",
    scheduled_date: "2026-10-03",
    status: "dispatched",
    total_amount: 1450.0,
    created_at: "2026-10-03T08:00:00Z",
  },
  {
    id: "job-002",
    job_number: "DSP-2026-082",
    client_id: "c-2",
    client_name: "Summit Ridge Contractors",
    client_phone: "+1 (555) 890-1234",
    assigned_operator: "Leo Ramirez",
    destination: "104 West Industrial Blvd, Gate B",
    scheduled_date: "2026-10-03",
    status: "on_site",
    total_amount: 2800.0,
    created_at: "2026-10-03T09:15:00Z",
  },
  {
    id: "job-003",
    job_number: "DSP-2026-083",
    client_id: "c-3",
    client_name: "Redwood Property Group",
    client_phone: "+1 (555) 432-6789",
    assigned_operator: "Sarah Connor",
    destination: "89 Shoreline Way, Suite 12",
    scheduled_date: "2026-10-03",
    status: "completed",
    total_amount: 950.0,
    created_at: "2026-10-03T07:30:00Z",
  },
];

export default function DispatchDashboard() {
  const [jobs, setJobs] = useState<DispatchJob[]>(initialJobs);
  const [selectedInvoiceJob, setSelectedInvoiceJob] = useState<DispatchJob | null>(null);

  const totalRevenueToday = jobs.reduce((sum, j) => sum + j.total_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Today's Dispatch Board</h1>
          <p className="text-sm text-muted-foreground">
            Monitor real-time field status, generate printable delivery slips, and dispatch crews.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/kanban">View Pipeline &rarr;</Link>
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Dispatch Job
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Daily Dispatches</p>
              <h3 className="text-2xl font-bold mt-1">{jobs.length} Active</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Truck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Daily Booked Revenue</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalRevenueToday)}</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Fulfillment Rate</p>
              <h3 className="text-2xl font-bold mt-1">100%</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <FileCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Jobs Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Active Jobs Roster</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">
                      {job.job_number}
                    </span>
                    <span className="font-bold text-sm text-foreground">{job.client_name}</span>
                    <Badge variant="outline" className="capitalize text-xs">
                      {job.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Operator: <span className="font-medium text-foreground">{job.assigned_operator}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-bold text-foreground">{formatCurrency(job.total_amount)}</span>
                    <p className="text-[11px] text-muted-foreground">{job.scheduled_date}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setSelectedInvoiceJob(job)}
                  >
                    <Printer className="h-3.5 w-3.5" /> Voucher / PDF
                  </Button>

                  <Link href={`/field/${job.id}`}>
                    <Button size="sm" variant="secondary" className="gap-1">
                      Field Mobile <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Printable Voucher Modal */}
      {selectedInvoiceJob && (
        <PrintableVoucher
          onClose={() => setSelectedInvoiceJob(null)}
          data={{
            jobId: selectedInvoiceJob.job_number,
            clientName: selectedInvoiceJob.client_name || "Apex Foundations",
            clientAddress: selectedInvoiceJob.destination,
            clientPhone: selectedInvoiceJob.client_phone || "+1 (555) 000-0000",
            serviceDate: selectedInvoiceJob.scheduled_date,
            operator: selectedInvoiceJob.assigned_operator,
            items: [
              { description: "Heavy Duty Boom Lift 45ft (Day Rental)", quantity: 1, rate: 850.0 },
              { description: "Operator & Transport Mobilization Fee", quantity: 1, rate: selectedInvoiceJob.total_amount - 850.0 },
            ],
            total: selectedInvoiceJob.total_amount,
          }}
        />
      )}
    </div>
  );
}
