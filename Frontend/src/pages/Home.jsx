import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const metrics = [
  { label: "Threats analyzed daily", value: "24M+" },
  { label: "Detection latency", value: "< 120ms" },
  { label: "Enterprise coverage", value: "99.98%" },
  { label: "False-positive reduction", value: "-43%" },
];

const capabilities = [
  {
    title: "AI URL Inspection",
    description:
      "Classify malicious domains, brand impersonation, redirect chains, and suspicious certificate patterns in real time.",
    icon: "◌",
  },
  {
    title: "Email Risk Triage",
    description:
      "Score sender reputation, analyze urgency cues, and surface hidden payloads before users interact.",
    icon: "⌁",
  },
  {
    title: "Phishing Intel Graph",
    description:
      "Connect indicators across campaigns, infrastructure, and tactics to expose coordinated attack patterns.",
    icon: "⟡",
  },
];

const threatSignals = [
  "Spoofed sender domain",
  "Homoglyph URL mismatch",
  "Urgency / authority language",
  "Shortened redirect chain",
  "Newly registered domain",
  "Credential harvesting form",
];

const keyFeatures = [
  {
    title: "Real-Time URL Analysis",
    description:
      "Detects malicious patterns, redirects, SSL issues, domain age & more.",
  },
  {
    title: "Email Phishing Checker",
    description: "Analyzes email text, headers, tone, and hidden threats.",
  },
  {
    title: "AI-Driven Risk Scoring",
    description: "Assigns low/medium/high risk based on intelligent models.",
  },
  {
    title: "Awareness Training",
    description: "Guides to recognize phishing traps with simple tutorials.",
  },
  {
    title: "Data Backup",
    description: "Securely stores scan history and threat intelligence.",
  },
  {
    title: "Privacy First",
    description: "Your data is encrypted and never sold to third parties.",
  },
];

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

function ThreatIllustration() {
  return (
    <div className="relative mx-auto flex min-h-[340px] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_42%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.16),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      <div className="relative h-56 w-56 rounded-full border border-cyan-300/20 bg-cyan-400/10">
        <div className="absolute inset-5 rounded-full border border-cyan-300/20 bg-slate-950/90" />
        <div className="absolute inset-12 rounded-full border border-violet-400/30 bg-violet-500/10" />
        <div className="absolute inset-20 rounded-full border border-white/10 bg-slate-950/90" />

        <span className="absolute left-2 top-12 h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
        <span className="absolute right-4 top-16 h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)] [animation-delay:300ms]" />
        <span className="absolute bottom-10 left-10 h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)] [animation-delay:600ms]" />
        <span className="absolute bottom-16 right-8 h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)] [animation-delay:900ms]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
            <div className="absolute inset-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 blur-[1px]" />
            <svg
              viewBox="0 0 64 64"
              className="relative h-14 w-14 text-emerald-300"
            >
              <path
                fill="currentColor"
                d="M32 4l22 8v15c0 14.1-8.4 24.8-22 33-13.6-8.2-22-18.9-22-33V12l22-8zm0 8.5l-14 5v9.5c0 10.1 5.6 18.2 14 24.4 8.4-6.2 14-14.3 14-24.4V17.5l-14-5z"
              />
              <path
                d="M24 31.5l5.4 5.5L41 25.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="absolute -right-10 top-8 w-40 rounded-2xl border border-emerald-400/20 bg-slate-950/90 p-4 text-left text-xs text-slate-300 shadow-2xl">
          <p className="mb-2 font-semibold text-emerald-300">Threat score</p>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400" />
          </div>
          <p className="mt-2 text-slate-400">Malware delivery chain detected</p>
        </div>

        <div className="absolute -left-12 bottom-6 w-44 rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-xs text-slate-200 shadow-2xl backdrop-blur-xl">
          <p className="mb-2 font-semibold text-cyan-300">
            Real-time intercept
          </p>
          <p className="text-slate-300">
            Brand impersonation blocked before user click.
          </p>
        </div>
      </div>
    </div>
  );
}

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let animationId;

    const animate = () => {
      ctx.fillStyle = "rgba(10, 15, 30, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 200, ${particle.opacity})`;

        particles.slice(index + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 200, 200, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #0d1525 50%, #0a1a2a 100%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-[pulseGlow_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl animate-[pulseGlow_4s_ease-in-out_infinite] [animation-delay:2s]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl animate-[pulseGlow_4s_ease-in-out_infinite] [animation-delay:4s]" />
      </div>
    </>
  );
}

export default function Home() {
  useEffect(() => {
    document.body.classList.add("home-scrollbar");
    return () => document.body.classList.remove("home-scrollbar");
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-white">
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -18px, 0) scale(1.05); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>

      <AnimatedBackground />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.18),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#020617_0%,#030712_45%,#0b1120_100%)]" />
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(120deg,rgba(34,211,238,0.16),rgba(168,85,247,0.12),rgba(15,23,42,0),rgba(59,130,246,0.14))] bg-[length:300%_300%] animate-[gradientShift_18s_ease_infinite]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      <div className="absolute inset-0 bg-slate-950/35" />

      <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-[floatSlow_10s_ease-in-out_infinite]" />
      <div className="absolute right-0 top-36 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl animate-[floatSlow_14s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-[floatSlow_16s_ease-in-out_infinite]" />

      <main className="relative z-10 mx-auto flex-1 max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pb-28">
        <section className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Stop phishing attacks with Chimera an AI security layer built for
              enterprise teams.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Chimera detects impersonation campaigns, malicious links, and
              credential-harvesting pages before users ever trust them. Built
              for SOC workflows, modern SaaS operations, and zero-trust
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/scanner"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                Scan a URL
              </Link>
              <Link
                to="/email-checker"
                className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Check Email Safety
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <GlassCard key={metric.label} className="p-4">
                  <p className="text-2xl font-bold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="relative">
            <ThreatIllustration />
          </div>
        </section>

        <section className="mt-24">
          <div className="text-center">
            <p className="text-lg font-bold uppercase tracking-[0.5em] text-slate-400">
              Key Features
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Built to detect, explain, and stop phishing fast.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              A tight, SOC-ready feature set that keeps analysts and teams in
              control of the full phishing lifecycle.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((feature) => (
              <GlassCard
                key={feature.title}
                className="p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/15"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-violet-500/30">
                  <div className="h-3 w-3 rounded-full bg-white/80" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="platform" className="mt-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/90">
                Platform
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                A control plane for phishing detection, triage, and response.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Designed as an enterprise SaaS surface: clean hierarchy, deep
              telemetry, and confidence-focused design language.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <GlassCard
                key={item.title}
                className="p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/15"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl text-cyan-300">
                  {item.icon}
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-5xl font-black text-white/10">
                    0{index + 1}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section
          id="signals"
          className="mt-24 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <GlassCard className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Threat signals
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Every click, sender, and redirect is scored in context.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Combine static analysis, behavioral heuristics, and identity
              signals to surface risk before users are exposed.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {threatSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-sm text-slate-200"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
                  {signal}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard id="security" className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Security posture
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Built for trust, compliance, and SOC visibility.
            </h2>
            <div className="mt-8 space-y-4">
              {[
                ["Encrypted telemetry", "AES-256 at rest and TLS in transit"],
                [
                  "Audit-ready logs",
                  "Track every decision and analyst override",
                ],
                [
                  "Role-based access",
                  "Control who can scan, review, and respond",
                ],
                [
                  "Enterprise reporting",
                  "Share risk dashboards across stakeholders",
                ],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-24">
          <GlassCard className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-white/10 bg-white/5 p-8 lg:border-b-0 lg:border-r">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  Workflow
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  From detection to response in one motion.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  The interface should feel like a command center: calm,
                  precise, and data-rich without looking crowded.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    [
                      "1. Ingest",
                      "Pull URLs, emails, and suspicious artifacts into a unified pipeline.",
                    ],
                    [
                      "2. Score",
                      "Assign a risk tier using models plus policy-driven rules.",
                    ],
                    [
                      "3. Respond",
                      "Quarantine, notify, and feed analysts the evidence they need.",
                    ],
                  ].map(([step, detail]) => (
                    <div
                      key={step}
                      className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                    >
                      <p className="font-semibold text-white">{step}</p>
                      <p className="mt-1 text-sm text-slate-400">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_60%)]" />
                <div className="relative grid h-full gap-4 sm:grid-cols-2">
                  {[
                    ["Threat map", "Campaign clusters and active attack paths"],
                    ["Risk lens", "User-friendly severity and confidence"],
                    ["Evidence pack", "Headers, screenshots, and domain intel"],
                    [
                      "Policy actions",
                      "Block, warn, or escalate automatically",
                    ],
                  ].map(([title, detail]) => (
                    <div
                      key={title}
                      className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                    >
                      <div className="mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-violet-500/30" />
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
