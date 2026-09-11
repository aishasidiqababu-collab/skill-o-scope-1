import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  Code2,
  Compass,
  FileText,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Upload,
  UserRound,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { calculateReadiness } from "@shared/readiness";

type NavItem = { label: string; icon: React.ComponentType<{ className?: string }> };

const navItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Skill evidence", icon: BrainCircuit },
  { label: "Assessments", icon: BookOpenCheck },
  { label: "Projects", icon: Code2 },
  { label: "Career explorer", icon: Compass },
];

const skills = [
  { name: "Python", score: 82, target: 85, level: "Proficient", color: "#35d6ff", evidence: "Coding + project", confidence: "High" },
  { name: "DSA", score: 54, target: 80, level: "Developing", color: "#a78bfa", evidence: "Assessment", confidence: "Medium" },
  { name: "SQL", score: 62, target: 75, level: "Intermediate", color: "#fb923c", evidence: "Assessment", confidence: "Medium" },
  { name: "Communication", score: 78, target: 75, level: "Proficient", color: "#60e5a5", evidence: "Interview", confidence: "High" },
];

const roadmap = [
  { week: "WEEK 01–02", title: "Reinforce Python fluency", copy: "Close the small gap with 3 timed problems and one API mini-build.", status: "In progress", accent: "cyan" },
  { week: "WEEK 03–04", title: "Build DSA consistency", copy: "Arrays, hashing and recursion — 20 focused problems with review loops.", status: "Next up", accent: "violet" },
  { week: "WEEK 05", title: "Level up SQL", copy: "Practice joins, aggregation and window functions on real datasets.", status: "Planned", accent: "orange" },
];

function ScoreRing({ score, size = 160, stroke = 11 }: { score: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#ringGradient)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} />
        <defs>
          <linearGradient id="ringGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#39d8ff" />
            <stop offset="55%" stopColor="#7d7cff" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[42px] leading-none font-semibold tracking-[-0.07em] text-white">{score}%</span>
        <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">readiness</span>
      </div>
    </div>
  );
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function NavButton({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button onClick={onClick} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-all ${active ? "bg-white/[0.1] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]" : "text-slate-500 hover:bg-white/[0.05] hover:text-slate-200"}`}>
      <Icon className={`h-[17px] w-[17px] ${active ? "text-cyan-300" : "text-slate-600 group-hover:text-slate-300"}`} />
      <span className="flex-1">{item.label}</span>
      {active && <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#35d6ff]" />}
    </button>
  );
}

function AppLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="brand-mark"><span /><span /><span /></div>
      <div>
        <div className="text-[14px] font-semibold tracking-[-0.02em] text-white">skill-o-scope</div>
        <div className="text-[9px] uppercase tracking-[0.22em] text-slate-600">career intelligence</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "You’re 84% matched for Software Engineer. Your highest-leverage move is a focused DSA sprint — want a 30-day plan?" },
  ]);

  const readiness = calculateReadiness([
    { score: 62, weight: 25 },
    { score: 82, weight: 20 },
    { score: 82, weight: 15 },
    { score: 78, weight: 15 },
    { score: 72, weight: 10 },
    { score: 82, weight: 10 },
    { score: 86, weight: 5 },
  ]);
  const trend = useMemo(() => [58, 62, 64, 61, 68, 71, readiness], [readiness]);

  const sendMessage = () => {
    const clean = message.trim();
    if (!clean) return;
    setMessages((items) => [...items, { from: "user", text: clean }, { from: "ai", text: "Based on your current evidence, I’d prioritize DSA before adding another certification. I can turn that into a weekly plan." }]);
    setMessage("");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080a0f] text-slate-100">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[258px] flex-col border-r border-white/[0.07] bg-[#0b0e14]/95 px-4 py-5 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between px-2">
          <AppLogo />
          <button className="rounded-lg p-1 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden" onClick={() => setMobileOpen(false)}><X className="h-4 w-4" /></button>
        </div>

        <div className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Workspace</div>
        <nav className="space-y-1">
          {navItems.map((item) => <NavButton key={item.label} item={item} active={activeNav === item.label} onClick={() => { setActiveNav(item.label); setMobileOpen(false); }} />)}
        </nav>
        <div className="my-6 h-px bg-white/[0.07]" />
        <div className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Your toolkit</div>
        <nav className="space-y-1">
          <NavButton item={{ label: "Resume analyzer", icon: FileText }} active={activeNav === "Resume analyzer"} onClick={() => setActiveNav("Resume analyzer")} />
          <NavButton item={{ label: "Mock interviews", icon: MessageSquareText }} active={activeNav === "Mock interviews"} onClick={() => setActiveNav("Mock interviews")} />
          <NavButton item={{ label: "Target companies", icon: BriefcaseBusiness }} active={activeNav === "Target companies"} onClick={() => setActiveNav("Target companies")} />
        </nav>

        <div className="mt-auto">
          <div className="mb-4 rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.09] to-violet-400/[0.08] p-3.5">
            <div className="mb-2 flex items-center gap-2 text-cyan-200"><Sparkles className="h-3.5 w-3.5" /><span className="text-[11px] font-semibold">Copilot insight</span></div>
            <p className="text-[11px] leading-relaxed text-slate-400">Your profile is trending up. Keep your weekly streak alive.</p>
            <button onClick={() => setCopilotOpen(true)} className="mt-3 flex items-center gap-1 text-[11px] font-medium text-white hover:text-cyan-200">Ask Copilot <ArrowUpRight className="h-3 w-3" /></button>
          </div>
          <button className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 text-left hover:bg-white/[0.06]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 text-[11px] font-bold text-slate-950">AM</div>
            <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-medium text-white">Your profile</div><div className="truncate text-[10px] text-slate-600">Student workspace</div></div>
            <MoreHorizontal className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </aside>

      <div className="relative min-h-screen lg:pl-[258px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.07] bg-[#080a0f]/80 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/[0.08] p-2 text-slate-400 lg:hidden"><Menu className="h-4 w-4" /></button><div><div className="text-[11px] font-medium text-slate-500">Monday, 14 October 2026</div><h1 className="mt-0.5 text-[17px] font-semibold tracking-[-0.03em] text-white">Welcome to Skill-O-Scope <span className="text-cyan-300">✦</span></h1></div></div>
          <div className="flex items-center gap-2.5"><button className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[11px] text-slate-500 transition hover:border-white/15 hover:text-slate-200 md:flex"><Search className="h-3.5 w-3.5" /> Search <kbd className="ml-2 rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-slate-600">⌘ K</kbd></button><button className="relative rounded-xl border border-white/[0.08] bg-white/[0.025] p-2.5 text-slate-500 hover:text-white"><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#35d6ff]" /></button><div className="hidden h-8 w-px bg-white/[0.08] md:block" /><div className="hidden items-center gap-2 md:flex"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 text-[10px] font-bold text-slate-950">AM</div><ChevronRight className="h-3.5 w-3.5 rotate-90 text-slate-600" /></div></div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-7 md:px-8 md:py-9">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_#35d6ff]" /> Live profile signal</div><h2 className="text-[30px] font-semibold tracking-[-0.055em] text-white md:text-[36px]">Your placement command center</h2><p className="mt-2 max-w-xl text-[13px] leading-relaxed text-slate-500">Know what employers need, prove what you can do, and move with a plan built around your actual evidence.</p></div><button onClick={() => setCopilotOpen(true)} className="group flex w-fit items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 text-[12px] font-semibold text-slate-950 shadow-[0_8px_30px_rgba(255,255,255,.09)] transition hover:-translate-y-0.5"><Sparkles className="h-3.5 w-3.5 text-violet-600" /> Ask AI Career Copilot <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button></div>

          <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr_1fr]">
            <div className="hero-card relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-[#111e2a] via-[#10131d] to-[#151126] p-5 md:p-6">
              <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-[70px]" /><div className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-56 rounded-full bg-violet-500/10 blur-[70px]" />
              <div className="relative flex h-full flex-col justify-between gap-7 md:flex-row md:items-center"><div><div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-slate-400"><Gauge className="h-4 w-4 text-cyan-300" /> Overall placement readiness <CircleHelp className="h-3.5 w-3.5 text-slate-600" /></div><div className="flex items-end gap-2"><span className="text-[56px] font-semibold leading-none tracking-[-0.08em] text-white">{readiness}</span><span className="mb-1.5 text-xl font-medium text-slate-500">/ 100</span></div><div className="mt-3 flex items-center gap-2"><span className="inline-flex items-center gap-1 rounded-full bg-emerald-300/10 px-2 py-1 text-[10px] font-semibold text-emerald-300"><TrendingUp className="h-3 w-3" /> +8.4% this month</span></div><p className="mt-4 max-w-[230px] text-[11px] leading-relaxed text-slate-500">Calculated from demonstrated abilities, not self-declared skills.</p></div><div className="flex items-center justify-center pr-2"><ScoreRing score={readiness} size={162} /></div></div>
            </div>
            <div className="glass-card flex flex-col justify-between rounded-2xl p-5"><div className="flex items-start justify-between"><div><div className="mb-2 text-[11px] font-medium text-slate-500">Role match</div><div className="text-[34px] font-semibold tracking-[-0.07em] text-white">84<span className="text-lg text-slate-500">%</span></div></div><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300"><Target className="h-4 w-4" /></div></div><div><div className="mb-2 flex items-center justify-between text-[10px]"><span className="text-slate-500">Software Engineer</span><span className="font-medium text-violet-300">Strong fit</span></div><MiniBar value={84} color="linear-gradient(90deg,#7c6cff,#c084fc)" /><button onClick={() => setActiveNav("Career explorer")} className="mt-4 flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white">View role breakdown <ChevronRight className="h-3 w-3" /></button></div></div>
            <div className="glass-card flex flex-col justify-between rounded-2xl p-5"><div className="flex items-start justify-between"><div><div className="mb-2 text-[11px] font-medium text-slate-500">Eligibility status</div><div className="text-[19px] font-semibold tracking-[-0.04em] text-emerald-300">Potentially eligible</div></div><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300"><Check className="h-4 w-4" /></div></div><div><div className="mb-3 text-[10px] leading-relaxed text-slate-500">3 of 4 requirements verified · one needs evidence</div><div className="flex gap-1.5">{["Degree", "Year", "CGPA", "Skill"].map((label, i) => <div key={label} className={`flex-1 rounded-lg px-1 py-2 text-center text-[9px] ${i === 3 ? "bg-amber-300/10 text-amber-300" : "bg-emerald-300/10 text-emerald-300"}`}><div className="mb-1 text-[10px]">{i === 3 ? "!" : "✓"}</div>{label}</div>)}</div><button onClick={() => setActiveNav("Skill evidence")} className="mt-4 flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white">Complete evidence <ChevronRight className="h-3 w-3" /></button></div></div>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="glass-card rounded-2xl p-5 md:p-6"><div className="mb-6 flex items-start justify-between"><div><div className="mb-1 flex items-center gap-2 text-[14px] font-semibold text-white"><BrainCircuit className="h-4 w-4 text-cyan-300" /> Evidence-based skills</div><p className="text-[11px] text-slate-600">Current score vs. target for your selected role</p></div><button onClick={() => setActiveNav("Skill evidence")} className="flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">View all <ArrowUpRight className="h-3 w-3" /></button></div><div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">{skills.map((skill) => <div key={skill.name}><div className="mb-2.5 flex items-start justify-between"><div><div className="text-[12px] font-medium text-slate-200">{skill.name}</div><div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-600"><span>{skill.level}</span><span className="h-0.5 w-0.5 rounded-full bg-slate-700" /><span>{skill.evidence}</span></div></div><div className="text-right"><span className="text-[15px] font-semibold text-white">{skill.score}</span><span className="text-[10px] text-slate-600"> / {skill.target}</span></div></div><div className="relative"><MiniBar value={skill.score} color={skill.color} /><div className="absolute -top-1.5 h-4 w-px bg-slate-500/80" style={{ left: `${skill.target}%` }} /></div><div className="mt-2 flex items-center justify-between text-[9px]"><span className={`rounded-full px-1.5 py-0.5 ${skill.confidence === "High" ? "bg-emerald-300/10 text-emerald-300" : "bg-amber-300/10 text-amber-300"}`}>{skill.confidence} confidence</span><span className={skill.score >= skill.target ? "text-emerald-300" : "text-slate-600"}>{skill.score >= skill.target ? "Ready" : `${skill.target - skill.score} pts gap`}</span></div></div>)}</div></div>
            <div className="glass-card rounded-2xl p-5 md:p-6"><div className="mb-5 flex items-start justify-between"><div><div className="mb-1 text-[14px] font-semibold text-white">Readiness pulse</div><p className="text-[11px] text-slate-600">Last 7 assessment signals</p></div><div className="flex items-center gap-1.5 rounded-full bg-emerald-300/10 px-2 py-1 text-[10px] font-medium text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Trending up</div></div><div className="relative h-[126px] overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent"><svg viewBox="0 0 420 126" preserveAspectRatio="none" className="h-full w-full"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#35d6ff" stopOpacity=".27" /><stop offset="100%" stopColor="#35d6ff" stopOpacity="0" /></linearGradient></defs><path d={`M0 104 ${trend.map((v, i) => `L${i * 70} ${126 - v}`).join(" ")} L420 126 L0 126 Z`} fill="url(#area)" /><path d={`M0 104 ${trend.map((v, i) => `L${i * 70} ${126 - v}`).join(" ")}`} fill="none" stroke="#4ddcff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg><div className="absolute inset-x-0 bottom-2 flex justify-between px-2 text-[9px] text-slate-700"><span>08 Oct</span><span>10 Oct</span><span>12 Oct</span><span>14 Oct</span></div></div><div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.07] text-center"><div><div className="text-[16px] font-semibold text-white">+18</div><div className="mt-1 text-[9px] text-slate-600">points gained</div></div><div><div className="text-[16px] font-semibold text-white">4</div><div className="mt-1 text-[9px] text-slate-600">assessments</div></div><div><div className="text-[16px] font-semibold text-white">12d</div><div className="mt-1 text-[9px] text-slate-600">streak</div></div></div></div>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
            <div className="glass-card rounded-2xl p-5 md:p-6"><div className="mb-5 flex items-start justify-between"><div><div className="mb-1 flex items-center gap-2 text-[14px] font-semibold text-white"><Zap className="h-4 w-4 text-amber-300" /> Skill gap engine</div><p className="text-[11px] text-slate-600">What to improve for Software Engineer</p></div><button className="rounded-lg p-1.5 text-slate-600 hover:bg-white/5 hover:text-white"><MoreHorizontal className="h-4 w-4" /></button></div><div className="space-y-3">{[{ name: "DSA", current: 54, target: 80, label: "Major gap", tone: "violet" }, { name: "SQL", current: 62, target: 75, label: "Moderate gap", tone: "orange" }, { name: "Python", current: 82, target: 85, label: "Small gap", tone: "cyan" }, { name: "Communication", current: 78, target: 75, label: "Ready", tone: "green" }].map((item) => <div key={item.name} className="flex items-center gap-3 rounded-xl bg-white/[0.025] px-3 py-2.5"><div className={`h-2 w-2 rounded-full ${item.tone === "violet" ? "bg-violet-300" : item.tone === "orange" ? "bg-orange-300" : item.tone === "cyan" ? "bg-cyan-300" : "bg-emerald-300"}`} /><div className="w-[84px] text-[11px] font-medium text-slate-300">{item.name}</div><div className="flex flex-1 items-center gap-2"><span className="text-[10px] text-slate-500">{item.current}</span><div className="relative flex-1"><MiniBar value={(item.current / item.target) * 100} color={item.tone === "violet" ? "#a78bfa" : item.tone === "orange" ? "#fb923c" : item.tone === "cyan" ? "#35d6ff" : "#60e5a5"} /><span className="absolute -top-0.5 h-2.5 w-px bg-slate-400/50" style={{ left: "100%" }} /></div><span className="w-5 text-right text-[10px] text-slate-500">{item.target}</span></div><span className={`hidden rounded-full px-2 py-1 text-[9px] font-medium sm:block ${item.tone === "violet" ? "bg-violet-300/10 text-violet-300" : item.tone === "orange" ? "bg-orange-300/10 text-orange-300" : item.tone === "cyan" ? "bg-cyan-300/10 text-cyan-300" : "bg-emerald-300/10 text-emerald-300"}`}>{item.label}</span></div>)}</div><div className="mt-5 rounded-xl border border-violet-300/10 bg-violet-300/[0.05] p-3"><div className="flex gap-2.5"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" /><div><div className="text-[11px] font-medium text-violet-200">Why you’re not ready yet</div><p className="mt-1 text-[10px] leading-relaxed text-slate-500">DSA is 26 points below target and your project evidence does not yet show backend ownership.</p></div></div></div></div>
            <div className="glass-card rounded-2xl p-5 md:p-6"><div className="mb-5 flex items-start justify-between"><div><div className="mb-1 flex items-center gap-2 text-[14px] font-semibold text-white"><Compass className="h-4 w-4 text-cyan-300" /> Personalized roadmap</div><p className="text-[11px] text-slate-600">A plan that updates as your evidence improves</p></div><button onClick={() => setActiveNav("Assessments")} className="flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">Open plan <ArrowUpRight className="h-3 w-3" /></button></div><div className="space-y-1">{roadmap.map((step, index) => <div key={step.week} className="group flex gap-3 rounded-xl p-2.5 transition hover:bg-white/[0.035]"><div className="flex flex-col items-center"><div className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold ${index === 0 ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200" : "border-white/10 bg-white/[0.04] text-slate-500"}`}>{index === 0 ? <Check className="h-3.5 w-3.5" /> : `0${index + 1}`}</div>{index < roadmap.length - 1 && <div className="mt-1 h-full w-px bg-white/[0.08]" />}</div><div className="pb-3"><div className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${step.accent === "cyan" ? "text-cyan-300" : step.accent === "violet" ? "text-violet-300" : "text-orange-300"}`}>{step.week} · {step.status}</div><div className="mt-1 text-[12px] font-medium text-slate-200">{step.title}</div><p className="mt-1 max-w-md text-[10px] leading-relaxed text-slate-600">{step.copy}</p></div></div>)}</div></div>
          </section>

          <section className="mt-4 grid gap-4 md:grid-cols-3"><div className="glass-card group rounded-2xl p-5 transition hover:-translate-y-0.5"><div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300"><Code2 className="h-4 w-4" /></div><div className="text-[12px] font-semibold text-white">Build evidence</div><p className="mt-1.5 text-[10px] leading-relaxed text-slate-600">Add a project that proves your backend and systems thinking.</p><button onClick={() => setActiveNav("Projects")} className="mt-5 flex items-center gap-1 text-[10px] font-medium text-cyan-300">Add a project <Plus className="h-3 w-3" /></button></div><div className="glass-card group rounded-2xl p-5 transition hover:-translate-y-0.5"><div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-300/10 text-violet-300"><MessageSquareText className="h-4 w-4" /></div><div className="text-[12px] font-semibold text-white">Practice interview</div><p className="mt-1.5 text-[10px] leading-relaxed text-slate-600">Your technical interview confidence is ready for another rep.</p><button onClick={() => setActiveNav("Mock interviews")} className="mt-5 flex items-center gap-1 text-[10px] font-medium text-violet-300">Start mock interview <Play className="h-3 w-3" /></button></div><div className="glass-card group rounded-2xl p-5 transition hover:-translate-y-0.5"><div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300"><BriefcaseBusiness className="h-4 w-4" /></div><div className="text-[12px] font-semibold text-white">Target companies</div><p className="mt-1.5 text-[10px] leading-relaxed text-slate-600">Compare role expectations across your shortlist.</p><button onClick={() => setActiveNav("Target companies")} className="mt-5 flex items-center gap-1 text-[10px] font-medium text-amber-300">Explore matches <ArrowUpRight className="h-3 w-3" /></button></div></section>

          <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-5 text-[10px] text-slate-600 sm:flex-row"><div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> All systems operational · Evidence sync complete</div><div className="flex items-center gap-4"><span>Privacy controls</span><span>Data export</span><span>v1.0 beta</span></div></footer>
        </main>
      </div>

      {copilotOpen && <div className="fixed inset-0 z-[60] flex items-end justify-end bg-black/40 p-4 backdrop-blur-[2px] md:p-6"><div className="copilot-panel flex h-[min(620px,calc(100vh-32px))] w-full max-w-[410px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#10141d] shadow-[0_20px_80px_rgba(0,0,0,.55)]"><div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4"><div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950"><Sparkles className="h-4 w-4" /></div><div><div className="text-[13px] font-semibold text-white">AI Career Copilot</div><div className="text-[10px] text-emerald-300">Using your profile evidence</div></div></div><button onClick={() => setCopilotOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X className="h-4 w-4" /></button></div><div className="flex-1 space-y-4 overflow-y-auto p-5">{messages.map((item, index) => <div key={`${item.from}-${index}`} className={`flex ${item.from === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[86%] rounded-2xl px-3.5 py-3 text-[11px] leading-relaxed ${item.from === "user" ? "rounded-br-md bg-cyan-300 text-slate-950" : "rounded-bl-md bg-white/[0.06] text-slate-300"}`}>{item.text}</div></div>)}<div className="pt-2"><div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Suggested prompts</div><div className="flex flex-wrap gap-2">{["What should I learn next?", "Am I ready for this role?", "Give me a 30-day plan"].map((prompt) => <button key={prompt} onClick={() => setMessage(prompt)} className="rounded-full border border-white/10 px-2.5 py-1.5 text-[10px] text-slate-400 hover:border-cyan-300/30 hover:text-cyan-200">{prompt}</button>)}</div></div></div><div className="border-t border-white/[0.08] p-4"><div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2"><textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} rows={1} placeholder="Ask about your career path..." className="max-h-24 min-h-[36px] flex-1 resize-none bg-transparent px-2 py-2 text-[11px] text-white outline-none placeholder:text-slate-600" /><button onClick={sendMessage} className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300 text-slate-950 transition hover:bg-cyan-200"><Send className="h-3.5 w-3.5" /></button></div><div className="mt-2 text-center text-[9px] text-slate-600">AI estimate · Not a guarantee</div></div></div></div>}
    </div>
  );
}
