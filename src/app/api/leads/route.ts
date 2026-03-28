import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Server-side validation schema — stricter than client
const leadSchema = z.object({
  contact_person: z.string().min(2).max(200),
  company_name: z.string().min(2).max(200),
  executive_email: z.string().email().max(254),
  phone_whatsapp: z.string().min(5).max(30),
  service_interest: z.string().min(1).max(100),
  operational_volume: z.string().min(1).max(100),
  cargo_description: z.string().max(1000).optional().default(""),
  origin_destination: z.string().max(500).optional().default(""),
  timeline: z.string().max(200).optional().default(""),
  privacy_consent: z.literal(true, { error: "Privacy consent is required" }),
  utm_attribution: z.record(z.string(), z.string()).optional().default({}),
  // Honeypot — must be empty
  website_url: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check — bots fill hidden fields
    if (body.website_url && body.website_url.length > 0) {
      // Return fake success to bots
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validasi gagal", details: errors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Dynamic import of server client to avoid env var errors during build
    const { getSupabaseServer } = await import("@/lib/supabaseServer");
    const supabase = getSupabaseServer();

    const { error } = await supabase.from("leads_prospect").insert({
      contact_person: data.contact_person,
      company_name: data.company_name,
      executive_email: data.executive_email,
      phone_whatsapp: data.phone_whatsapp,
      service_interest: data.service_interest,
      operational_volume: data.operational_volume,
      cargo_description: data.cargo_description,
      origin_destination: data.origin_destination,
      timeline: data.timeline,
      privacy_consent: data.privacy_consent,
      utm_attribution: data.utm_attribution,
    });

    if (error) {
      console.error("[leads/route] Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Gagal menyimpan data. Silakan coba lagi atau hubungi kami langsung." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads/route] Unexpected error:", err);
    return NextResponse.json(
      { error: "Request tidak valid" },
      { status: 400 }
    );
  }
}
