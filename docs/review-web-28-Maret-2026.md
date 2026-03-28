Verdict jujurnya: ini belum siap publish. Yang ada sekarang itu prototype visual yang cukup niat, bukan company website logistik yang sudah matang secara bisnis, trust, funnel, dan production hardening.

Saya taruh penilaiannya begini:

Area	Nilai
Visual direction	7/10
Front-end structure	6/10
Motion experimentation	7/10
Information architecture	4/10
Trust & credibility	3/10
Lead capture quality	3/10
SEO foundation	4/10
Accessibility	3/10
Production readiness	2.5/10

Kalau dipaksa jadi persentase, saya nilai:

konsep visual prototype: sekitar 60%
website company profile yang layak jual: sekitar 40%
publish-ready production build: sekitar 25–30%

Ada fondasi. Tapi masih banyak yang kosmetik, placeholder, atau belum aman.

Satu catatan penting. Saya tidak bisa memverifikasi runtime penuh di container ini karena install dependency menghasilkan node_modules yang tidak runnable normal di environment saya. Jadi penilaian teknis di bawah berbasis code inspection mendalam, bukan klaim “build sukses di mesin saya”. Itu lebih jujur.

Apa yang sudah bagus

Repo ini bukan abal-abal. Ada beberapa hal yang memang sudah lumayan benar.

Arsitektur Next App Router-nya rapi. Struktur komponen cukup masuk akal. Service pages dipisah jelas. Hero punya identitas visual. Ada upaya serius untuk bikin brand feel yang beda dari web logistik generik. Penggunaan GSAP, Framer, Lenis, dan React Three Fiber juga bukan sekadar tempelan.

HeroSection, ServicesHorizontal, dan ServicePageLayout menunjukkan arah kreatif yang jelas. src/app/layout.tsx juga sudah punya metadata dasar, robots, sitemap, dan JSON-LD, walau belum matang. ContactForm minimal sudah punya multi-step flow dan payload submit. Ada CI stub. Ada migrasi Supabase.

Artinya: pondasi eksperimen desain sudah ada. Anda tidak mulai dari nol.

Putusan kerasnya

Masalah repo ini bukan “kurang animasi”.

Masalah utamanya justru:

belum dipercaya,
belum aman,
belum kuat untuk conversion,
belum bersih sebagai repo production,
terlalu cepat mengklaim selesai.

PROGRESS.md bilang 100% selesai. Itu jelas terlalu optimistis. Secara publish readiness, belum.

Diagnosis komprehensif
1) Repo hygiene masih setengah matang

Ini sinyal paling gampang kebaca.

README.md masih default bawaan create-next-app. Itu jelek. Kalau repo serius, README harus menjelaskan:

project purpose
stack
env vars
local run
build/deploy
architecture
known issues

Di public/ masih ada aset starter Next: next.svg, vercel.svg, file.svg, window.svg, globe.svg. Ini tanda repo belum dibersihkan untuk production. Buruk secara hygiene, dan bikin repo terasa masih playground.

PROGRESS.md dan deep-research-report.md juga oversell progres. Itu bahaya. Bikin tim merasa “sudah beres”, padahal belum.

Kesimpulan: repo discipline masih kurang.

2) Visual direction kuat, tapi trust layer-nya tipis

Hero dan beberapa section memang enak dilihat. Masalahnya, untuk perusahaan logistik, visual doang tidak cukup. Visitor B2B cari:

jenis layanan yang jelas
coverage
credibility
process
contact path yang mudah
alasan kenapa mereka harus percaya

Sekarang homepage terlalu didorong ke motion statement. Belum cukup kuat sebagai sales-grade company site.

Contoh paling jelas:

tidak ada halaman About / Company
tidak ada halaman Industries
tidak ada halaman Coverage / Network
tidak ada halaman FAQ
tidak ada trust strip yang benar-benar dipakai di homepage
tidak ada direct channel seperti WhatsApp/phone/contact person
tidak ada company detail yang bikin bisnis terasa nyata

ClientLogos.tsx bahkan ada, tapi tidak dipakai di homepage. Dan isinya masih placeholder kategori industri, bukan logo klien sungguhan.

Jadi kesannya: keren, tapi belum punya bobot.

3) Ada banyak placeholder / synthetic proof yang berisiko

Ini cukup serius.

src/components/sections/StatsCounter.tsx berisi angka seperti:

14+ negara
340+ kontainer/bulan
99.7% on-time
$4.7M efisiensi biaya

Kalau itu belum benar-benar evidence-based, hapus. Jangan tampilkan angka yang belum bisa dipertanggungjawabkan.

src/lib/caseStudiesData.ts juga berisi studi kasus yang terasa generik dan sintetis. Secara layout oke. Secara kredibilitas, rawan. Kalau memang anonymized case study, tetap harus berbasis truth internal. Bukan sekadar teks yang terdengar meyakinkan.

ClientLogos.tsx juga placeholder. Untuk B2B logistics, placeholder trust element itu lebih jelek daripada tidak ada sama sekali.

Aturannya simple:
lebih baik kosong daripada bohong halus.

4) Funnel lead capture-nya masih lemah dan sebagian salah

Ini area paling rawan, karena menyangkut lead masuk.

src/components/contact/ContactForm.tsx punya problem nyata:

field terlalu minim. Hanya pain_point, operational_volume, company_name, executive_email
tidak ada name
tidak ada phone / WhatsApp
tidak ada shipment lane / origin-destination
tidak ada cargo type
tidak ada timeline / urgency
tidak ada consent/privacy notice
tidak ada fallback direct contact kalau form gagal

Yang lebih parah, handling submit-nya salah arah.

Di ContactForm.tsx, network error malah dibuat jadi sukses:

saat fetch error, catch block melakukan setIsSuccess(true)

Itu fatal. User bisa lihat layar sukses padahal lead gagal masuk.

Di sisi lain, kalau API return 500, form juga tidak memberi error state yang jelas. Jadi ada skenario lead gagal tersimpan, user tidak tahu, sales juga tidak dapat data. Itu bikin ads spend dan inquiry bisa hilang tanpa jejak.

Ini P0. Harus dibenerin dulu sebelum publish.

5) Lead API dan Supabase setup belum cukup aman

src/app/api/leads/route.ts memanggil getSupabase() dari src/lib/supabaseClient.ts.

Masalahnya, client itu memakai:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

Artinya route server Anda masih bergantung pada anon key publik, bukan server-side privileged client yang proper.

Secara praktik production, ini jelek. Untuk route server, pisahkan:

browser client
server client
service-role client bila memang perlu insert yang terproteksi

Di migrasi supabase/migrations/00001_create_leads_prospect.sql, saya juga tidak lihat hardening seperti:

enable RLS
insert policy yang jelas
pembatasan access
audit fields yang lebih rapi

Belum ada:

rate limiting
honeypot
bot protection / Turnstile / reCAPTCHA
abuse mitigation
server-side zod validation yang solid
logging / failure tracking

Untuk website yang potentially dipakai ads, ini terlalu longgar.

6) SEO ada fondasi, tapi masih tipis dan sebagian kosong

src/app/layout.tsx, robots.ts, sitemap.ts, dan JsonLd.tsx menunjukkan awareness SEO dasar. Itu bagus. Tapi belum cukup.

Problem-nya:

belum ada canonical
belum ada og:image
belum ada twitter:image
belum ada favicon/brand asset yang proper
belum ada alternates/hreflang
belum ada multilingual architecture
JSON-LD mengarah ke https://utamaglobalindocargo.com/logo.png, padahal aset itu tidak ada di public/
contactPoint terlalu tipis
metadata tiap halaman belum benar-benar diperkaya
belum ada real content depth untuk rank

Jadi SEO foundation ada, tapi masih di level “checkbox technical basics”, belum “siap bertarung”.

7) Accessibility masih kurang

Bukan cuma soal compliance. Ini soal web quality.

Beberapa gap:

mobile menu tidak punya aria-expanded
modal case study tidak punya ESC close
tidak ada focus trap
tidak ada reduced motion strategy
tidak ada skip-to-content
smooth scroll + scroll hijack tanpa fallback itu rawan
kontras beberapa text low-opacity terlalu tipis untuk keterbacaan
hero motion dan horizontal pin section bisa berat untuk user tertentu

Untuk site yang motion-heavy, prefers-reduced-motion itu wajib. Sekarang saya tidak lihat treatment itu.

8) Motion stack sudah menarik, tapi belum dikendalikan seperti production system

HeroGlobe.tsx secara visual keren. Tapi masih terlalu “proof of concept” dibanding “production-grade feature”.

Masalah utamanya:

tidak ada fallback statis untuk device lemah
tidak ada reduced-motion fallback
ada dead-ish logic seperti handlePointerMove/pointerRef yang pada praktiknya tidak benar-benar dipakai sebagai sumber utama
belum ada adaptive degradation
WebGL dipakai sebagai centerpiece, padahal harusnya jadi accent layer yang terkendali

ServicesHorizontal.tsx juga punya isu.

Konsep horizontal pinned section oke. Tapi implementasinya masih kasar:

end: +=${panels.length * 1000} terlalu fixed
sangat gesture-heavy
rawan bikin UX capek
belum cukup mempertimbangkan rhythm, accessibility, dan conversion behavior

Buat agency site mungkin oke. Buat logistics B2B, harus lebih disiplin. Motion harus bantu narasi, bukan nyolong perhatian terus.

9) Service pages sudah banyak, tapi masih terlalu template-driven

Ini salah satu area yang “kelihatan selesai”, padahal belum.

ServicePageLayout.tsx dipakai lintas halaman. Bagus untuk speed, jelek kalau semua halaman jadi terlalu seragam.

Sekarang service pages mostly berisi:

intro
subservice list
key points
best for
CTA

Yang belum ada:

process flow
SLA expectation
deliverables / scope clarity
industries served
coverage / lane examples
FAQ per service
compliance / licensing signal
commercial CTA yang lebih spesifik
proof block yang relevan

Jadi halaman service sudah “ada”, tapi belum “jualan”.

10) Bilingual belum ada

Di repo ini saya tidak lihat arsitektur bilingual sama sekali. Semua route dan konten masih satu bahasa.

Untuk perusahaan logistik yang main domestik + internasional, ini gap yang cukup besar. Kalau target Anda memang hanya ID dulu, ini bisa jadi P1. Kalau target brand-nya dari awal mau serius ke partner global/regional, ini naik jadi P0/P1 besar.

Daftar revisi yang benar-benar perlu dikerjakan

Saya pecah tegas.

P0 — blocker sebelum publish
Benerkan lead capture end-to-end
error handling form harus jujur
success state hanya tampil kalau insert benar-benar sukses
tambahkan error state UI
tambahkan phone/WA, person name, cargo context, route, urgency
tambahkan privacy/consent
sediakan fallback direct contact
Pisahkan Supabase client browser vs server
jangan pakai anon public key sebagai server pattern utama
pakai server-only env untuk route sensitif
tambah RLS/policies yang benar
Buang placeholder yang tidak bisa dipertanggungjawabkan
stats
client logos palsu
case study sintetis
copy yang terlalu klaim tanpa evidence
Bersihkan repo
rewrite README
hapus starter assets di public/
rapikan docs supaya tidak oversell “100% selesai”
Lengkapi trust & company presence
about/company
direct contact
office/location info
service trust strip
stronger contact CTA
SEO asset & metadata basics
brand favicon
OG image
canonical
structured data yang valid
logo asset yang benar
P1 — high impact
Tambah halaman dan IA yang bikin web terasa perusahaan sungguhan
About
Industries
Coverage / Network
FAQ
Contact dengan opsi cepat
Revisi homepage supaya lebih conversion-oriented
hero
trust bar
services
process/value proposition
proof
CTA
Integrasi analytics yang benar
GA4 / GTM / server-side event strategy
form submit event
CTA click tracking
UTM persistence yang rapi
source attribution ke CRM pipeline
Accessibility dan motion governance
reduced motion
modal keyboard support
menu accessibility
fallback mobile/device low-end
Bilingual architecture
locale strategy
route structure
metadata per locale
content source strategy
P2 — polish dan scale
Refactor ServicesHorizontal supaya lebih elegan dan less hijacky
Refine HeroGlobe dengan fallback strategy
Tambah visual asset nyata, bukan sekadar gradient blocks
Tambah proof sections yang benar-benar ada backing-nya
Tambah QA automation minimal
Map revisi per file

Supaya nggak muter-muter, ini file mana perlu diapakan.

README.md
Tulis ulang total.

PROGRESS.md
Ubah jadi jujur. Pisahkan “implemented”, “verified”, “publish-ready”.

public/*
Hapus aset starter. Ganti dengan logo, favicon, og image, brand assets asli.

src/app/layout.tsx
Perkaya metadata, canonical, OG/Twitter image, alternates, font strategy, skip link, better semantic shell.

src/components/layout/JsonLd.tsx
Perbaiki schema, gunakan logo yang benar-benar ada, tambah contact info yang valid.

src/components/layout/Header.tsx
Tambah accessibility, active states, better CTA, mobile menu behavior, aria-expanded.

src/components/layout/HeroSection.tsx
Refine copy, tambah proof/credibility strip, kurangi noise, tambah fallback state.

src/components/canvas/HeroGlobe.tsx
Reduced-motion fallback, mobile degradation, remove dead code, performance guard.

src/components/sections/ServicesHorizontal.tsx
Kurangi scroll hijack kasar, perjelas service grouping dan conversion path.

src/components/sections/StatsCounter.tsx
Jangan tampilkan angka sampai angka itu verified.

src/components/sections/ClientLogos.tsx
Entah dipakai dengan data nyata, atau hapus.

src/lib/caseStudiesData.ts
Ganti dengan truth-based anonymized case studies. Kalau belum ada, pakai placeholder internal flag, bukan public proof.

src/components/contact/ContactForm.tsx
Refactor total flow submission, fields, validation, success/error states, tracking.

src/app/api/leads/route.ts
Tambah server validation, secure insert path, anti-spam, better response semantics.

src/lib/supabaseClient.ts
Pisahkan browser/server clients.

supabase/migrations/*
Tambah RLS, policy, indexes yang lebih relevan, maybe lead status fields.

.github/workflows/ci.yml
Perlu tetap ada, tapi harus dibarengi actual local validation dan mungkin e2e smoke test.

src/app/services/* + src/components/services/ServicePageLayout.tsx
Tambah proof/process/FAQ/coverage blocks supaya tidak terasa “template product page”.

Quality gate checklist

Pakai ini sebagai gate sebelum bilang “siap publish”.

Gate 1 — Repo hygiene
 README sudah ditulis ulang, bukan template bawaan
 Semua starter assets Next/Vercel sudah dihapus
 PROGRESS.md merefleksikan kondisi nyata, bukan klaim bombastis
 Semua env vars terdokumentasi
 Tidak ada dead component besar yang tidak dipakai tanpa alasan
Gate 2 — Brand & content truth
 Tidak ada stats publik yang belum tervalidasi
 Tidak ada client logo palsu / placeholder trust element
 Tidak ada case study publik yang tidak berbasis truth internal
 Semua copy sesuai positioning perusahaan
 Brand assets final sudah terpasang
Gate 3 — IA & conversion
 Homepage menjelaskan siapa perusahaan, apa layanan utama, kenapa dipercaya, dan bagaimana menghubungi
 Ada jalur CTA jelas ke contact/quote
 Contact page punya form + fallback direct channel
 Service pages menjawab scope, use case, process, dan next step
 About/company presence cukup untuk menumbuhkan trust
Gate 4 — Lead capture & backend
 Form hanya menampilkan success jika backend benar-benar sukses
 Error state user-facing jelas
 Server-side validation aktif
 Anti-spam minimum aktif
 Supabase access path aman
 RLS/policy diverifikasi
 Lead payload cukup berguna untuk sales follow-up
Gate 5 — Motion, responsiveness, accessibility
 Mobile experience bersih dan tidak patah
 Horizontal/pinned sections tetap usable
 WebGL punya fallback
 prefers-reduced-motion dihormati
 Modal bisa ditutup via keyboard
 Mobile menu accessible
 Kontras teks cukup
Gate 6 — SEO, analytics, visibility
 Canonical ada
 OG/Twitter image ada dan valid
 JSON-LD valid
 Favicon/manifest/brand assets lengkap
 Analytics/GTM/event tracking aktif
 UTM capture tersimpan rapi
 Sitemap/robots sesuai
Gate 7 — Production validation
 npm run lint pass
 npx tsc --noEmit pass
 npm run build pass
 Tidak ada console error kritikal
 Broken links check pass
 Form submission test pass
 Manual QA desktop + mobile pass