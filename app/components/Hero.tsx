"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Avatar from "./Avatar";
import { profile } from "../data";

const BLOB_RADII = [160, 135, 110, 85, 60, 40];
const EMPTY_MASK = "linear-gradient(transparent, transparent)";

const giant =
  "absolute inset-x-0 top-[46%] m-0 -translate-y-1/2 text-center font-black font-stretch-expanded uppercase leading-[0.8] tracking-[-0.05em] text-[clamp(64px,21vw,330px)]";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    target: { x: 0, y: 0 },
    pts: BLOB_RADII.map(() => ({ x: 0, y: 0 })),
    on: false,
    s: 0,
    raf: 0,
  });

  const tick = () => {
    const st = state.current;
    const el = revealRef.current;
    if (!el) return;

    // Smoothly scale the mask in / out
    const targetScale = st.on ? 1 : 0;
    st.s += (targetScale - st.s) * (st.on ? 0.2 : 0.16);

    // Fade out completely when off
    if (!st.on && st.s < 0.01) {
      st.s = 0;
      el.style.webkitMaskImage = el.style.maskImage = EMPTY_MASK;
      st.raf = 0;
      return;
    }

    const p = st.pts;
    // Lead point follows target with snappy, responsive tracking
    p[0].x += (st.target.x - p[0].x) * 0.65;
    p[0].y += (st.target.y - p[0].y) * 0.65;

    // Trailing points create a fluid, liquid droplet trail
    for (let i = 1; i < BLOB_RADII.length; i++) {
      p[i].x += (p[i - 1].x - p[i].x) * 0.48;
      p[i].y += (p[i - 1].y - p[i].y) * 0.48;
    }

    // Hardware-accelerated radial gradients - zero SVG re-rasterization
    const gradients = p.map((pt, i) => {
      const r = (BLOB_RADII[i] * st.s).toFixed(1);
      return `radial-gradient(circle ${r}px at ${pt.x.toFixed(1)}px ${pt.y.toFixed(1)}px, #000 0%, #000 65%, transparent 100%)`;
    });

    const mask = gradients.join(", ");
    el.style.webkitMaskImage = el.style.maskImage = mask;

    // If fully expanded and cursor is still, pause animation loop to save CPU
    if (st.on && Math.abs(st.s - 1) < 0.005) {
      let maxDist = Math.abs(p[0].x - st.target.x) + Math.abs(p[0].y - st.target.y);
      for (let i = 1; i < BLOB_RADII.length; i++) {
        maxDist += Math.abs(p[i].x - p[i - 1].x) + Math.abs(p[i].y - p[i - 1].y);
      }
      if (maxDist < 0.4) {
        st.raf = 0;
        return;
      }
    }

    st.raf = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    const st = state.current;
    if (!st.raf) {
      st.raf = requestAnimationFrame(tick);
    }
  };

  const onPointerEnter = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const st = state.current;
    st.target = { x, y };
    st.pts.forEach((pt) => {
      pt.x = x;
      pt.y = y;
    });
    st.on = true;
    startLoop();
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const st = state.current;
    if (!st.on) {
      st.pts.forEach((pt) => {
        pt.x = x;
        pt.y = y;
      });
      st.on = true;
    }
    st.target = { x, y };
    startLoop();
  };

  const onPointerLeave = () => {
    const st = state.current;
    st.on = false;
    startLoop();
  };

  useEffect(() => {
    const st = state.current;
    const handleScrollOrBlur = () => {
      if (st.on) {
        st.on = false;
        startLoop();
      }
    };

    window.addEventListener("scroll", handleScrollOrBlur, { passive: true });
    window.addEventListener("blur", handleScrollOrBlur);

    return () => {
      cancelAnimationFrame(st.raf);
      window.removeEventListener("scroll", handleScrollOrBlur);
      window.removeEventListener("blur", handleScrollOrBlur);
    };
  }, []);

  return (
    <section
      id="top"
      aria-label="Introduction"
      ref={heroRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative h-svh min-h-[640px] max-h-[900px] overflow-hidden bg-ink"
    >
      {/* base layer */}
      <div className="absolute inset-0">
        <div className="dv-intro absolute inset-0">
          <p aria-hidden="true" className={`${giant} text-ink-3`}>
            {profile.first}
          </p>
        </div>
        <div className="dv-intro absolute inset-0" style={{ animationDelay: "200ms" }}>
          <Avatar variant="base" className="absolute bottom-0 left-1/2 h-auto w-[clamp(320px,40vw,600px)] -translate-x-1/2" />
        </div>
      </div>

      {/* reveal layer, masked by the blob trail */}
      <div
        aria-hidden="true"
        ref={revealRef}
        className="pointer-events-none absolute inset-0 bg-accent text-ink"
        style={{
          WebkitMaskImage: EMPTY_MASK,
          maskImage: EMPTY_MASK,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <p className={`${giant} text-ink`}>&lt;Dev/&gt;</p>
        <Avatar variant="reveal" className="absolute bottom-0 left-1/2 h-auto w-[clamp(320px,40vw,600px)] -translate-x-1/2" />
        <p className="gutter absolute left-0 top-[150px] m-0 font-mono text-sm leading-[1.7]">
          const daksh = new Developer();
          <br />
          daksh.ship({"{ stack: \"MERN\", ai: true }"});
        </p>
        <p className="gutter absolute right-0 top-[150px] m-0 text-right font-mono text-sm leading-[1.7]">
          {"// status: open to internships"}
          <br />
          {"// coffee: required"}
        </p>
      </div>

      {/* nav, above both layers */}
      <header className="gutter pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-4 py-6">
        <a
          href="#top"
          aria-label={`${profile.first}, home`}
          className="pointer-events-auto flex flex-col text-xl font-black font-stretch-expanded uppercase leading-[0.9] tracking-[-0.03em] text-paper no-underline"
        >
          <span>{profile.first}</span>
          <span className="text-accent">.dev</span>
        </a>
        <nav aria-label="Primary" className="pointer-events-auto flex items-center gap-2.5">
          <a
            href="#contact"
            className="flex h-12 items-center gap-2.5 rounded-[14px] border border-line bg-ink/70 px-5 text-[15px] font-semibold text-paper no-underline backdrop-blur-sm transition-colors hover:border-accent"
          >
            <span className="dv-blink size-2 rounded-full bg-accent" />
            <span className="hidden sm:inline">Open to internships</span>
            <span className="sm:hidden">Hire me</span>
          </a>
          <a
            href="#work"
            aria-label="Jump to projects"
            className="flex size-12 flex-col items-center justify-center gap-[5px] rounded-[14px] bg-accent transition-transform hover:rotate-90"
          >
            <span className="h-0.5 w-[18px] bg-ink" />
            <span className="h-0.5 w-[18px] bg-ink" />
          </a>
        </nav>
      </header>

      {/* bottom row */}
      <div className="gutter pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 pb-10">
        <div className="dv-intro flex flex-col gap-1" style={{ animationDelay: "400ms" }}>
          <span className="font-script text-[72px] leading-[0.9] text-accent sm:text-[88px]">{profile.first}</span>
          <h1 className="m-0 text-[22px] font-extrabold font-stretch-[115%] uppercase tracking-[-0.01em]">
            {profile.role}
          </h1>
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
            Based in {profile.location} · CSE @ JECRC ’27
          </span>
        </div>
        <div className="dv-intro" style={{ animationDelay: "550ms" }}>
          <a
            href="#project-wdigai"
            className="dv-float pointer-events-auto flex items-center gap-5 rounded-[20px] bg-paper py-4 pl-[22px] pr-4 text-ink no-underline"
          >
            <span className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone">Now building</span>
              <span className="text-[22px] font-extrabold font-stretch-[115%] tracking-[-0.02em]">wDigAI</span>
            </span>
            <span
              aria-hidden="true"
              className="dv-arrow flex size-[52px] items-center justify-center rounded-[14px] bg-accent text-[22px] font-bold"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
