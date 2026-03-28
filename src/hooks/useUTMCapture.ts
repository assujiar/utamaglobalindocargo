"use client";

import { useEffect } from "react";

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const UTM_STORAGE_KEY = "utc_attribution_data";

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_url?: string;
  captured_at?: string;
}

/**
 * Hook untuk menangkap UTM parameters dari URL.
 * Menyimpan ke localStorage saat pertama kali halaman dibuka.
 */
export function useUTMCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const utmData: UTMData = {};
    let hasUTM = false;

    for (const key of UTM_PARAMS) {
      const value = params.get(key);
      if (value) {
        utmData[key] = value;
        hasUTM = true;
      }
    }

    // Hanya simpan jika ada parameter UTM yang terdeteksi
    if (hasUTM) {
      utmData.landing_url = window.location.href;
      utmData.captured_at = new Date().toISOString();

      window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
    }
  }, []);
}

/**
 * Mengambil data UTM dari localStorage
 * Dipanggil saat form submission untuk disertakan dalam payload
 */
export function getStoredUTMData(): UTMData {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
