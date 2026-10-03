"use client";

import React, { useState } from "react";
import { InventoryAsset } from "@/types/ops.types";
import { AssetStatusBadge } from "@/components/ops/asset-status";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wrench, ShieldCheck, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const initialAssets: InventoryAsset[] = [
  {
    id: "a-1",
    asset_code: "EQ-801",
    name: "Caterpillar 320 Hydraulic Excavator",
    category: "Heavy Earthmoving",
    status: "rented",
    daily_rate: 1200,
    current_location: "Site: 742 Evergreen Terrace",
    last_inspected_at: "2026-09-28",
  },
  {
    id: "a-2",
    asset_code: "EQ-802",
    name: "JLG 450AJ Articulating Boom Lift",
    category: "Access Equipment",
    status: "available",
    daily_rate: 450,
    current_location: "Main Depot (Yard 2)",
    last_inspected_at: "2026-10-01",
  },
  {
    id: "a-3",
    asset_code: "EQ-803",
    name: "Doosan 70kVA Diesel Generator",
    category: "Power Systems",
    status: "maintenance",
    daily_rate: 350,
    current_location: "Depot Workshop (Service Bay A)",
    last_inspected_at: "2026-10-02",
  },
  {
    id: "a-4",
    asset_code: "EQ-804",
    name: "Toyota 8-Series 5000lb Forklift",
    category: "Material Handling",
    status: "available",
    daily_rate: 220,
    current_location: "Main Depot (Warehouse 1)",
    last_inspected_at: "2026-09-30",
  },
];

export default function InventoryPage() {
  const [assets] = useState<InventoryAsset[]>(initialAssets);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fleet &amp; Equipment Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Real-time asset deployment status, daily rate tracking, and maintenance logs.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Asset Tag
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="p-5 space-y-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {asset.asset_code}
                </span>
                <h3 className="font-bold text-base text-foreground mt-1">{asset.name}</h3>
                <p className="text-xs text-muted-foreground">{asset.category}</p>
              </div>
              <AssetStatusBadge status={asset.status} />
            </div>

            <div className="text-xs space-y-1.5 pt-2 border-t text-muted-foreground">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Current Location:
                </span>
                <span className="font-medium text-foreground">{asset.current_location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Last Service:
                </span>
                <span className="font-medium text-foreground">{formatDate(asset.last_inspected_at)}</span>
              </div>
              <div className="flex items-center justify-between font-semibold pt-1">
                <span>Daily Rental Value:</span>
                <span className="text-primary text-sm">{formatCurrency(asset.daily_rate)} / day</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
