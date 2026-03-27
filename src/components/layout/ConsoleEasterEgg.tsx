"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // ============================================================
    // ASCII Art — Siluet Kapal Kargo Kontainer Logistik
    // Dicetak dengan styling CSS #ff4600 di DevTools Console
    // ============================================================

    const asciiShip = `
%c
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║      ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐                    ║
    ║      │▓▓│  │░░│  │▓▓│  │░░│  │▓▓│  │░░│                    ║
    ║      ├──┤  ├──┤  ├──┤  ├──┤  ├──┤  ├──┤     ╔═══╗          ║
    ║      │░░│  │▓▓│  │░░│  │▓▓│  │░░│  │▓▓│     ║ ◉ ║          ║
    ║      ├──┤  ├──┤  ├──┤  ├──┤  ├──┤  ├──┤     ╠═══╣          ║
    ║      │▓▓│  │░░│  │▓▓│  │░░│  │▓▓│  │░░│     ║   ║          ║
    ║   ╔══╧══╧══╧══╧══╧══╧══╧══╧══╧══╧══╧══╧═════╩═══╩══╗       ║
    ║   ║  U T A M A   G L O B A L   I N D O   C A R G O  ║       ║
    ║   ╚══════════════════════════════════════════════════════╝       ║
    ║  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    ║
    ║    ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈  ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`;

    const shipStyle = [
      "color: #ff4600",
      "font-family: monospace",
      "font-size: 11px",
      "line-height: 1.3",
      "font-weight: bold",
      "text-shadow: 0 0 8px rgba(255, 70, 0, 0.3)",
    ].join(";");

    console.info(asciiShip, shipStyle);

    // Pesan rekrutmen insinyur — styling dramatis
    console.info(
      `%c■ UTAMA GLOBAL INDO CARGO — DIVISI REKAYASA PERANGKAT LUNAK`,
      "color: #ff4600; font-size: 14px; font-weight: bold; font-family: monospace; padding: 8px 0;"
    );

    console.info(
      `%cTerpantau merekayasa balik susunan sinkronisasi manipulasi pengamatan alokasi DOM matriks perenderan pengguliran partikel WebGL fungsional tingkat lanjut dari operasi perutean klien eksekutif asimetris algoritma antarmuka kami?

Anda terbukti memvalidasi perhitungan kognitif analisa peninjauan logika otonom resolusi spasial rantai pasokan skala performa jaringan arsitektur industri logistik yang persis selaras dengan standar kompetensi pemikiran fungsional eksekutif pengadaan infrastruktur rekayasa perangkat lunak operasi B2B kami.

Keahlian optimalisasi fungsional metrik parameter potensi jenjang rute karir rekayasa teknis kaliber industri Anda yang tak ternilai harganya saat ini sangat tidak proporsional dan tidak seharusnya dibiarkan terperangkap mandek merana dan mengalami jebakan degradasi latensi komputasi waktu rilis yang tertinggal dalam perputaran roda kekosongan skema jaringan korporasi rintisan perusahaan tradisional usang yang lumpuh lambat di luaran sana.

Terobos rute blokade pengiriman hambatan tersebut sekarang juga.
Tautkan identitas jaringan kompilasi karir kode Anda bersama simpul logistik kami:

→ engineering.logistics-vanguard.com`,
      "color: #ccc; font-size: 12px; line-height: 1.8; font-family: monospace;"
    );

    console.info(
      "%c▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
      "color: #ff4600; font-size: 8px;"
    );
  }, []);

  return null;
}
