"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle2, UploadCloud, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProofModalProps {
  isOpen: boolean;
  jobId: string;
  onClose: () => void;
  onSubmit: (photoUrl: string, caption: string) => void;
}

export function ProofModal({ isOpen, jobId, onClose, onSubmit }: ProofModalProps) {
  const [caption, setCaption] = useState("");
  const [photoSelected, setPhotoSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit("https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800", caption);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="text-lg font-bold">Proof of Completion</h3>
            <p className="text-xs text-muted-foreground">Attach delivery slip or job site photo</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 mt-4">
          {!photoSelected ? (
            <div
              onClick={() => setPhotoSelected(true)}
              className="border-2 border-dashed border-primary/50 hover:bg-primary/5 cursor-pointer rounded-xl p-8 flex flex-col items-center justify-center gap-2 transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Camera className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-foreground">Tap to take photo / upload file</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, or Signed Receipt</p>
            </div>
          ) : (
            <div className="border rounded-xl p-4 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <CheckCircle2 className="h-5 w-5" />
                <span>site_delivery_photo_01.jpg (1.8MB)</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setPhotoSelected(false)}>
                Change
              </Button>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Site Notes / Customer Signature Name</label>
            <Input
              placeholder="e.g. Received by Site Manager Robert"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="pt-2 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 gap-2"
              disabled={!photoSelected || isSubmitting}
              onClick={handleSimulatedSubmit}
            >
              {isSubmitting ? "Uploading..." : "Save Proof"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
