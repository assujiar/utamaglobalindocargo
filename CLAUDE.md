# CLAUDE.md — Memori Persisten Agen Arsitektur

## Tumpukan Teknologi Operasional

- **Kerangka Kerja**: Next.js 14/15 dengan paradigma App Router
- **Runtime Middleware**: Node.js 16
- **Utilitas Antarmuka**: Tailwind CSS v4
- **Backend & Basis Data**: Supabase (PostgreSQL + Realtime + Auth hanya untuk internal)
- **Bahasa**: TypeScript (ketat/strict mode)
- **Deployment Target**: Vercel

## Identitas Visual Korporat

- **Warna Primer (Logistics Orange)**: `#ff4600`
- **Warna Sekunder (Carbon Dark)**: `#111111`
- **Tipografi**: Sans-serif tebal futuristik (Inter/Geist) — estetika skala raksasa ala Buzzworthy Studio

## LARANGAN ARSITEKTUR MUTLAK

> **DILARANG KERAS** membuat, mengimplementasikan, merancang, menyarankan, atau membuat rute untuk:
>
> - Portal otentikasi pelanggan (customer login portal)
> - Dasbor orientasi pengguna klien (client onboarding dashboard)
> - Sistem autentikasi orientasi pasca-masuk (post-login authentication)
> - Segala bentuk portal pelanggan atau area login klien
>
> Ekosistem ini secara **eksklusif** dioptimalkan untuk:
> - Visibilitas digital korporat
> - Perolehan prospek logistik tingkat eksekutif (lead generation)
> - Rendering ujung depan berkinerja tinggi
>
> Ketiadaan portal pelanggan **membebaskan komputasi** untuk rendering front-end yang superior.

## Struktur Direktori

```
src/
├── app/          # App Router pages & layouts
├── components/   # Komponen UI reusable
├── lib/          # Utilitas & konfigurasi (supabaseClient, dll.)
├── styles/       # Style tambahan
└── types/        # TypeScript type definitions
supabase/
└── migrations/   # Skema migrasi SQL
```

## Siklus Git Operasional

1. `git pull origin main`
2. Modifikasi kode
3. Catat pencapaian di `PROGRESS.md`
4. `git add .` → `git commit -m "..."` → `git push origin main`
