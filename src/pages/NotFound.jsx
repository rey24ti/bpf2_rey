import { useState } from "react";

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne+Mono&family=Syne:wght@400;700;800&display=swap');

  @keyframes glitch {
    0%   { clip-path: inset(40% 0 61% 0); transform: translate(-4px, 0); }
    20%  { clip-path: inset(92% 0  1% 0); transform: translate( 4px, 0); }
    40%  { clip-path: inset(43% 0  1% 0); transform: translate(-4px, 0); }
    60%  { clip-path: inset(25% 0 58% 0); transform: translate( 4px, 0); }
    80%  { clip-path: inset(54% 0  7% 0); transform: translate(-4px, 0); }
    100% { clip-path: inset(58% 0 43% 0); transform: translate( 4px, 0); }
  }
  @keyframes glitch2 {
    0%   { clip-path: inset(60% 0 10% 0); transform: translate( 4px, 0); }
    20%  { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
    40%  { clip-path: inset(70% 0  5% 0); transform: translate( 4px, 0); }
    60%  { clip-path: inset(10% 0 80% 0); transform: translate(-4px, 0); }
    80%  { clip-path: inset(45% 0 30% 0); transform: translate( 4px, 0); }
    100% { clip-path: inset(30% 0 50% 0); transform: translate(-4px, 0); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh);  }
  }
  @keyframes flicker {
    0%, 100% { opacity: 1;   }
    92%       { opacity: 1;   }
    93%       { opacity: 0.4; }
    94%       { opacity: 1;   }
    96%       { opacity: 0.6; }
    97%       { opacity: 1;   }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes noise {
    0%   { background-position:   0    0;   }
    10%  { background-position:  -5%  -10%; }
    20%  { background-position: -15%   5%;  }
    30%  { background-position:   7%  -25%; }
    40%  { background-position:  20%   25%; }
    50%  { background-position: -25%  10%;  }
    60%  { background-position:  15%   5%;  }
    70%  { background-position:   0%  15%;  }
    80%  { background-position:  25%  35%;  }
    90%  { background-position: -10%  10%;  }
    100% { background-position:   0    0;   }
  }

  .font-syne      { font-family: 'Syne', sans-serif; }
  .font-syne-mono { font-family: 'Syne Mono', monospace; }
  .text-404       { font-size: clamp(100px, 20vw, 200px); }

  .noise-bg {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  }

  .animate-glitch   { animation: glitch  2.5s infinite linear alternate-reverse; }
  .animate-glitch2  { animation: glitch2 2.5s infinite linear alternate-reverse; }
  .animate-scanline { animation: scanline 4s linear infinite; }
  .animate-flicker  { animation: flicker  6s infinite; }
  .animate-blink    { animation: blink    1s step-end infinite; }
  .animate-noise    { animation: noise  0.5s steps(2) infinite; }

  .animate-fade-up-0 { animation: fadeUp 0.8s 0.0s ease both; }
  .animate-fade-up-1 { animation: fadeUp 0.8s 0.2s ease both; }
  .animate-fade-up-2 { animation: fadeUp 0.8s 0.3s ease both; }
  .animate-fade-up-3 { animation: fadeUp 0.8s 0.4s ease both; }
  .animate-fade-up-4 { animation: fadeUp 0.8s 0.5s ease both; }
  .animate-fade-up-5 { animation: fadeUp 0.8s 0.6s ease both; }

  .btn-glow {
    border: 1px solid rgba(0,255,170,0.4);
    background: rgba(0,255,170,0.04);
    transition: all 0.2s;
  }
  .btn-glow:hover {
    background: rgba(0,255,170,0.12);
    border-color: rgba(0,255,170,0.8);
    box-shadow: 0 0 20px rgba(0,255,170,0.15);
  }
`;

export default function NotFound() {
  const [time] = useState(() => new Date().toLocaleTimeString("id-ID"));

  return (
    <>
      <style>{customStyles}</style>

      {/* Noise Overlay */}
      <div className="noise-bg animate-noise fixed inset-0 z-0 pointer-events-none opacity-40" />

      {/* Scanline */}
      <div
        className="animate-scanline fixed top-0 left-0 right-0 h-0.5 z-10 pointer-events-none"
        style={{ background: "linear-gradient(transparent, rgba(0,255,170,0.15), transparent)" }}
      />

      {/* Main Page */}
      <div className="font-syne animate-flicker relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080808]">

        {/* Glow backdrop */}
        <div
          className="pointer-events-none absolute w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,255,170,0.04) 0%, transparent 70%)" }}
        />

        {/* Corner brackets */}
        <div className="absolute top-5 left-5 w-7 h-7 border-t border-l border-[rgba(0,255,170,0.3)]" />
        <div className="absolute top-5 right-5 w-7 h-7 border-t border-r border-[rgba(0,255,170,0.3)]" />
        <div className="absolute bottom-5 left-5 w-7 h-7 border-b border-l border-[rgba(0,255,170,0.3)]" />
        <div className="absolute bottom-5 right-5 w-7 h-7 border-b border-r border-[rgba(0,255,170,0.3)]" />

        {/* Status bar */}
        <div className="animate-fade-up-0 absolute top-7 left-[60px] right-[60px] flex items-center justify-between">
          <span className="font-syne-mono text-[11px] tracking-[0.15em] text-[rgba(0,255,170,0.5)]">
            SYS:ERR_404
          </span>
          <span className="font-syne-mono text-[11px] tracking-[0.1em] text-white/20">
            {time}
          </span>
        </div>

        {/* 404 Glitch */}
        <div className="relative mb-4">
          {/* Base */}
          <div className="font-syne text-404 font-extrabold leading-none tracking-[-0.05em] select-none text-[#f0f0f0]">
            404
          </div>
          {/* Glitch cyan */}
          <div className="animate-glitch absolute inset-0 font-syne text-404 font-extrabold leading-none tracking-[-0.05em] select-none text-[#00ffaa]">
            404
          </div>
          {/* Glitch red */}
          <div className="animate-glitch2 absolute inset-0 font-syne text-404 font-extrabold leading-none tracking-[-0.05em] select-none text-[#ff3366]">
            404
          </div>
        </div>

        {/* Divider */}
        <div
          className="animate-fade-up-1 mb-7 h-px w-full max-w-[360px]"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,255,170,0.5), transparent)" }}
        />

        {/* Heading */}
        <p className="animate-fade-up-2 font-syne-mono mb-2 text-[13px] uppercase tracking-[0.2em] text-white/50">
          HALAMAN TIDAK DITEMUKAN
        </p>

        {/* Subtext */}
        <p className="animate-fade-up-3 font-syne-mono mb-12 text-[11px] tracking-[0.1em] text-[rgba(0,255,170,0.4)]">
          URL yang kamu minta tidak ada
          <span className="animate-blink">_</span>
        </p>

        {/* CTA */}
        <a
          href="/"
          className="btn-glow animate-fade-up-4 font-syne-mono inline-flex cursor-pointer items-center gap-2.5 px-8 py-3 text-[12px] uppercase tracking-[0.2em] text-[#00ffaa] no-underline"
        >
          <span>←</span>
          <span>KEMBALI KE BERANDA</span>
        </a>

        {/* Footer status */}
        <div className="animate-fade-up-5 font-syne-mono absolute bottom-7 text-[10px] tracking-[0.15em] text-white/[0.15]">
          ERROR · 0x00000404 · PAGE_NOT_FOUND
        </div>
      </div>
    </>
  );
}