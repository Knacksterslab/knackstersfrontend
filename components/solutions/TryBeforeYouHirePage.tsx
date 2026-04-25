import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  Gauge,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const modelSteps = [
  {
    icon: Target,
    title: "Define a real outcome",
    description:
      "Start with one practical business outcome, not a generic interview. Scope the trial around concrete deliverables.",
  },
  {
    icon: Users,
    title: "Get matched in under 30 minutes",
    description:
      "We quickly align your scope with pre-vetted specialists who have relevant domain and execution experience.",
  },
  {
    icon: FileCheck2,
    title: "Run a structured trial",
    description:
      "Evaluate communication, ownership, speed, quality, and collaboration in your real environment before long-term commitment.",
  },
  {
    icon: HeartHandshake,
    title: "Decide with confidence",
    description:
      "Continue with confidence, expand the team, or pause. You decide based on real evidence, not interview assumptions.",
  },
];

const scorecard = [
  "Clarity of communication across stakeholders",
  "Speed of understanding your product and context",
  "Quality and reliability of delivered work",
  "Ownership, judgment, and problem-solving",
  "Responsiveness and collaboration with your team",
  "Fit for long-term engagement goals",
];

const bestFit = [
  "Teams that need talent now but want to reduce hiring risk",
  "Roles where execution quality matters more than interview performance",
  "Companies moving quickly who need proof before commitment",
  "Leaders replacing long screening cycles with evidence-based decisions",
];

const nextPaths = [
  {
    title: "Path 1 — Continue via Subscription",
    description:
      "If trial performance is strong and you want managed continuity, continue with a Knacksters subscription. Keep momentum, add capacity, and stay supported by your dedicated Customer Success Manager.",
    bullets: [
      "Monthly retainer options with flexible hours",
      "Expand to more roles or domains as needed",
      "Centralized delivery, invoicing, and oversight",
    ],
    accentColor: "#FF9634",
  },
  {
    title: "Path 2 — Convert to Direct Hire",
    description:
      "If you want long-term in-house ownership, use trial evidence to make a confident hire decision. You evaluate real work first, then proceed with a permanent hiring path.",
    bullets: [
      "Use scorecard data for decision confidence",
      "Reduce mis-hires from interview-only decisions",
      "Move forward only when role fit is proven",
    ],
    accentColor: "#E9414C",
  },
];

const pitfalls = [
  "Using vague tasks instead of measurable outcomes",
  "Judging based on one-off impressions vs repeated performance",
  "Skipping communication and ownership criteria in evaluation",
  "Forcing a permanent hire decision too early",
];

const outcomes = [
  { value: "<30 min", label: "Time to initial match" },
  { value: "50 hrs", label: "Free trial capacity" },
  { value: "100%", label: "Pre-vetted professionals" },
  { value: "0", label: "Long-term lock-in required" },
];

export default function TryBeforeYouHirePage() {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-16 sm:py-20 md:py-24 px-4"
        style={{ backgroundImage: "url(/hero-bg.png)", backgroundPosition: "center bottom" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-orange-200 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#FF9634]" />
            <span className="text-sm font-medium text-gray-700">Model Solution</span>
          </div>
          <h1 className="font-mono font-normal text-[2rem] sm:text-[2.5rem] md:text-[3rem] text-[rgb(38,38,38)] leading-tight mb-4">
            Try Before You Hire{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #E9414C 0%, #FF9634 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Vetted Talent
            </span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-3xl mx-auto leading-relaxed mb-8">
            Evaluate real execution before making long-term commitments. This model helps you reduce hiring
            risk through real scoped work, then choose the path that fits your business model: continue via
            subscription or convert to direct hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 rounded-lg font-sans font-semibold text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundImage: "linear-gradient(90deg, #E9414C 0%, #FF9634 100%)" }}
            >
              Start Free — 50 Hours →
            </Link>
            <Link
              href="/how-it-works"
              className="inline-block px-8 py-4 rounded-lg font-sans font-semibold text-[rgb(38,38,38)] text-base border border-gray-300 hover:border-[#FF9634] transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-[#262626]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {outcomes.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-2xl sm:text-3xl font-bold font-mono mb-1"
                style={{
                  backgroundImage: "linear-gradient(90deg, #E9414C 0%, #FF9634 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-sans" style={{ color: "rgb(140,140,140)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              How the Model Works
            </h2>
            <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto text-[rgb(89,89,89)]">
              A practical, low-risk process to validate execution before deciding how to proceed next.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {modelSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-[#FF9634] hover:shadow-lg transition-all duration-300 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#E9414C]/10 to-[#FF9634]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-[#E9414C]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide font-sans text-[rgb(140,140,140)] mb-1">
                        Step {idx + 1}
                      </p>
                      <h3 className="font-sans font-semibold text-lg text-[rgb(38,38,38)] mb-2">{step.title}</h3>
                      <p className="font-sans text-sm text-[rgb(89,89,89)] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-[rgb(250,250,250)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              Two Clear Paths After the Trial
            </h2>
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-3xl mx-auto">
              The trial is a decision framework, not a dead end. Choose the route that best matches your operating model.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {nextPaths.map((path) => (
              <div key={path.title} className="bg-white border border-gray-200 rounded-xl p-7">
                <h3
                  className="font-sans font-semibold text-xl mb-3"
                  style={{ color: "rgb(38,38,38)" }}
                >
                  {path.title}
                </h3>
                <p className="font-sans text-sm text-[rgb(89,89,89)] leading-relaxed mb-4">{path.description}</p>
                <ul className="space-y-3">
                  {path.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[rgb(89,89,89)] font-sans">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: path.accentColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-[rgb(250,250,250)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-5 h-5 text-[#FF9634]" />
              <h3 className="font-mono text-2xl text-[rgb(38,38,38)]">What to Measure During Trial</h3>
            </div>
            <p className="font-sans text-sm text-[rgb(89,89,89)] mb-4">
              Use a consistent scorecard so your decision is evidence-based, repeatable, and fair.
            </p>
            <ul className="space-y-3">
              {scorecard.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[rgb(89,89,89)] font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9634] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#E9414C]" />
              <h3 className="font-mono text-2xl text-[rgb(38,38,38)]">Common Pitfalls to Avoid</h3>
            </div>
            <p className="font-sans text-sm text-[rgb(89,89,89)] mb-4">
              Avoid these mistakes to get the most value from your 50-hour trial.
            </p>
            <ul className="space-y-3">
              {pitfalls.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[rgb(89,89,89)] font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#E9414C] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              Where This Model Fits Best
            </h2>
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-3xl mx-auto">
              Ideal for high-trust and execution-heavy roles where real performance matters more than interview polish.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestFit.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[rgb(250,250,250)] border border-gray-200 rounded-lg p-5">
                <Clock3 className="w-5 h-5 text-[#FF9634] mt-0.5 shrink-0" />
                <p className="font-sans text-sm text-[rgb(89,89,89)] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-[#262626]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-white mb-4">
            Start with proof, then scale with confidence
          </h2>
          <p className="font-sans text-base sm:text-lg mb-8" style={{ color: "rgb(140,140,140)", lineHeight: "1.57" }}>
            Start with 50 free hours and evaluate real work before deciding on longer-term engagement.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 rounded-lg font-sans font-semibold text-white text-base transition-opacity hover:opacity-90"
            style={{ backgroundImage: "linear-gradient(90deg, #E9414C 0%, #FF9634 100%)" }}
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </div>
  );
}

