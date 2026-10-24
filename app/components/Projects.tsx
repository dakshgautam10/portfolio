"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import { profile, projects, type Project } from "../data";

const themes = {
  sand: {
    card: "bg-sand text-ink",
    ghost: "text-sand-ghost",
    muted: "text-stone",
    pill: "border-ink/25",
    screen: "bg-paper border-paper-line text-ink",
    button: "bg-ink text-paper",
  },
  ink: {
    card: "bg-ink text-paper border border-line",
    ghost: "text-ghost",
    muted: "text-muted",
    pill: "border-paper/25",
    screen: "bg-ink-2 border-line text-paper",
    button: "bg-accent text-ink",
  },
  accent: {
    card: "bg-accent text-ink",
    ghost: "text-ink/15",
    muted: "text-ink/70",
    pill: "border-ink/30",
    screen: "bg-ink border-ink text-paper",
    button: "bg-ink text-paper",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Projects() {
  const listRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-linked: which card is in front, how far through the stack we are,
  // and how much each covered card should recede.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const items = Array.from(list.children) as HTMLElement[];
      const vh = window.innerHeight;
      let current = 0;

      items.forEach((li, i) => {
        const r = li.getBoundingClientRect();
        if (r.top < vh * 0.55) current = i;
        const card = cardRefs.current[i];
        const next = items[i + 1];
        if (!card) return;
        if (!next || reduce.matches) {
          card.style.transform = "";
          card.style.filter = "";
          return;
        }
        const covered = Math.min(1, Math.max(0, (r.bottom - next.getBoundingClientRect().top) / r.height));
        card.style.transform = `scale(${1 - covered * 0.08})`;
        card.style.filter = `brightness(${1 - covered * 0.3})`;
      });

      const lr = list.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh * 0.55 - lr.top) / lr.height));
      if (barRef.current) barRef.current.style.transform = `scaleY(${progress})`;
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="work" aria-labelledby="work-h" className="rounded-t-[40px] bg-paper text-ink">
      <div className="gutter mx-auto max-w-[1440px] py-[clamp(80px,10vw,140px)]">
        <Reveal className="mb-16 flex flex-col items-center gap-5 text-center">
          <h2 id="work-h" className="m-0 flex flex-col items-center">
            <span className="text-[clamp(56px,8vw,120px)] font-black font-stretch-expanded uppercase leading-[0.85] tracking-[-0.05em]">
              Projects
            </span>
            <span className="font-script text-[clamp(56px,7vw,104px)] font-normal leading-[0.9] text-accent">
              Hall of Fame
            </span>
          </h2>
          <p className="m-0 max-w-[520px] text-lg leading-normal text-body">
            Full-stack builds with MERN, REST APIs and AI, from a hackathon finalist to a finance app in progress.
            Keep scrolling to flip through the stack.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          {/* sticky index */}
          <aside className="hidden self-start lg:sticky lg:top-28 lg:flex lg:flex-col lg:gap-10" aria-label="Project index">
            <div className="flex items-end gap-3">
              <span
                key={active}
                className="dv-intro text-[clamp(96px,10vw,160px)] font-black font-stretch-expanded leading-[0.8] tracking-[-0.06em]"
                style={{ animationDuration: "0.5s" }}
              >
                {pad(active + 1)}
              </span>
              <span className="pb-2 font-mono text-sm text-stone">/ {pad(projects.length)}</span>
            </div>

            <div className="relative flex gap-6">
              <span aria-hidden="true" className="relative w-[3px] shrink-0 overflow-hidden rounded-full bg-paper-line">
                <span ref={barRef} className="absolute inset-0 origin-top scale-y-0 rounded-full bg-accent" />
              </span>
              <ol className="m-0 flex list-none flex-col gap-5 p-0">
                {projects.map((p, i) => (
                  <li key={p.slug}>
                    <a
                      href={`#project-${p.slug}`}
                      aria-current={i === active ? "true" : undefined}
                      className={`group flex flex-col gap-1 no-underline transition-opacity duration-300 ${
                        i === active ? "opacity-100" : "opacity-35 hover:opacity-70"
                      }`}
                    >
                      <span className="text-[26px] font-extrabold font-stretch-[115%] tracking-[-0.02em] text-ink">
                        {p.title}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.08em] text-stone">{p.kind}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-stone">
              <span aria-hidden="true" className="dv-float inline-block">↓</span> Scroll
            </span>
          </aside>

          {/* vertical stack */}
          <ol ref={listRef} className="m-0 flex list-none flex-col gap-[14vh] p-0 pb-[12vh]">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                id={`project-${p.slug}`}
                className="top-[calc(76px+var(--i)*18px)] scroll-mt-24 lg:top-[calc(112px+var(--i)*26px)] [@media(min-height:640px)]:sticky"
                style={{ "--i": i } as CSSProperties}
              >
                <ProjectCard project={p} index={i} cardRef={(el) => { cardRefs.current[i] = el; }} />
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-2xl bg-ink px-7 py-[18px] text-base font-bold text-paper no-underline hover:text-paper"
          >
            View all on GitHub <span aria-hidden="true" className="dv-arrow text-accent">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index,
  cardRef,
}: {
  project: Project;
  index: number;
  cardRef: (el: HTMLElement | null) => void;
}) {
  const t = themes[p.theme];
  return (
    <article
      ref={cardRef}
      aria-labelledby={`project-${p.slug}-title`}
      className={`proj-card grid gap-8 rounded-[28px] p-6 shadow-[0_-24px_60px_-36px_rgba(27,26,24,0.55)] sm:p-9 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:min-h-[min(600px,calc(100svh-200px))] ${t.card}`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <span aria-hidden="true" className={`text-[clamp(56px,6vw,88px)] font-black font-stretch-expanded leading-[0.8] ${t.ghost}`}>
            {pad(index + 1)}
          </span>
          <span className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] ${t.pill}`}>
            <span className={`size-1.5 rounded-full ${p.theme === "accent" ? "bg-ink" : "bg-accent"} ${p.url ? "" : "dv-blink"}`} />
            {p.status}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3
            id={`project-${p.slug}-title`}
            className="m-0 text-[clamp(40px,4.6vw,68px)] font-black font-stretch-expanded leading-[0.9] tracking-[-0.045em]"
          >
            {p.title}
          </h3>
          <p className={`m-0 font-mono text-xs uppercase tracking-[0.1em] ${t.muted}`}>{p.kind}</p>
        </div>

        <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] leading-normal sm:text-base">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3">
              <span aria-hidden="true" className={p.theme === "accent" ? "text-ink" : "text-accent"}>
                ✦
              </span>
              <span className={t.muted}>{pt}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {p.tags.map((tag) => (
            <span key={tag} className={`rounded-full border px-3 py-1 text-[13px] font-semibold ${t.pill}`}>
              {tag}
            </span>
          ))}
        </div>

        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-fit items-center gap-3 rounded-[14px] px-5 py-3.5 text-[15px] font-bold no-underline ${t.button}`}
          >
            Live demo <span aria-hidden="true" className="dv-arrow">↗</span>
          </a>
        ) : (
          <span className={`w-fit rounded-[14px] border border-dashed px-5 py-3.5 font-mono text-xs uppercase tracking-[0.08em] ${t.pill}`}>
            Shipping soon
          </span>
        )}
      </div>

      <Screen project={p} className={t.screen} />
    </article>
  );
}

function Screen({ project: p, className }: { project: Project; className: string }) {
  return (
    <div aria-hidden="true" className={`hidden min-h-[320px] flex-col overflow-hidden rounded-[20px] border md:flex ${className}`}>
      <div className="flex items-center gap-3 border-b border-current/10 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="size-2.5 rounded-full bg-current opacity-25" />
          <span className="size-2.5 rounded-full bg-current opacity-25" />
        </span>
        <span className="truncate rounded-md bg-current/5 px-3 py-1 font-mono text-[11px] opacity-70">
          {p.host ?? `${p.slug}.local`}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-5">
        {p.mock === "chat" && <ChatMock />}
        {p.mock === "steps" && <StepsMock />}
        {p.mock === "chart" && <ChartMock />}
      </div>
    </div>
  );
}

function ChatMock() {
  const bubble = "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug";
  return (
    <>
      <span className={`${bubble} self-end rounded-br-md bg-ink text-paper`}>Explain recursion simply?</span>
      <span className={`${bubble} self-start rounded-bl-md bg-sand`}>
        A function that solves a problem by calling itself on a smaller piece, until a base case stops it.
      </span>
      <span className={`${bubble} self-end rounded-br-md bg-ink text-paper`}>Cool. Now tell me a movie plot?</span>
      <span className={`${bubble} self-start rounded-bl-md bg-accent`}>Let’s stay on topic. Want a practice question on recursion?</span>
      <span className="mt-1 flex items-center gap-2 rounded-xl border border-paper-line px-3 py-2.5 font-mono text-[11px] text-stone">
        Ask about your syllabus…<span className="dv-blink ml-auto h-3.5 w-0.5 bg-accent" />
      </span>
    </>
  );
}

function StepsMock() {
  const steps = [
    { label: "Check eligibility", done: true },
    { label: "Upload documents", done: true },
    { label: "Choose preferences", active: true },
    { label: "Review & submit" },
  ];
  return (
    <>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">PM Internship · Enrollment</span>
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {steps.map((s, i) => (
          <li
            key={s.label}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
              s.active ? "bg-accent font-semibold text-ink" : "bg-ink"
            }`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full font-mono text-[11px] ${
                s.done ? "bg-paper text-ink" : s.active ? "bg-ink text-paper" : "border border-line text-muted"
              }`}
            >
              {s.done ? "✓" : i + 1}
            </span>
            <span className={s.done || s.active ? "" : "text-muted"}>{s.label}</span>
          </li>
        ))}
      </ol>
      <span className="rounded-xl border border-line px-3 py-2.5 text-[13px] text-soft">
        <span className="font-mono text-[11px] text-accent">AI ▸ </span>
        Stuck on this step? Ask Pragati and get guidance in context.
      </span>
    </>
  );
}

function ChartMock() {
  const bars = [46, 70, 38, 88, 56, 74, 62];
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">This week</span>
        <span className="text-2xl font-extrabold font-stretch-[115%]">₹4,820</span>
      </div>
      <div className="relative flex h-40 items-end gap-2.5">
        <span className="absolute inset-x-0 top-[22%] border-t border-dashed border-accent/70" />
        <span className="absolute right-0 top-[22%] -translate-y-full pb-1 font-mono text-[10px] text-accent">limit</span>
        {bars.map((h, i) => (
          <span
            key={i}
            className={`proj-screen-bar flex-1 rounded-t-md ${h > 78 ? "bg-accent" : "bg-paper/80"}`}
            style={{ height: `${h}%`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
      <span className="rounded-xl bg-ink-2 px-3 py-2.5 text-[13px] text-soft">
        <span className="font-mono text-[11px] text-accent">INSIGHT ▸ </span>
        Thursday crossed your daily limit. Want a tighter food budget?
      </span>
    </>
  );
}
