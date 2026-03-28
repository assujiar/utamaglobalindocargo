"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUTMCapture, getStoredUTMData } from "@/hooks/useUTMCapture";
import { trackFormSubmit } from "@/lib/analytics";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface ContactFormProps {
  dict: Dictionary;
}

const leadSchema = z.object({
  service_interest: z.string().min(1, "Required"),
  operational_volume: z.string().min(1, "Required"),
  contact_person: z.string().min(2, "Required"),
  company_name: z.string().min(2, "Required"),
  executive_email: z.string().email("Invalid email"),
  phone_whatsapp: z.string().min(5, "Required"),
  cargo_description: z.string().optional(),
  origin_destination: z.string().optional(),
  timeline: z.string().optional(),
  privacy_consent: z.literal(true, { error: "Consent required" }),
  website_url: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

const SERVICE_OPTIONS_ID = [
  { id: "domestic-distribution", label: "Distribusi Domestik", desc: "FTL, LTL, FCL, LCL, atau airfreight ke seluruh Indonesia" },
  { id: "international-freight", label: "International Freight & Import DTD", desc: "Ekspor, impor, atau door-to-door dari negara asal" },
  { id: "customs-warehouse", label: "Customs Brokerage & Warehousing", desc: "Pengurusan bea cukai, penyimpanan, dan fulfillment" },
  { id: "project-cargo-charter", label: "Project Cargo, Blocspace & Charter", desc: "Muatan khusus, oversized, atau kebutuhan kapasitas terjamin" },
];

const SERVICE_OPTIONS_EN = [
  { id: "domestic-distribution", label: "Domestic Distribution", desc: "FTL, LTL, FCL, LCL, or airfreight across Indonesia" },
  { id: "international-freight", label: "International Freight & Import DTD", desc: "Export, import, or door-to-door from origin country" },
  { id: "customs-warehouse", label: "Customs Brokerage & Warehousing", desc: "Customs clearance, storage, and fulfillment" },
  { id: "project-cargo-charter", label: "Project Cargo, Blocspace & Charter", desc: "Special cargo, oversized, or guaranteed capacity needs" },
];

const VOLUME_TIERS_ID = [
  { id: "tier-entry", label: "< $50k / bulan", desc: "Skala awal atau pengiriman berkala dengan volume terbatas" },
  { id: "tier-regional", label: "$50k - $150k / bulan", desc: "Pengiriman rutin dengan kebutuhan koordinasi multi-rute" },
  { id: "tier-national", label: "$150k - $500k / bulan", desc: "Distribusi nasional atau multi-negara dengan volume konsisten" },
  { id: "tier-global", label: "$500k+ / bulan", desc: "Operasi skala besar dengan rute internasional reguler" },
];

const VOLUME_TIERS_EN = [
  { id: "tier-entry", label: "< $50k / month", desc: "Entry scale or periodic shipments with limited volume" },
  { id: "tier-regional", label: "$50k - $150k / month", desc: "Regular shipments with multi-route coordination" },
  { id: "tier-national", label: "$150k - $500k / month", desc: "National or multi-country distribution with consistent volume" },
  { id: "tier-global", label: "$500k+ / month", desc: "Large-scale operations with regular international routes" },
];

const TOTAL_STEPS = 3;

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

function FormInput({
  label,
  error,
  optional,
  ...props
}: {
  label: string;
  error?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3">
        {label}
        {optional && <span className="text-white/15 ml-2">(optional)</span>}
      </label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-white/20 focus:border-logistics-orange py-4 text-white text-lg md:text-xl font-medium placeholder:text-white/15 outline-none transition-colors duration-300"
      />
      {error && (
        <p className="mt-2 text-sm text-logistics-orange" role="alert">{error}</p>
      )}
    </div>
  );
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useUTMCapture();

  const isEN = dict.nav.home === "Home";
  const serviceOptions = isEN ? SERVICE_OPTIONS_EN : SERVICE_OPTIONS_ID;
  const volumeTiers = isEN ? VOLUME_TIERS_EN : VOLUME_TIERS_ID;

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
            trackFormSubmit("contact_lead", {
              service_interest: data.service_interest,
              operational_volume: data.operational_volume,
            });
          } else {
            setSubmitError(result.error || (isEN ? "An error occurred. Please try again." : "Terjadi kesalahan. Silakan coba lagi."));
          }
        } else {
          const result = await response.json().catch(() => null);
          setSubmitError(result?.error || (isEN ? "Failed to submit. Please try again or contact us directly." : "Gagal mengirim formulir. Silakan coba lagi atau hubungi kami langsung."));
        }
      } catch {
        setSubmitError(dict.contact.orContactDirectly);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isEN, dict.contact.orContactDirectly]
  );

  const progressPercent = isSuccess ? 100 : (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-[2px] bg-white/5 mb-12">
        <div
          className="h-full bg-logistics-orange transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
        />
      </div>

      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-3xl">
          {/* Success Screen */}
          {isSuccess ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-logistics-orange" />
                <div className="w-3 h-3 bg-logistics-orange rotate-45" />
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
                {dict.contact.successTitle}{" "}
                <span className="text-logistics-orange">
                  {isEN ? "We'll Be in Touch." : "Kami Akan Segera Menghubungi."}
                </span>
              </h2>
              <p className="mt-8 text-base md:text-lg text-white/40 leading-relaxed max-w-2xl">
                {dict.contact.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input {...register("website_url")} type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-logistics-orange" />
                <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                  {isEN ? "Step" : "Langkah"} {step} {dict.contact.stepOf} {TOTAL_STEPS}
                </span>
              </div>

              {/* Error banner */}
              {submitError && (
                <div className="mb-8 p-4 border border-red-500/30 bg-red-500/5" role="alert">
                  <p className="text-sm text-red-400">{submitError}</p>
                  <p className="mt-2 text-xs text-white/30">
                    {dict.contact.directContact}:{" "}
                    <a href="mailto:info@utamaglobalindocargo.com" className="text-logistics-orange hover:underline">
                      info@utamaglobalindocargo.com
                    </a>
                  </p>
                </div>
              )}

              {/* Step 1: Service selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    {dict.contact.step1Title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-logistics-orange">
                      {dict.contact.step1Title.split(" ").slice(-1)}
                    </span>
                  </h2>
                  <SelectionBlock
                    options={serviceOptions}
                    value={serviceInterest}
                    onChange={(id) => setValue("service_interest", id)}
                  />
                  {errors.service_interest && (
                    <p className="mt-4 text-sm text-logistics-orange" role="alert">
                      {dict.contact.errors.serviceRequired}
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
                      {dict.contact.next}
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
                    {dict.contact.step2Title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-logistics-orange">
                      {dict.contact.step2Title.split(" ").slice(-1)}
                    </span>
                  </h2>
                  <SelectionBlock
                    options={volumeTiers}
                    value={volume}
                    onChange={(id) => setValue("operational_volume", id)}
                  />
                  {errors.operational_volume && (
                    <p className="mt-4 text-sm text-logistics-orange" role="alert">
                      {dict.contact.errors.volumeRequired}
                    </p>
                  )}

                  <div className="mt-10 space-y-6">
                    <FormInput
                      label={dict.contact.fields.cargoDescription}
                      optional
                      {...register("cargo_description")}
                      type="text"
                      placeholder={dict.contact.placeholders.cargoDescription}
                    />
                    <FormInput
                      label={dict.contact.fields.originDestination}
                      optional
                      {...register("origin_destination")}
                      type="text"
                      placeholder={dict.contact.placeholders.originDestination}
                    />
                    <FormInput
                      label={dict.contact.fields.timeline}
                      optional
                      {...register("timeline")}
                      type="text"
                      placeholder={dict.contact.placeholders.timeline}
                    />
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
                      {dict.contact.back}
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
                      {dict.contact.next}
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
                    {dict.contact.step3Title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-logistics-orange">
                      {dict.contact.step3Title.split(" ").slice(-1)}
                    </span>
                  </h2>

                  <div className="mt-8 space-y-6">
                    <FormInput
                      label={dict.contact.fields.contactPerson}
                      {...register("contact_person")}
                      type="text"
                      placeholder={dict.contact.placeholders.contactPerson}
                      error={errors.contact_person ? dict.contact.errors.nameRequired : undefined}
                    />
                    <FormInput
                      label={dict.contact.fields.companyName}
                      {...register("company_name")}
                      type="text"
                      placeholder={dict.contact.placeholders.companyName}
                      error={errors.company_name ? dict.contact.errors.companyRequired : undefined}
                    />
                    <FormInput
                      label={dict.contact.fields.email}
                      {...register("executive_email")}
                      type="email"
                      placeholder={dict.contact.placeholders.email}
                      error={errors.executive_email ? dict.contact.errors.emailInvalid : undefined}
                    />
                    <FormInput
                      label={dict.contact.fields.phone}
                      {...register("phone_whatsapp")}
                      type="tel"
                      placeholder={dict.contact.placeholders.phone}
                      error={errors.phone_whatsapp ? dict.contact.errors.phoneRequired : undefined}
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
                          {dict.contact.privacyConsent}
                        </span>
                      </label>
                      {errors.privacy_consent && (
                        <p className="mt-2 ml-8 text-sm text-logistics-orange" role="alert">
                          {dict.contact.errors.consentRequired}
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
                      {dict.contact.back}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center gap-4 bg-logistics-orange text-white px-8 py-4 font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? dict.contact.submitting : dict.contact.submit}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
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
      <div className="mt-16 border-t border-white/5 pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mb-4">
          {dict.contact.directContact}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <a
            href="mailto:info@utamaglobalindocargo.com"
            className="text-sm text-white/40 hover:text-logistics-orange transition-colors"
          >
            info@utamaglobalindocargo.com
          </a>
          <span className="text-sm text-white/40">Jakarta, Indonesia</span>
        </div>
      </div>
    </div>
  );
}
