import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  BookOpen, ChevronRight, Cpu, Database, Rocket,
  Scale, Target, Users, Star, BarChart3,
} from "lucide-react";

const MODULE_ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
};

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Chief Operating Officer", company: "TechVentures Inc.", quote: "This course gave me the vocabulary and frameworks I needed to lead our AI transformation with confidence. The ethical AI module alone was worth the investment.", stars: 5 },
  { name: "Marcus Williams", role: "VP of Strategy", company: "Global Financial Group", quote: "Finally, an AI course designed for leaders — not engineers. The strategic frameworks are immediately applicable, and the content is refreshingly honest about AI's limitations.", stars: 5 },
  { name: "Priya Sharma", role: "Chief Digital Officer", company: "HealthFirst Systems", quote: "I've taken several AI courses, but none matched this one for practical leadership application. The data governance module transformed how we approach our data strategy.", stars: 5 },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { data: modules } = trpc.course.getModules.useQuery();
  const { data: enrollmentStatus } = trpc.enrollment.check.useQuery(undefined, { enabled: isAuthenticated });

  const freeEnroll = trpc.enrollment.freeEnroll.useMutation({
    onSuccess: (data) => {
      navigate(data.redirectTo);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleEnroll = () => {
    if (!isAuthenticated) { window.location.href = getLoginUrl("/dashboard"); return; }
    if (enrollmentStatus?.enrolled) { navigate("/course/demystifying-ai/what-is-ai"); return; }
    freeEnroll.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-sm tracking-wide">AI Literacy for Leaders</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {user?.name?.split(" ")[0]}</span>
                <Button size="sm" onClick={handleEnroll} disabled={freeEnroll.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 btn-scale">
                  {freeEnroll.isPending ? "Loading..." : enrollmentStatus?.enrolled ? "My Course" : "Enroll"}
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => window.location.href = getLoginUrl()} className="bg-primary text-primary-foreground hover:bg-primary/90 btn-scale">Sign In</Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, oklch(0.72 0.14 75), transparent)" }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, oklch(0.72 0.14 75), transparent)" }} />
        </div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-amber-400/40 text-amber-300 bg-amber-400/10 px-4 py-1.5 text-xs tracking-widest uppercase">Executive Education Program | Dr. Vicki Bealman</Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-white leading-tight mb-6">
              AI Literacy<br /><span style={{ color: "oklch(0.72 0.14 75)" }}>for Leaders</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              The definitive course for executives who need to lead confidently in the age of artificial intelligence — without becoming data scientists.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#curriculum" className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors">
                View curriculum <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[{ value: "5", label: "Modules" }, { value: "18", label: "Lessons" }, { value: "4+", label: "Hours" }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-serif font-semibold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Dr. Vicki Bealman */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Headshot */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-10 h-10 text-primary/60" />
                    </div>
                    <p className="text-xs text-muted-foreground font-sans">Photo coming soon</p>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg font-sans tracking-wide">
                  Ed.D. | AI Strategist
                </div>
              </div>
            </div>
            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1 text-xs tracking-widest uppercase font-sans">Your Instructor</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-5">Dr. Vicki Bealman</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dr. Vicki Bealman is an executive educator, leadership strategist, and AI literacy advocate with over two decades of experience helping senior leaders navigate transformational change. She holds a Doctorate in Education with a focus on organizational leadership and has advised C-suite executives across healthcare, finance, and technology sectors.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Dr. Bealman developed the <em>AI Literacy for Leaders</em> program after recognizing a critical gap: executives were being asked to make high-stakes AI decisions without the conceptual foundation to evaluate them. Her approach is practical, non-technical, and grounded in real-world leadership challenges — designed to give leaders the confidence to ask the right questions, challenge vendor claims, and drive responsible AI adoption.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["Executive Education", "AI Strategy", "Organizational Leadership", "Change Management", "Leadership Development", "Organizational Behavior"].map((tag) => (
                  <span key={tag} className="text-xs font-sans font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-foreground mb-4">What You'll Learn</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Every module translates AI concepts into actionable leadership frameworks you can apply immediately.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Cpu className="w-5 h-5" />, title: "Demystify AI", desc: "Understand what AI actually is — and isn't — so you can evaluate vendors and strategies with clarity." },
              { icon: <Target className="w-5 h-5" />, title: "Build AI Strategy", desc: "Identify high-value use cases, build a roadmap, and align AI investments with business objectives." },
              { icon: <Database className="w-5 h-5" />, title: "Govern Your Data", desc: "Establish data quality standards, privacy frameworks, and governance structures that enable AI success." },
              { icon: <Scale className="w-5 h-5" />, title: "Lead Ethically", desc: "Navigate algorithmic bias, transparency requirements, and workforce impacts with integrity." },
              { icon: <Users className="w-5 h-5" />, title: "Manage Change", desc: "Drive AI adoption, overcome resistance, and build the talent and culture your organization needs." },
              { icon: <BarChart3 className="w-5 h-5" />, title: "Measure Impact", desc: "Define success metrics, track ROI, and communicate AI value to stakeholders at every level." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-xl border border-border bg-card card-hover">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm font-sans">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-24 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-foreground mb-4">The Five-Module Curriculum</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">A carefully sequenced journey from AI fundamentals to organizational transformation.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {(modules ?? []).map((mod, idx) => (
              <div key={mod.slug} className="flex gap-5 p-6 rounded-2xl bg-card border border-border card-hover">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${mod.color}`}>
                    {MODULE_ICONS[mod.icon] ?? <BookOpen className="w-6 h-6" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Module {idx + 1}</span>
                    <Badge variant="secondary" className="text-xs">{mod.lessonCount} lessons</Badge>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-1">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
                </div>
                <div className="flex-shrink-0 hidden sm:flex items-center">
                  <ChevronRight className="w-5 h-5 text-muted-foreground/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-foreground mb-4">What Leaders Are Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-card border border-border flex flex-col gap-4 card-hover">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic flex-1">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><BookOpen className="w-3.5 h-3.5 text-white" /></div>
            <span className="font-semibold text-sm">AI Literacy for Leaders</span>
          </div>
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} AI Literacy for Leaders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
