import React from "react";
import { Badge } from "@/components/ui/badge";
import { AssetStatus } from "@/types/ops.types";
import { cn } from "@/lib/utils";

interface AssetStatusProps {
  status: AssetStatus;
  className?: string;
}

const statusMap: Record<AssetStatus, { label: string; className: string }> = {
  available: {
    label: "Available",
    className: "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  rented: {
    label: "On Rent",
    className: "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-400",
  },
  maintenance: {
    label: "Under Repair",
    className: "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400",
  },
  retired: {
    label: "Retired",
    className: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-zinc-800 dark:text-zinc-400",
  },
};

export function AssetStatusBadge({ status, className }: AssetStatusProps) {
  const config = statusMap[status] || statusMap.available;
  return (
    <Badge variant="outline" className={cn("text-xs font-semibold px-2 py-0.5", config.className, className)}>
      {config.label}
    </Badge>
  );
}
