import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function verifyAdmin(context: { supabase: { rpc: (fn: "has_role", args: { _user_id: string; _role: "admin" | "moderator" | "user" }) => unknown }; userId: string }) {
  const result = await (context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  }) as Promise<{ data: boolean | null; error: Error | null }>);
  if (!result.data) throw new Error("Forbidden: Admin access required");
}

// Dashboard stats
export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data: albums } = await context.supabase.from("albums").select("id", { count: "exact" });
    const { data: news } = await context.supabase.from("news").select("id", { count: "exact" });
    const { data: tour } = await context.supabase.from("tour_dates").select("id", { count: "exact" });
    const { data: videos } = await context.supabase.from("videos").select("id", { count: "exact" });
    const { data: merch } = await context.supabase.from("merch").select("id", { count: "exact" });
    const { data: compositions } = await context.supabase.from("compositions").select("id", { count: "exact" });
    const { data: members } = await context.supabase.from("fan_club_members").select("id", { count: "exact" });
    const { data: orders } = await context.supabase.from("orders").select("id", { count: "exact" });
    return {
      albums: albums?.length ?? 0,
      news: news?.length ?? 0,
      tour: tour?.length ?? 0,
      videos: videos?.length ?? 0,
      merch: merch?.length ?? 0,
      compositions: compositions?.length ?? 0,
      members: members?.length ?? 0,
      orders: orders?.length ?? 0,
    };
  });

// Albums
export const getAlbumsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("albums").select("*").order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  });

export const createAlbum = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      year: z.number().int(),
      type: z.string().default("LP"),
      tracks: z.number().int().default(0),
      buy_url: z.string().nullable().default(null),
      stream_url: z.string().nullable().default(null),
      tagline: z.string().nullable().default(null),
      sort_order: z.number().int().default(0),
      active: z.boolean().default(true),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("albums").insert(data).select().single();
    if (error) throw error;
    return result;
  });

export const updateAlbum = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      id: z.string().uuid(),
      slug: z.string().min(1).optional(),
      title: z.string().min(1).optional(),
      year: z.number().int().optional(),
      type: z.string().optional(),
      tracks: z.number().int().optional(),
      buy_url: z.string().nullable().optional(),
      stream_url: z.string().nullable().optional(),
      tagline: z.string().nullable().optional(),
      sort_order: z.number().int().optional(),
      active: z.boolean().optional(),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { id, ...rest } = data;
    const { data: result, error } = await context.supabase.from("albums").update(rest).eq("id", id).select().single();
    if (error) throw error;
    return result;
  });

export const deleteAlbum = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase.from("albums").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

// News
export const getNewsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("news").select("*").order("date", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const createNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      date: z.string(),
      excerpt: z.string().min(1),
      content: z.string().nullable().default(null),
      tag: z.string().default("News"),
      published: z.boolean().default(true),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("news").insert(data).select().single();
    if (error) throw error;
    return result;
  });

export const updateNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      id: z.string().uuid(),
      slug: z.string().min(1).optional(),
      title: z.string().min(1).optional(),
      date: z.string().optional(),
      excerpt: z.string().min(1).optional(),
      content: z.string().nullable().optional(),
      tag: z.string().optional(),
      published: z.boolean().optional(),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { id, ...rest } = data;
    const { data: result, error } = await context.supabase.from("news").update(rest).eq("id", id).select().single();
    if (error) throw error;
    return result;
  });

export const deleteNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase.from("news").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

// Tour Dates
export const getTourDatesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("tour_dates").select("*").order("date", { ascending: true });
    if (error) throw error;
    return data ?? [];
  });

export const createTourDate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      date: z.string(),
      city: z.string().min(1),
      country: z.string().min(1),
      venue: z.string().min(1),
      status: z.string().default("onsale"),
      ticket_url: z.string().nullable().default(null),
      vip: z.boolean().default(false),
      active: z.boolean().default(true),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("tour_dates").insert(data).select().single();
    if (error) throw error;
    return result;
  });

export const updateTourDate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      id: z.string().uuid(),
      date: z.string().optional(),
      city: z.string().min(1).optional(),
      country: z.string().min(1).optional(),
      venue: z.string().min(1).optional(),
      status: z.string().optional(),
      ticket_url: z.string().nullable().optional(),
      vip: z.boolean().optional(),
      active: z.boolean().optional(),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { id, ...rest } = data;
    const { data: result, error } = await context.supabase.from("tour_dates").update(rest).eq("id", id).select().single();
    if (error) throw error;
    return result;
  });

export const deleteTourDate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase.from("tour_dates").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

// Videos
export const getVideosAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("videos").select("*").order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  });

export const createVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      title: z.string().min(1),
      youtube_id: z.string().min(1),
      thumb_url: z.string().nullable().default(null),
      era: z.string().nullable().default(null),
      director: z.string().nullable().default(null),
      sort_order: z.number().int().default(0),
      active: z.boolean().default(true),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("videos").insert(data).select().single();
    if (error) throw error;
    return result;
  });

export const updateVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      id: z.string().uuid(),
      title: z.string().min(1).optional(),
      youtube_id: z.string().min(1).optional(),
      thumb_url: z.string().nullable().optional(),
      era: z.string().nullable().optional(),
      director: z.string().nullable().optional(),
      sort_order: z.number().int().optional(),
      active: z.boolean().optional(),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { id, ...rest } = data;
    const { data: result, error } = await context.supabase.from("videos").update(rest).eq("id", id).select().single();
    if (error) throw error;
    return result;
  });

export const deleteVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase.from("videos").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

// Merch
export const getMerchAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("merch").select("*").order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  });

export const createMerch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      name: z.string().min(1),
      price: z.string().min(1),
      cover_url: z.string().nullable().default(null),
      tag: z.string().default("Apparel"),
      sort_order: z.number().int().default(0),
      active: z.boolean().default(true),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("merch").insert(data).select().single();
    if (error) throw error;
    return result;
  });

export const updateMerch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      id: z.string().uuid(),
      name: z.string().min(1).optional(),
      price: z.string().min(1).optional(),
      cover_url: z.string().nullable().optional(),
      tag: z.string().optional(),
      sort_order: z.number().int().optional(),
      active: z.boolean().optional(),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { id, ...rest } = data;
    const { data: result, error } = await context.supabase.from("merch").update(rest).eq("id", id).select().single();
    if (error) throw error;
    return result;
  });

export const deleteMerch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase.from("merch").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

// Compositions
export const getCompositionsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("compositions").select("*").order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  });

export const createComposition = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      title: z.string().min(1),
      key: z.string().min(1),
      pages: z.number().int().default(1),
      difficulty: z.string().default("Intermediate"),
      sort_order: z.number().int().default(0),
      active: z.boolean().default(true),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("compositions").insert(data).select().single();
    if (error) throw error;
    return result;
  });

export const updateComposition = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      id: z.string().uuid(),
      title: z.string().min(1).optional(),
      key: z.string().min(1).optional(),
      pages: z.number().int().optional(),
      difficulty: z.string().optional(),
      sort_order: z.number().int().optional(),
      active: z.boolean().optional(),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { id, ...rest } = data;
    const { data: result, error } = await context.supabase.from("compositions").update(rest).eq("id", id).select().single();
    if (error) throw error;
    return result;
  });

export const deleteComposition = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase.from("compositions").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

// Fan Club Members
export const getFanClubMembers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("fan_club_members").select("*").order("joined_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

// Orders
export const getOrdersAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context);
    const { data, error } = await context.supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const createOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const schema = z.object({
      customer_email: z.string().email(),
      items: z.array(z.record(z.any())).default([]),
      total: z.string().min(1),
      status: z.string().default("pending"),
    });
    return schema.parse(data);
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("orders").insert(data as any).select().single();
    if (error) throw error;
    return result;
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid(), status: z.string() }).parse(data))
  .handler(async ({ context, data }) => {
    await verifyAdmin(context);
    const { data: result, error } = await context.supabase.from("orders").update({ status: data.status }).eq("id", data.id).select().single();
    if (error) throw error;
    return result;
  });
