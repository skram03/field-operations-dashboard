"use client";

import React, { useState } from "react";
import { JobKanban } from "@/components/ops/job-kanban";
import { DispatchJob, JobStatus } from "@/types/ops.types";

const mockJobs: DispatchJob[] = [
  {
    id: "job-001",
    job_number: "DSP-2026-081",
    client_id: "c-1",
    client_name: "Apex Civil Foundations",
    assigned_operator: "Marcus Vance",
    destination: "742 Evergreen Terrace",
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
    assigned_operator: "Leo Ramirez",
    destination: "104 West Industrial Blvd",
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
    assigned_operator: "Sarah Connor",
    destination: "89 Shoreline Way",
    scheduled_date: "2026-10-03",
    status: "completed",
    total_amount: 950.0,
    created_at: "2026-10-03T07:30:00Z",
  },
  {
    id: "job-004",
    job_number: "DSP-2026-084",
    client_id: "c-4",
    client_name: "Pacific Bridge Builders",
    assigned_operator: "Unassigned",
    destination: "Harbor Pier 14",
    scheduled_date: "2026-10-04",
    status: "pending",
    total_amount: 3400.0,
    created_at: "2026-10-03T10:00:00Z",
  },
];

export default function KanbanPage() {
  const [jobs, setJobs] = useState<DispatchJob[]>(mockJobs);

  const handleStatusChange = (jobId: string, nextStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: nextStatus } : j))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Field Pipeline Kanban</h1>
        <p className="text-sm text-muted-foreground">
          Visual status board from initial dispatch to on-site work and final invoicing.
        </p>
      </div>

      <JobKanban jobs={jobs} onStatusChange={handleStatusChange} />
    </div>
  );
}
