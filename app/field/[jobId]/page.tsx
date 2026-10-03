"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProofModal } from "@/components/ops/proof-modal";
import {
  MapPin,
  Phone,
  Camera,
  CheckCircle2,
  Navigation,
  ArrowLeft,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function FieldMobilePage({ params }: { params: { jobId: string } }) {
  const [status, setStatus] = useState<"dispatched" | "on_site" | "completed">("dispatched");
  const [proofUploaded, setProofUploaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = {
    name: "Apex Civil Foundations",
    contact: "Robert Henderson (Site Manager)",
    phone: "+15552348901",
    address: "742 Evergreen Terrace, Sector 4",
    instructions: "Gate code is 4492. Call manager upon arrival at checkpoint.",
    items: "Heavy Boom Lift 45ft (Unit #EQ-802)",
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-between max-w-md mx-auto p-4 select-none">
      {/* Top Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dispatch
          </Link>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
            {params.jobId.toUpperCase()}
          </span>
        </div>

        {/* Current Job Status Header */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              Active Assignment
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 capitalize">
              <Clock className="h-3 w-3" /> {status.replace("_", " ")}
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">{client.name}</h2>
          <p className="text-xs text-zinc-400 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span>{client.address}</span>
          </p>
        </div>

        {/* Quick Action Dialers */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${client.phone}`}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-100 active:scale-95 transition-transform"
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            <span>Call Site Lead</span>
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(client.address)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-100 active:scale-95 transition-transform"
          >
            <Navigation className="h-4 w-4 text-blue-400" />
            <span>Open Maps</span>
          </a>
        </div>

        {/* Site Details Box */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs">
          <div>
            <span className="text-zinc-500 font-semibold block uppercase tracking-wider text-[10px]">
              Assigned Gear
            </span>
            <p className="font-semibold text-zinc-200 mt-0.5">{client.items}</p>
          </div>
          <div>
            <span className="text-zinc-500 font-semibold block uppercase tracking-wider text-[10px]">
              Gate / Access Instructions
            </span>
            <p className="text-amber-400/90 font-medium mt-0.5">{client.instructions}</p>
          </div>
        </div>

        {/* Proof of Work Card */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Delivery Proof &amp; Receipt
            </span>
            {proofUploaded && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Attached
              </span>
            )}
          </div>
          <Button
            variant="outline"
            className="w-full gap-2 border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 h-11"
            onClick={() => setIsModalOpen(true)}
          >
            <Camera className="h-4 w-4 text-primary" />
            <span>{proofUploaded ? "Update Photo Proof" : "Snap Delivery Photo"}</span>
          </Button>
        </div>
      </div>

      {/* Big Action Button (Sticky Bottom) */}
      <div className="pt-6 pb-2">
        {status === "dispatched" && (
          <Button
            className="w-full h-14 text-base font-bold bg-blue-600 hover:bg-blue-500 active:scale-95 transition-transform"
            onClick={() => setStatus("on_site")}
          >
            I Have Arrived On-Site &rarr;
          </Button>
        )}

        {status === "on_site" && (
          <Button
            className="w-full h-14 text-base font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-transform"
            disabled={!proofUploaded}
            onClick={() => setStatus("completed")}
          >
            {proofUploaded ? "Complete &amp; Submit Job &rarr;" : "Attach Photo First to Complete"}
          </Button>
        )}

        {status === "completed" && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-center space-y-1">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-sm text-emerald-200">Assignment Complete!</h4>
            <p className="text-xs text-zinc-400">Voucher sent to dispatch &amp; billed automatically.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProofModal
        isOpen={isModalOpen}
        jobId={params.jobId}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setProofUploaded(true)}
      />
    </div>
  );
}
