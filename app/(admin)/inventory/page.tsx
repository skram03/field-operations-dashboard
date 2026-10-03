"use client";

import React, { useState } from "react";
import { InventoryAsset } from "@/types/ops.types";
import { AssetStatusBadge } from "@/components/ops/asset-status";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wrench, ShieldCheck, MapPin, X } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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
  const [assets, setAssets] = useState<InventoryAsset[]>(initialAssets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("Heavy Earthmoving");
  const [dailyRate, setDailyRate] = useState("");
  const [location, setLocation] = useState("Main Depot (Yard 1)");

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName.trim()) return;

    const newAsset: InventoryAsset = {
      id: `a-${Date.now()}`,
      asset_code: `EQ-${Math.floor(805 + Math.random() * 100)}`,
      name: assetName.trim(),
      category,
      status: "available",
      daily_rate: parseFloat(dailyRate) || 350,
      current_location: location.trim(),
      last_inspected_at: new Date().toISOString().split("T")[0],
    };

    setAssets([newAsset, ...assets]);
    setAssetName("");
    setDailyRate("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fleet &amp; Equipment Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Real-time asset deployment status, daily rate tracking, and maintenance logs.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
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

      {/* Add Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg">Add New Equipment Asset</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Equipment Name</label>
                <Input
                  required
                  placeholder="e.g. Komatsu PC210LC Excavator"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  <option value="Heavy Earthmoving">Heavy Earthmoving</option>
                  <option value="Access Equipment">Access Equipment</option>
                  <option value="Power Systems">Power Systems</option>
                  <option value="Material Handling">Material Handling</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Daily Rental Rate ($)</label>
                <Input
                  type="number"
                  placeholder="450"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Current Location / Yard</label>
                <Input
                  placeholder="e.g. Main Depot (Yard 1)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Asset
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
