"use client";

import React from "react";
import { DispatchJob, JobStatus } from "@/types/ops.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Clock, MapPin, User, ChevronRight } from "lucide-react";
import Link from "next/link";

interface JobKanbanProps {
  jobs: DispatchJob[];
  onStatusChange: (jobId: string, nextStatus: JobStatus) => void;
}

const columns: { id: JobStatus; title: string; color: string }[] = [
  { id: "pending", title: "Pending Dispatch", color: "border-t-amber-500" },
  { id: "dispatched", title: "En Route / Dispatched", color: "border-t-blue-500" },
  { id: "on_site", title: "Active On-Site", color: "border-t-indigo-500" },
  { id: "completed", title: "Job Completed", color: "border-t-emerald-500" },
  { id: "billed", title: "Invoiced & Closed", color: "border-t-purple-500" },
];

export function JobKanban({ jobs, onStatusChange }: JobKanbanProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
      {columns.map((col) => {
        const colJobs = jobs.filter((j) => j.status === col.id);

        return (
          <div key={col.id} className="flex flex-col gap-3 min-w-[260px]">
            <div className={`p-3 bg-muted/40 rounded-xl border border-t-4 ${col.color} flex items-center justify-between`}>
              <span className="font-semibold text-xs tracking-tight">{col.title}</span>
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                {colJobs.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {colJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-4 shadow-sm hover:shadow transition-shadow border border-border/80 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-primary">{job.job_number}</span>
                    <span className="font-semibold">{formatCurrency(job.total_amount)}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-foreground">{job.client_name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{job.destination}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {job.assigned_operator}
                    </span>
                    <Link
                      href={`/field/${job.id}`}
                      className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
                    >
                      Field View <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              ))}

              {colJobs.length === 0 && (
                <div className="border border-dashed rounded-xl p-6 text-center text-xs text-muted-foreground">
                  No jobs in this phase
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
