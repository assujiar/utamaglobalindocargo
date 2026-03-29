/**
 * E2E Smoke Tests for UGC Logistics Website
 *
 * Run with: node --experimental-strip-types e2e/smoke.test.ts
 * Requires: production build running on localhost:3099
 */

const BASE = process.env.TEST_URL || "http://localhost:3099";

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

async function runTest(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    results.push({ name, passed: true, message: "OK" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    results.push({ name, passed: false, message });
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

async function fetchPage(path: string): Promise<{ status: number; body: string }> {
  const response = await fetch(`${BASE}${path}`, { redirect: "follow" });
  const body = await response.text();
  return { status: response.status, body };
}

async function main() {
  // --- Navigation Tests ---

  await runTest("Root redirects to /id", async () => {
    const res = await fetch(`${BASE}/`, { redirect: "manual" });
    assert(res.status === 307, `Expected 307, got ${res.status}`);
    const location = res.headers.get("location") || "";
    assert(location.includes("/id"), `Expected redirect to /id, got ${location}`);
  });

  await runTest("Homepage /id returns 200", async () => {
    const { status } = await fetchPage("/id");
    assert(status === 200, `Expected 200, got ${status}`);
  });

  await runTest("Homepage /en returns 200", async () => {
    const { status } = await fetchPage("/en");
    assert(status === 200, `Expected 200, got ${status}`);
  });

  const pages = [
    "/id/services", "/en/services",
    "/id/services/domestic-distribution",
    "/id/services/international-freight",
    "/id/services/import-dtd",
    "/id/services/warehousing",
    "/id/services/project-cargo",
    "/id/services/blocspace",
    "/id/industries", "/id/industries/manufacturing",
    "/id/case-studies",
    "/id/case-studies/manufacturing-import-consolidation",
    "/id/about", "/id/faq", "/id/contact",
    "/en/about", "/en/faq", "/en/contact",
  ];

  for (const page of pages) {
    await runTest(`Page ${page} returns 200`, async () => {
      const { status } = await fetchPage(page);
      assert(status === 200, `Expected 200, got ${status}`);
    });
  }

  // --- Content Tests ---

  await runTest("Indonesian homepage has correct hero headline", async () => {
    const { body } = await fetchPage("/id");
    assert(body.includes("Satu kendali untuk setiap handoff"), "Missing ID hero headline");
  });

  await runTest("English homepage has correct hero headline", async () => {
    const { body } = await fetchPage("/en");
    assert(body.includes("One line of control across every handoff"), "Missing EN hero headline");
  });

  await runTest("Footer contains tagline", async () => {
    const { body } = await fetchPage("/id");
    assert(body.includes("We Care What We Deliver"), "Missing tagline in footer");
  });

  await runTest("Services page lists all 6 categories", async () => {
    const { body } = await fetchPage("/id/services");
    assert(body.includes("Distribusi Domestik"), "Missing Distribusi Domestik");
    assert(body.includes("International Freight"), "Missing International Freight");
    assert(body.includes("Import Door-to-Door"), "Missing Import DTD");
    assert(body.includes("Warehousing"), "Missing Warehousing");
    assert(body.includes("Project Cargo"), "Missing Project Cargo");
    assert(body.includes("Blocspace"), "Missing Blocspace");
  });

  await runTest("About page contains brand tagline", async () => {
    const { body } = await fetchPage("/id/about");
    assert(body.includes("We Care What We Deliver"), "Missing tagline on About page");
  });

  // --- SEO Tests ---

  await runTest("robots.txt returns 200 with Sitemap", async () => {
    const { status, body } = await fetchPage("/robots.txt");
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.includes("Sitemap"), "Missing Sitemap in robots.txt");
  });

  await runTest("sitemap.xml returns 200 with both locales and case studies", async () => {
    const { status, body } = await fetchPage("/sitemap.xml");
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.includes("/id"), "Missing /id in sitemap");
    assert(body.includes("/en"), "Missing /en in sitemap");
    assert(body.includes("/case-studies/"), "Missing case study detail routes in sitemap");
  });

  await runTest("Homepage has JSON-LD with org name", async () => {
    const { body } = await fetchPage("/id");
    assert(body.includes("application/ld+json"), "Missing JSON-LD");
    assert(body.includes("Utama Globalindo Cargo"), "Missing org name in JSON-LD");
  });

  await runTest("FAQ page has FAQPage schema", async () => {
    const { body } = await fetchPage("/id/faq");
    assert(body.includes("FAQPage"), "Missing FAQPage schema");
  });

  // --- API Tests ---

  await runTest("API rejects empty POST with 400", async () => {
    const res = await fetch(`${BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  await runTest("API honeypot returns fake success", async () => {
    const res = await fetch(`${BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        website_url: "spam-bot-url",
        contact_person: "Bot",
        company_name: "Spam Co",
        executive_email: "bot@spam.com",
        phone_whatsapp: "123456",
        service_interest: "test",
        operational_volume: "tier-entry",
        privacy_consent: true,
      }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, "Expected success: true for honeypot");
  });

  // --- Results Summary ---

  console.log("\n=== E2E SMOKE TEST RESULTS ===\n");

  let passed = 0;
  let failed = 0;

  for (const r of results) {
    const icon = r.passed ? "PASS" : "FAIL";
    console.log(`[${icon}] ${r.name}${r.passed ? "" : ` -- ${r.message}`}`);
    if (r.passed) passed++;
    else failed++;
  }

  console.log(`\n${passed} passed, ${failed} failed, ${results.length} total\n`);

  if (failed > 0) process.exit(1);
}

main();
