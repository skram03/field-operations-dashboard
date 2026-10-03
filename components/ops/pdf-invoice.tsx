"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Building, CheckCheck } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface InvoiceData {
  jobId: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  serviceDate: string;
  operator: string;
  items: Array<{ description: string; quantity: number; rate: number }>;
  total: number;
}

export function PrintableVoucher({
  data,
  onClose,
}: {
  data: InvoiceData;
  onClose: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-4 flex justify-center">
      <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-3xl my-8 p-8 shadow-2xl space-y-8 print:border-none print:shadow-none print:m-0">
        {/* Actions header (Hidden on print) */}
        <div className="flex items-center justify-between border-b pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Official Delivery Voucher &amp; Invoice</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" /> Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Voucher Document */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tight text-primary">
                <Building className="h-7 w-7" />
                <span>OPSFLOW LOGISTICS</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Industrial Fleet &amp; Field Equipment Solutions
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Document Number
              </span>
              <p className="text-lg font-mono font-bold text-foreground">{data.jobId}</p>
              <p className="text-xs text-muted-foreground">Date: {formatDate(data.serviceDate)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-4 rounded-xl bg-muted/30 border">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Billed To:
              </h4>
              <p className="font-bold text-base">{data.clientName}</p>
              <p className="text-sm text-muted-foreground">{data.clientAddress}</p>
              <p className="text-xs text-muted-foreground mt-1">Tel: {data.clientPhone}</p>
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Dispatched By:
              </h4>
              <p className="font-semibold text-sm">OpsFlow Certified Field Crew</p>
              <p className="text-xs text-muted-foreground">Field Lead: {data.operator}</p>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-2">
                <CheckCheck className="h-3.5 w-3.5" /> Verified Completion
              </span>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
                <th className="p-3">Service / Item Description</th>
                <th className="p-3 text-center">Qty / Days</th>
                <th className="p-3 text-right">Unit Rate</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-medium">{item.description}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">{formatCurrency(item.rate)}</td>
                  <td className="p-3 text-right font-semibold">
                    {formatCurrency(item.quantity * item.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end pt-4 border-t">
            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal:</span>
                <span>{formatCurrency(data.total)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (0% B2B Reverse Charge):</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2 text-foreground">
                <span>Total Due:</span>
                <span>{formatCurrency(data.total)}</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-12 pt-12 text-center text-xs text-muted-foreground">
            <div className="border-t border-dashed pt-2">
              Authorized Dispatch Signature
            </div>
            <div className="border-t border-dashed pt-2">
              Customer Acknowledgment &amp; Receipt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
