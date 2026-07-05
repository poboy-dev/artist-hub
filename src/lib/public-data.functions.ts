import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function getPublicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export const getPublicAlbums = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getPublicClient();
  const { data, error } = await supabase.from("albums").select("*").eq("active", true).order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
});

export const getPublicVideos = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getPublicClient();
  const { data, error } = await supabase.from("videos").select("*").eq("active", true).order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
});

export const getPublicNews = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getPublicClient();
  const { data, error } = await supabase.from("news").select("*").eq("published", true).order("date", { ascending: false });
  if (error) throw error;
  return data ?? [];
});

export const getPublicTourDates = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getPublicClient();
  const { data, error } = await supabase.from("tour_dates").select("*").eq("active", true).order("date", { ascending: true });
  if (error) throw error;
  return data ?? [];
});

export const getPublicMerch = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getPublicClient();
  const { data, error } = await supabase.from("merch").select("*").eq("active", true).order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
});

export const getPublicCompositions = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getPublicClient();
  const { data, error } = await supabase.from("compositions").select("*").eq("active", true).order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
});
