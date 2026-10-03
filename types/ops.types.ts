export type JobStatus =
  | "pending"
  | "dispatched"
  | "on_site"
  | "completed"
  | "billed";

export type AssetStatus = "available" | "rented" | "maintenance" | "retired";

export interface Client {
  id: string;
  company_name: string;
  contact_person: string;
  phone: string;
  email?: string;
  service_address: string;
}

export interface InventoryAsset {
  id: string;
  asset_code: string;
  name: string;
  category: string;
  status: AssetStatus;
  daily_rate: number;
  current_location: string;
  last_inspected_at: string;
}

export interface DispatchJob {
  id: string;
  job_number: string;
  client_id: string;
  client_name?: string;
  client_phone?: string;
  assigned_operator: string;
  destination: string;
  scheduled_date: string;
  status: JobStatus;
  notes?: string;
  total_amount: number;
  created_at: string;
}

export interface ProofPhoto {
  id: string;
  job_id: string;
  photo_url: string;
  caption: string;
  captured_by: string;
  created_at: string;
}
