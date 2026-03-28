import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseClient";

interface LeadPayload {
  company_name: string;
  executive_email: string;
  operational_volume: string;
  pain_point: string;
  utm_attribution: Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    // Validasi field wajib
    if (!body.company_name || !body.executive_email) {
      return NextResponse.json(
        { error: "company_name dan executive_email wajib diisi" },
        { status: 400 }
      );
    }

    // Validasi format email dasar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.executive_email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Injeksi ke tabel leads_prospect Supabase
    // utm_attribution disimpan sebagai JSONB (nested object)
    const { error } = await getSupabase().from("leads_prospect").insert({
      company_name: body.company_name,
      executive_email: body.executive_email,
      operational_volume: body.operational_volume,
      utm_attribution: {
        ...body.utm_attribution,
        pain_point: body.pain_point,
        submitted_at: new Date().toISOString(),
      },
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Gagal menyimpan data prospek" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Request tidak valid" },
      { status: 400 }
    );
  }
}
