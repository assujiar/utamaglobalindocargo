"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUTMCapture, getStoredUTMData } from "@/hooks/useUTMCapture";

// --- Validation Schema ---

const leadSchema = z.object({
  service_interest: z.string().min(1, "Pilih layanan yang Anda butuhkan"),
  operational_volume: z.string().min(1, "Pilih estimasi volume pengiriman"),
  contact_person: z.string().min(2, "Nama lengkap wajib diisi"),
  company_name: z.string().min(2, "Nama perusahaan wajib diisi"),
  executive_email: z.string().email("Format email belum sesuai"),
  phone_whatsapp: z.string().min(5, "Nomor telepon / WhatsApp wajib diisi"),
  cargo_description: z.string().optional(),
  origin_destination: z.string().optional(),
  timeline: z.string().optional(),
  privacy_consent: z.literal(true, { error: "Anda harus menyetujui kebijakan privasi" }),
  // Honeypot — invisible to users
  website_url: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

// --- Step 1: Service Selection ---

const SERVICE_OPTIONS = [
  {
    id: "domestic-distribution",
    label: "Distribusi Domestik",
    desc: "FTL, LTL, FCL, LCL, atau airfreight ke seluruh Indonesia",
  },
  {
    id: "international-freight",
    label: "International Freight & Import DTD",
    desc: "Ekspor, impor, atau door-to-door dari negara asal",
  },
  {
    id: "customs-warehouse",
    label: "Customs Brokerage & Warehousing",
    desc: "Pengurusan bea cukai, penyimpanan, dan fulfillment",
  },
  {
    id: "project-cargo-charter",
    label: "Project Cargo, Blocspace & Charter",
    desc: "Muatan khusus, oversized, atau kebutuhan kapasitas terjamin",
  },
];

// --- Step 2: Volume Tiers ---

const VOLUME_TIERS = [
  {
    id: "tier-entry",
    label: "< $50k / bulan",
    desc: "Skala awal atau pengiriman berkala dengan volume terbatas",
  },
  {
    id: "tier-regional",
    label: "$50k - $150k / bulan",
    desc: "Pengiriman rutin dengan kebutuhan koordinasi multi-rute",
  },
  {
    id: "tier-national",
    label: "$150k - $500k / bulan",
    desc: "Distribusi nasional atau multi-negara dengan volume konsisten",
  },
  {
    id: "tier-global",
    label: "$500k+ / bulan",
    desc: "Operasi skala besar dengan rute internasional reguler",
  },
];

const TOTAL_STEPS = 3;

// --- Selection Block Component ---

function SelectionBlock({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string; desc: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-8">
      {options.map((opt) => {
        const isSelected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`group relative text-left p-6 md:p-8 border transition-all duration-300 ${
              isSelected
                ? "border-logistics-orange bg-logistics-orange/5"
                : "border-white/10 hover:border-white/30 bg-transparent"
            }`}
          >
            <div
              className={`absolute top-4 right-4 w-3 h-3 rotate-45 transition-colors duration-300 ${
                isSelected ? "bg-logistics-orange" : "bg-white/10"
              }`}
            />
            <span
              className={`block text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${
                isSelected ? "text-logistics-orange" : "text-white"
              }`}
            >
              {opt.label}
            </span>
            <span className="block mt-2 text-sm text-white/40 leading-relaxed">
              {opt.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// --- Text Input Component ---

function FormInput({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-white/20 focus:border-logistics-orange py-4 text-white text-lg md:text-xl font-medium placeholder:text-white/15 outline-none transition-colors duration-300"
      />
      {error && (
        <p className="mt-2 text-sm text-logistics-orange">{error}</p>
      )}
    </div>
  );
}

// --- Main Form ---

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useUTMCapture();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      service_interest: "",
      operational_volume: "",
      contact_person: "",
      company_name: "",
      executive_email: "",
      phone_whatsapp: "",
      cargo_description: "",
      origin_destination: "",
      timeline: "",
      website_url: "",
    },
  });

  const serviceInterest = watch("service_interest");
  const volume = watch("operational_volume");

  const canProceedStep1 = serviceInterest.length > 0;
  const canProceedStep2 = volume.length > 0;

  const goNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
    setSubmitError(null);
  }, []);

  const onSubmit = useCallback(
    async (data: LeadFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const utmData = getStoredUTMData();

        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            utm_attribution: utmData,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setIsSuccess(true);
          } else {
            setSubmitError(
              result.error || "Terjadi kesalahan. Silakan coba lagi."
            );
          }
        } else {
          const result = await response.json().catch(() => null);
          setSubmitError(
            result?.error ||
              "Gagal mengirim formulir. Silakan coba lagi atau hubungi kami langsung."
          );
        }
      } catch {
        setSubmitError(
          "Koneksi bermasalah. Silakan periksa koneksi internet Anda dan coba lagi, atau hubungi kami langsung melalui email atau WhatsApp."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const progressPercent = isSuccess ? 100 : (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 h-[2px] bg-white/5">
        <div
          className="h-full bg-logistics-orange transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-32">
        <div className="w-full max-w-3xl">
          {/* Success Screen */}
          {isSuccess ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-logistics-orange" />
                <div className="w-3 h-3 bg-logistics-orange rotate-45" />
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
                Terima Kasih.{" "}
                <span className="text-logistics-orange">
                  Kami Akan Segera Menghubungi.
                </span>
              </h2>

              <p className="mt-8 text-base md:text-lg text-white/40 leading-relaxed max-w-2xl">
                Tim kami akan merespons dalam 1 hari kerja untuk menjadwalkan
                diskusi awal sesuai kebutuhan yang Anda sampaikan.
              </p>

              <div className="mt-12 flex items-center gap-4">
                <div className="w-20 h-[1px] bg-logistics-orange/40" />
                <div className="w-2 h-2 bg-logistics-orange rotate-45" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Honeypot — hidden from users, visible to bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input
                  {...register("website_url")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-logistics-orange" />
                <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                  Langkah {step} dari {TOTAL_STEPS}
                </span>
              </div>

              {/* Error banner */}
              {submitError && (
                <div className="mb-8 p-4 border border-red-500/30 bg-red-500/5">
                  <p className="text-sm text-red-400">{submitError}</p>
                  <p className="mt-2 text-xs text-white/30">
                    Atau hubungi kami langsung:{" "}
                    <a
                      href="mailto:info@utamaglobalindocargo.com"
                      className="text-logistics-orange hover:underline"
                    >
                      info@utamaglobalindocargo.com
                    </a>
                  </p>
                </div>
              )}

              {/* Step 1: Service selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Layanan apa yang{" "}
                    <span className="text-logistics-orange">Anda butuhkan?</span>
                  </h2>

                  <SelectionBlock
                    options={SERVICE_OPTIONS}
                    value={serviceInterest}
                    onChange={(id) => setValue("service_interest", id)}
                  />

                  {errors.service_interest && (
                    <p className="mt-4 text-sm text-logistics-orange">
                      {errors.service_interest.message}
                    </p>
                  )}

                  <div className="mt-10 flex justify-end">
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canProceedStep1}
                      className={`flex items-center gap-3 px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                        canProceedStep1
                          ? "bg-logistics-orange text-white hover:bg-logistics-orange/90"
                          : "bg-white/5 text-white/20 cursor-not-allowed"
                      }`}
                    >
                      Lanjutkan
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Volume + cargo context */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Estimasi volume{" "}
                    <span className="text-logistics-orange">pengiriman Anda?</span>
                  </h2>

                  <SelectionBlock
                    options={VOLUME_TIERS}
                    value={volume}
                    onChange={(id) => setValue("operational_volume", id)}
                  />

                  {errors.operational_volume && (
                    <p className="mt-4 text-sm text-logistics-orange">
                      {errors.operational_volume.message}
                    </p>
                  )}

                  {/* Optional context fields */}
                  <div className="mt-10 space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3">
                        Deskripsi Kargo{" "}
                        <span className="text-white/15">(opsional)</span>
                      </label>
                      <input
                        {...register("cargo_description")}
                        type="text"
                        placeholder="Contoh: komponen elektronik, bahan kimia, alat berat..."
                        className="w-full bg-transparent border-b border-white/20 focus:border-logistics-orange py-4 text-white text-base font-medium placeholder:text-white/15 outline-none transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3">
                        Rute / Asal — Tujuan{" "}
                        <span className="text-white/15">(opsional)</span>
                      </label>
                      <input
                        {...register("origin_destination")}
                        type="text"
                        placeholder="Contoh: Shanghai → Jakarta, Surabaya → Makassar..."
                        className="w-full bg-transparent border-b border-white/20 focus:border-logistics-orange py-4 text-white text-base font-medium placeholder:text-white/15 outline-none transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3">
                        Target Timeline{" "}
                        <span className="text-white/15">(opsional)</span>
                      </label>
                      <input
                        {...register("timeline")}
                        type="text"
                        placeholder="Contoh: dalam 2 minggu, reguler bulanan, ASAP..."
                        className="w-full bg-transparent border-b border-white/20 focus:border-logistics-orange py-4 text-white text-base font-medium placeholder:text-white/15 outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-3 px-6 py-4 text-white/40 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors duration-300"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Kembali
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canProceedStep2}
                      className={`flex items-center gap-3 px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                        canProceedStep2
                          ? "bg-logistics-orange text-white hover:bg-logistics-orange/90"
                          : "bg-white/5 text-white/20 cursor-not-allowed"
                      }`}
                    >
                      Lanjutkan
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact details + consent */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Siapa yang bisa{" "}
                    <span className="text-logistics-orange">kami hubungi?</span>
                  </h2>

                  <div className="mt-8 space-y-6">
                    <FormInput
                      label="Nama Lengkap"
                      {...register("contact_person")}
                      type="text"
                      placeholder="Nama lengkap Anda"
                      error={errors.contact_person?.message}
                    />

                    <FormInput
                      label="Nama Perusahaan"
                      {...register("company_name")}
                      type="text"
                      placeholder="PT. Perusahaan Anda"
                      error={errors.company_name?.message}
                    />

                    <FormInput
                      label="Email Kerja"
                      {...register("executive_email")}
                      type="email"
                      placeholder="nama@perusahaan.co.id"
                      error={errors.executive_email?.message}
                    />

                    <FormInput
                      label="Telepon / WhatsApp"
                      {...register("phone_whatsapp")}
                      type="tel"
                      placeholder="+62 812 xxxx xxxx"
                      error={errors.phone_whatsapp?.message}
                    />

                    {/* Privacy consent */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register("privacy_consent")}
                          className="mt-1 w-4 h-4 accent-logistics-orange bg-transparent border-white/20"
                        />
                        <span className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                          Saya menyetujui bahwa data yang saya kirimkan akan
                          digunakan oleh PT Utama Globalindo Cargo untuk
                          merespons permintaan ini dan menghubungi saya terkait
                          layanan logistik. Data tidak akan dibagikan ke pihak
                          ketiga tanpa persetujuan.
                        </span>
                      </label>
                      {errors.privacy_consent && (
                        <p className="mt-2 ml-8 text-sm text-logistics-orange">
                          {errors.privacy_consent.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-3 px-6 py-4 text-white/40 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors duration-300"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Kembali
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center gap-4 bg-logistics-orange text-white px-8 py-4 font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? "Mengirim..." : "Kirim & Jadwalkan Diskusi"}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <polygon
                          points="16,2 28,9 28,23 16,30 4,23 4,9"
                          stroke="#fff"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <path
                          d="M12 16h8M17 12l4 4-4 4"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Direct contact fallback */}
      <div className="px-6 md:px-16 pb-16">
        <div className="max-w-3xl mx-auto border-t border-white/5 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mb-4">
            Atau hubungi kami langsung
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="mailto:info@utamaglobalindocargo.com"
              className="text-sm text-white/40 hover:text-logistics-orange transition-colors"
            >
              info@utamaglobalindocargo.com
            </a>
            <span className="text-sm text-white/40">
              Jakarta, Indonesia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
