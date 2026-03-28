/**
 * Analytics instrumentation helpers.
 *
 * These functions provide a structured way to track events.
 * Currently they log to console in development.
 * Replace with actual GTM/GA4 calls when analytics IDs are configured.
 *
 * TODO: Add GTM container ID or GA4 measurement ID from business team.
 */

type EventParams = Record<string, string | number | boolean>;

/** Track a custom event */
export function trackEvent(name: string, params?: EventParams) {
  // Push to GTM dataLayer if available
  if (typeof window !== "undefined" && "dataLayer" in window) {
    (window as unknown as { dataLayer: EventParams[] }).dataLayer.push({
      event: name,
      ...params,
    });
    return;
  }

  // Development fallback — log to console
  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${name}`, params);
  }
}

/** Track form submission */
export function trackFormSubmit(formName: string, params?: EventParams) {
  trackEvent("form_submit", { form_name: formName, ...params });
}

/** Track CTA click */
export function trackCTAClick(ctaLabel: string, destination: string) {
  trackEvent("cta_click", { cta_label: ctaLabel, destination });
}
