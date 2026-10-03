-- ==============================================================================
-- OPSFLOW: Field Service, Dispatch & Inventory PostgreSQL Schema
-- ==============================================================================

-- 1. Clients Table (Local B2B Customers)
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Inventory & Fleet Equipment
CREATE TABLE IF NOT EXISTS public.inventory_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented', 'maintenance', 'retired')),
  daily_rate NUMERIC(10, 2) DEFAULT 0.00,
  current_location TEXT,
  last_inspected_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Dispatch & Field Service Jobs
CREATE TABLE IF NOT EXISTS public.dispatch_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_number TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE RESTRICT NOT NULL,
  assigned_operator TEXT NOT NULL,
  destination TEXT NOT NULL,
  scheduled_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'dispatched', 'on_site', 'completed', 'billed')),
  notes TEXT,
  total_amount NUMERIC(10, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Proof of Work & Delivery Photos
CREATE TABLE IF NOT EXISTS public.proof_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.dispatch_jobs(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  caption TEXT,
  captured_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Audit & Status Change Trail
CREATE TABLE IF NOT EXISTS public.status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.dispatch_jobs(id) ON DELETE CASCADE NOT NULL,
  from_status TEXT NOT NULL,
  to_status TEXT NOT NULL,
  changed_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proof_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_history ENABLE ROW LEVEL SECURITY;

-- Allow authenticated personnel full read/write access
CREATE POLICY "Staff can view clients" ON public.clients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can insert clients" ON public.clients FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Staff can update clients" ON public.clients FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Staff can view inventory" ON public.inventory_assets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can update inventory" ON public.inventory_assets FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Staff can view dispatch jobs" ON public.dispatch_jobs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can insert dispatch jobs" ON public.dispatch_jobs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Staff can update dispatch jobs" ON public.dispatch_jobs FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Staff can view proof photos" ON public.proof_photos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can insert proof photos" ON public.proof_photos FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Staff can view history" ON public.status_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can insert history" ON public.status_history FOR INSERT TO authenticated WITH CHECK (true);
