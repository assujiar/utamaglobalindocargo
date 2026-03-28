"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // ============================================================
    // ASCII Art - Siluet Kapal Kargo
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

    // Pesan rekrutmen
    console.info(
      `%c■ UTAMA GLOBALINDO CARGO`,
      "color: #ff4600; font-size: 14px; font-weight: bold; font-family: monospace; padding: 8px 0;"
    );

    console.info(
      `%cKalau Anda buka console, berarti Anda tahu apa yang Anda cari.

Kami selalu butuh engineer yang bagus.
Kirim CV ke: careers@utamaglobalindocargo.com`,
      "color: #ccc; font-size: 12px; line-height: 1.8; font-family: monospace;"
    );

    console.info(
      "%c▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
      "color: #ff4600; font-size: 8px;"
    );
  }, []);

  return null;
}
