# OpsFlow Internal Tool & Field Service Operations Portal 🚛

> **Turnkey Operational Portal for Traditional & Local Businesses**  
> (Equipment Rental, Logistics Dispatch, HVAC / Trade Contractors, Wholesale Suppliers).  
> Built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

---

## 🎯 The Core Business Problem

Traditional companies with \$1M–\$10M in revenue are paralyzed by:
- Lost delivery notes and messy WhatsApp chat threads
- No real-time status of driver/technician arrivals on job sites
- Equipment missing return dates without visibility
- Hours wasted every Friday manually re-typing paper invoices into old software

**OpsFlow eliminates all paper chaos in under 48 hours.**

---

## ✨ Features & Capabilities

- **Central Dispatch Board (Desktop):** Real-time monitoring of today's jobs, assigned operators, route destinations, and daily revenue counters.
- **Visual Kanban Pipeline:** Drag-and-drop workflow: `Pending` &rarr; `Dispatched` &rarr; `On-Site` &rarr; `Completed` &rarr; `Billed`.
- **Mobile-First Field App (`/field/[jobId]`):** Designed for smartphone browsers. Drivers tap "Call Site Manager", open 1-click Google Maps directions, and tap "Arrived".
- **Proof-of-Work Capture:** Built-in photo uploader for site condition photos, delivery receipts, and customer signature names.
- **Dynamic Printable Vouchers & Invoices:** Instant 1-click printable PDF delivery slips with automated totals, tax line items, and authorized signature blocks.
- **Fleet & Asset Inventory Tracker:** Real-time visibility into machine status (`Available`, `On Rent`, `Under Repair`) and daily billing rates.
- **Client Pitch Playbook (`/pitch-guide`):** Built-in cold email scripts, Loom recording outline, and pricing packages (\$2,200 setup + \$180/mo retainer).

---

## 📁 Project Architecture

```text
opsflow-internal-tool/
├── app/
│   ├── (admin)/
│   │   ├── page.tsx             # Dispatch board & active jobs roster
│   │   ├── kanban/page.tsx      # Multi-stage Kanban pipeline
│   │   └── inventory/page.tsx   # Fleet & equipment status tracker
│   ├── field/[jobId]/page.tsx   # Smartphone driver view
│   ├── pitch-guide/page.tsx     # Client pitch scripts & pricing model
│   └── globals.css
├── components/
│   ├── ops/
│   │   ├── job-kanban.tsx       # Kanban pipeline component
│   │   ├── proof-modal.tsx      # Mobile camera/proof photo modal
│   │   ├── pdf-invoice.tsx      # Printable voucher & invoice layout
│   │   └── asset-status.tsx     # Equipment availability badges
│   └── ui/                      # Base shadcn button, card, badge, input
├── lib/
│   ├── supabase/                # Browser and server Supabase clients
│   └── utils.ts                 # Currency and date formatters
├── supabase/
│   └── migrations/              # SQL tables: clients, dispatch_jobs, inventory, proof_photos
└── types/
    └── ops.types.ts             # Domain models for jobs, assets, and clients
```

---

## 🚀 Quickstart (5 Minutes)

### 1. Install Dependencies
```bash
git clone https://github.com/skram03/opsflow-internal-tool.git
cd opsflow-internal-tool
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

### 3. Deploy Database Schema
Execute `supabase/migrations/20260101000000_initial_ops_schema.sql` inside the Supabase SQL editor.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 💼 How to Make Money with This Tool

1. **Pick 5 local businesses** (Equipment rental, dumpster rental, commercial HVAC, courier delivery).
2. **Customize the company name** and logo on the invoice voucher.
3. **Record a 90-second Loom video** demonstrating the driver mobile screen and the instant printable voucher.
4. **Offer a 7-day risk-free pilot:**
   - Setup fee: **\$2,200**
   - Monthly maintenance/hosting: **\$180/month**

---

## 📄 License
MIT &copy; 2026 [skram03](https://github.com/skram03).
