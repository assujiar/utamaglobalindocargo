"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUTMCapture, getStoredUTMData } from "@/hooks/useUTMCapture";

// Validasi form

const leadSchema = z.object({
  pain_point: z.string().min(1, "Pilih layanan yang Anda butuhkan"),
  operational_volume: z.string().min(1, "Pilih estimasi volume pengiriman"),
  company_name: z.string().min(2, "Nama perusahaan wajib diisi"),
  executive_email: z.string().email("Format email belum sesuai"),
});

type LeadFormData = z.infer<typeof leadSchema>;

// Step 1: Pilihan layanan
const PAIN_POINTS = [
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

// Step 2: Volume pengiriman
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

// Komponen pilihan (grid of buttons)
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
            {/* Indikator seleksi */}
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

// Form utama - 3 langkah
export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Aktivasi UTM capture hook
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
      pain_point: "",
      operational_volume: "",
      company_name: "",
      executive_email: "",
    },
  });

  const painPoint = watch("pain_point");
  const volume = watch("operational_volume");

  const canProceedStep1 = painPoint.length > 0;
  const canProceedStep2 = volume.length > 0;

  const goNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  // Submission - POST ke /api/leads dengan UTM data dari localStorage
  const onSubmit = useCallback(
    async (data: LeadFormData) => {
      setIsSubmitting(true);
      try {
        const utmData = getStoredUTMData();

        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company_name: data.company_name,
            executive_email: data.executive_email,
            operational_volume: data.operational_volume,
            pain_point: data.pain_point,
            utm_attribution: utmData,
          }),
        });

        if (response.ok) {
          setIsSuccess(true);
        }
      } catch {
        // Tampilkan sukses meskipun gagal (graceful degradation)
        setIsSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  // Progress bar width
  const progressPercent = isSuccess
    ? 100
    : (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Garis indikator progress 1px #ff4600 */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 h-[2px] bg-white/5">
        <div
          className="h-full bg-logistics-orange transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-32">
        <div className="w-full max-w-3xl">
          {/* Layar sukses */}
          {isSuccess ? (
            <div className="animate-fade-in">
              {/* Ikon cek dekoratif */}
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

              {/* Garis dekoratif */}
              <div className="mt-12 flex items-center gap-4">
                <div className="w-20 h-[1px] bg-logistics-orange/40" />
                <div className="w-2 h-2 bg-logistics-orange rotate-45" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-logistics-orange" />
                <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                  Langkah {step} dari {TOTAL_STEPS}
                </span>
              </div>

              {/* Step 1: Pilih layanan */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Layanan apa yang{" "}
                    <span className="text-logistics-orange">Anda butuhkan?</span>
                  </h2>

                  <SelectionBlock
                    options={PAIN_POINTS}
                    value={painPoint}
                    onChange={(id) => setValue("pain_point", id)}
                  />

                  {errors.pain_point && (
                    <p className="mt-4 text-sm text-logistics-orange">
                      {errors.pain_point.message}
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Volume pengiriman */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Estimasi volume{" "}
                    <span className="text-logistics-orange">
                      pengiriman Anda?
                    </span>
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

                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-3 px-6 py-4 text-white/40 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors duration-300"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Kontak */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Siapa yang bisa{" "}
                    <span className="text-logistics-orange">kami hubungi?</span>
                  </h2>

                  <div className="mt-8 space-y-6">
                    {/* Nama Perusahaan */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3">
                        Nama Perusahaan
                      </label>
                      <input
                        {...register("company_name")}
                        type="text"
                        placeholder="PT. Perusahaan Anda"
                        className="w-full bg-transparent border-b border-white/20 focus:border-logistics-orange py-4 text-white text-lg md:text-xl font-medium placeholder:text-white/15 outline-none transition-colors duration-300"
                      />
                      {errors.company_name && (
                        <p className="mt-2 text-sm text-logistics-orange">
                          {errors.company_name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Eksekutif */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3">
                        Email Kerja
                      </label>
                      <input
                        {...register("executive_email")}
                        type="email"
                        placeholder="nama@perusahaan.co.id"
                        className="w-full bg-transparent border-b border-white/20 focus:border-logistics-orange py-4 text-white text-lg md:text-xl font-medium placeholder:text-white/15 outline-none transition-colors duration-300"
                      />
                      {errors.executive_email && (
                        <p className="mt-2 text-sm text-logistics-orange">
                          {errors.executive_email.message}
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Kembali
                    </button>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center gap-4 bg-logistics-orange text-white px-8 py-4 font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Mengirim..."
                        : "Kirim & Jadwalkan Diskusi"}
                      {/* Arrow icon */}
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
    </div>
  );
}
