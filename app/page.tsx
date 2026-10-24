import Avatar from "./components/Avatar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Reveal from "./components/Reveal";
import { certifications, fundamentals, highlights, journey, profile, stack } from "./data";

const label = "font-mono text-xs uppercase tracking-[0.08em]";

export default function Home() {
  return (
    <main className="overflow-x-clip bg-ink text-paper">
      <Hero />

      {/* ============ STATEMENT ============ */}
      <section
        id="about"
        aria-labelledby="about-h"
        className="gutter mx-auto flex max-w-[1440px] flex-col items-center gap-10 pb-[clamp(64px,8vw,120px)] pt-[clamp(96px,12vw,180px)] text-center"
      >
        <Reveal>
          <h2 id="about-h" className="m-0 flex items-center gap-3 font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-muted">
            <span className="size-2 rounded-full bg-accent" />
            Message from {profile.first}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="m-0 max-w-[1100px] text-[clamp(34px,5vw,76px)] font-light leading-[1.04] tracking-[-0.03em] text-muted">
            <Strong>Full-stack</Strong> apps on MERN, wired up with <Strong>AI</Strong> and grounded in solid CS
            fundamentals. Looking to ship real products as a <Strong>software engineering intern</Strong>.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <span aria-hidden="true" className="font-script text-8xl leading-[0.8] text-accent">
            {profile.first}
          </span>
        </Reveal>
      </section>

      {/* ============ HIGHLIGHTS STRIP ============ */}
      <section aria-label="Highlights" className="pb-[clamp(96px,12vw,160px)]">
        <div className="gutter flex items-end gap-6 overflow-x-auto py-6 [scrollbar-width:thin]">
          {highlights.slice(0, 2).map((h, i) => (
            <Highlight key={h.label} {...h} n={i + 1} delay={i * 100} />
          ))}
          <Reveal delay={200} className="shrink-0">
            <div className="flex h-[360px] w-[300px] flex-col justify-between rounded-[22px] bg-accent p-9 text-ink sm:h-[400px] sm:w-[380px]">
              <p className="m-0 text-[28px] font-extrabold font-stretch-[112%] leading-[1.08] tracking-[-0.025em] sm:text-[34px]">
                It doesn’t matter what you start with. It’s what you ship next.
              </p>
              <span className="font-script text-[64px] leading-[0.8]">{profile.first}</span>
            </div>
          </Reveal>
          {highlights.slice(2).map((h, i) => (
            <Highlight key={h.label} {...h} n={i + 3} delay={300 + i * 100} />
          ))}
        </div>
      </section>

      {/* ============ ON / OFF SCREEN ============ */}
      <section
        aria-label="Explore"
        className="gutter mx-auto flex max-w-[1440px] flex-wrap items-center gap-8 pb-[clamp(96px,12vw,160px)]"
      >
        <Reveal className="flex-[1_1_300px]">
          <a href="#work" className="flex flex-col gap-6 text-paper no-underline hover:text-paper">
            <h2 className="m-0 text-[clamp(64px,8vw,128px)] font-black font-stretch-expanded uppercase leading-[0.82] tracking-[-0.05em]">
              On
              <br />
              Screen
            </h2>
            <p className="m-0 max-w-[320px] text-lg leading-[1.45] text-muted">
              Three full-stack <Strong>projects</Strong>: AI chatbots, hackathon builds and a finance app.
            </p>
            <Arrow className="bg-accent" />
          </a>
        </Reveal>
        <Reveal delay={150} className="flex-[0_1_380px]">
          <div aria-hidden="true" className="dv-float relative h-[480px] overflow-hidden rounded-[200px_200px_28px_28px] bg-accent">
            <Avatar variant="badge" className="absolute bottom-0 left-1/2 h-auto w-[120%] -translate-x-1/2" />
          </div>
        </Reveal>
        <Reveal delay={300} className="flex-[1_1_300px]">
          <a href="#timeline" className="flex flex-col items-end gap-6 text-right text-paper no-underline hover:text-paper">
            <h2 className="m-0 text-[clamp(64px,8vw,128px)] font-black font-stretch-expanded uppercase leading-[0.82] tracking-[-0.05em]">
              Off
              <br />
              Screen
            </h2>
            <p className="m-0 max-w-[320px] text-lg leading-[1.45] text-muted">
              <Strong>Hackathons</Strong>, team operations, certifications and the journey so far.
            </p>
            <Arrow className="bg-paper" />
          </a>
        </Reveal>
      </section>

      <Projects />

      {/* ============ STACK MARQUEE ============ */}
      <section aria-labelledby="stack-h" className="overflow-hidden bg-paper pb-[clamp(80px,10vw,140px)] text-ink">
        <Reveal className="gutter mx-auto mb-10 flex max-w-[1440px] flex-wrap items-end justify-between gap-5 border-t border-paper-line pt-12">
          <h2 id="stack-h" className="m-0 text-[clamp(44px,6vw,88px)] font-black font-stretch-expanded uppercase leading-[0.86] tracking-[-0.045em]">
            Tools &amp;
            <br />
            <span className="font-script font-normal font-stretch-normal normal-case tracking-normal text-accent">stack</span>
          </h2>
          <p className="m-0 max-w-[380px] text-lg leading-normal text-body">
            The languages, frameworks and platforms I reach for, plus the CS fundamentals underneath.
          </p>
        </Reveal>
        <div className="flex flex-col gap-4">
          <Marquee items={stack} size="lg" />
          <Marquee items={fundamentals} size="sm" reverse />
        </div>
      </section>

      {/* ============ JOURNEY ============ */}
      <section id="timeline" aria-labelledby="timeline-h" className="gutter mx-auto max-w-[1440px] py-[clamp(96px,12vw,160px)]">
        <div className="flex flex-wrap gap-12">
          <Reveal className="flex flex-[1_1_300px] flex-col gap-4 self-start lg:sticky lg:top-12">
            <h2 id="timeline-h" className="m-0 text-[clamp(56px,7vw,108px)] font-black font-stretch-expanded uppercase leading-[0.84] tracking-[-0.05em]">
              The
              <br />
              Journey
            </h2>
            <p className="m-0 max-w-[300px] text-[17px] leading-normal text-muted">
              Education, experience and milestones, newest first.
            </p>
          </Reveal>
          <ol className="m-0 flex flex-[999_1_560px] list-none flex-col gap-3 p-0">
            {journey.map((j, i) => (
              <li key={j.title}>
                <Reveal delay={i * 80}>
                  <div
                    className={`flex flex-wrap items-center gap-x-7 gap-y-3 rounded-[22px] p-7 transition-transform duration-300 hover:translate-x-2 ${
                      j.current ? "bg-accent text-ink" : "bg-ink-2"
                    }`}
                  >
                    <span className={`flex-[0_0_130px] ${label} tracking-[0.06em] ${j.current ? "" : "text-muted"}`}>{j.when}</span>
                    <span className="flex flex-[1_1_240px] flex-col gap-1">
                      <span className="text-[clamp(24px,2.4vw,30px)] font-extrabold font-stretch-[115%] leading-tight tracking-[-0.02em]">
                        {j.title}
                      </span>
                      <span className={`text-[17px] ${j.current ? "font-medium" : "text-soft"}`}>{j.where}</span>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 flex flex-col gap-5 border-t border-line pt-10">
          <h3 className={`m-0 font-medium text-muted ${label}`}>Certifications</h3>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-2xl border border-line px-5 py-4 text-[17px] font-semibold">
                <span aria-hidden="true" className="text-accent">✦</span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer id="contact" className="overflow-hidden rounded-t-[40px] bg-accent text-ink">
        <div className="gutter mx-auto flex max-w-[1440px] flex-col gap-[72px] pb-8 pt-[clamp(80px,10vw,140px)]">
          <Reveal className="flex flex-col items-center gap-8 text-center">
            <span aria-hidden="true" className="font-script text-[clamp(72px,9vw,130px)] leading-[0.8]">
              {profile.first}
            </span>
            <h2 className="m-0 text-[clamp(60px,11vw,176px)] font-black font-stretch-expanded uppercase leading-[0.82] tracking-[-0.055em]">
              Always
              <br />
              building.
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3.5 rounded-[18px] bg-ink px-8 py-5 text-lg font-bold text-paper no-underline hover:text-paper"
            >
              Let’s work together <span aria-hidden="true" className="dv-arrow text-accent">→</span>
            </a>
          </Reveal>

          <div className="flex flex-wrap justify-between gap-10 border-t-[1.5px] border-ink pt-8">
            <nav aria-label="Pages" className="flex flex-col gap-0.5">
              <span className={`mb-2.5 ${label}`}>Pages</span>
              <FooterLink href="#top">Home</FooterLink>
              <FooterLink href="#work">Projects</FooterLink>
              <FooterLink href="#timeline">Journey</FooterLink>
            </nav>
            <nav aria-label="Follow" className="flex flex-col gap-0.5">
              <span className={`mb-2.5 ${label}`}>Follow on</span>
              <FooterLink href={profile.github} external>GitHub</FooterLink>
              <FooterLink href="https://asska-ai-x9ca.vercel.app/" external>Asska AI</FooterLink>
              <FooterLink href="https://www.pragatiai.co.in" external>Pragati AI</FooterLink>
            </nav>
            <div className="flex min-w-[240px] flex-col gap-2.5">
              <span className={label}>Enquiries</span>
              <a href={`mailto:${profile.email}`} className="break-all text-xl font-bold text-ink hover:text-ink hover:opacity-70">
                {profile.email}
              </a>
              <a href={profile.resume} download className="text-xl font-bold text-ink hover:text-ink hover:opacity-70">
                Download résumé ↓
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3 font-mono text-xs">
            <span>© 2026 {profile.name}. All rights reserved.</span>
            <span>Designed &amp; built by {profile.first}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-extrabold font-stretch-[115%] text-paper">{children}</strong>;
}

function FooterLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="py-1.5 text-xl font-bold text-ink no-underline transition-opacity hover:text-ink hover:opacity-70"
    >
      {children}
    </a>
  );
}

function Arrow({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`dv-arrow flex size-14 items-center justify-center rounded-2xl text-[22px] font-bold text-ink ${className}`}
    >
      →
    </span>
  );
}

function Highlight({
  big,
  label: caption,
  note,
  w,
  h,
  n,
  delay,
}: (typeof highlights)[number] & { n: number; delay: number }) {
  return (
    <Reveal delay={delay} className="shrink-0">
      <figure className="dv-lift m-0 flex flex-col gap-3">
        <div className={`relative flex flex-col justify-end gap-2 overflow-hidden rounded-[22px] bg-ink-3 p-6 ${w} ${h}`}>
          <span className="absolute left-5 top-3.5 text-[64px] font-black font-stretch-expanded text-ghost">0{n}</span>
          <span className="text-[clamp(64px,7vw,104px)] font-black font-stretch-expanded leading-[0.85] tracking-[-0.05em] text-paper">
            {big}
          </span>
          <span className="text-xl font-extrabold font-stretch-[115%] tracking-[-0.01em]">{caption}</span>
        </div>
        <figcaption className={`${label} text-muted`}>{note}</figcaption>
      </figure>
    </Reveal>
  );
}

function Marquee({ items, size, reverse }: { items: string[]; size: "lg" | "sm"; reverse?: boolean }) {
  const styles = [
    "border-[1.5px] border-ink",
    "bg-ink text-paper",
    "border-[1.5px] border-ink",
    "bg-accent",
  ];
  const text =
    size === "lg"
      ? "px-9 py-[22px] text-[clamp(22px,2.4vw,30px)]"
      : "px-6 py-3.5 text-[clamp(16px,1.6vw,20px)]";
  // Rendered twice so the -50% translate loops seamlessly (margins, not gap, keep both halves equal).
  return (
    <div className={`dv-marquee ${reverse ? "dv-marquee-rev" : ""}`}>
      {[0, 1].map((copy) =>
        items.map((item, i) => (
          <span
            key={`${copy}-${item}`}
            aria-hidden={copy === 1 || undefined}
            className={`mr-4 whitespace-nowrap rounded-full font-bold font-stretch-[112%] ${text} ${styles[i % styles.length]}`}
          >
            {item}
          </span>
        )),
      )}
    </div>
  );
}
