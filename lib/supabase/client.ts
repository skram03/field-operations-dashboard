import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("your-project") || key.includes("your-anon-key")) {
    return createBrowserClient(
      "https://placeholder.supabase.co",
      "placeholder-key-for-dev-preview"
    );
  }

  return createBrowserClient(url, key);
}
