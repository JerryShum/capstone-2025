import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  Zap,
  BookOpen,
  Wand2,
  Star,
  Users,
  Shield,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Particles } from "@/components/ui/particles";

export const Route = createFileRoute("/_public/about")({
  component: RouteComponent,
});

const values = [
  {
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-500/15",
    title: "Child-First Design",
    description:
      "Everything we build is designed with children at the center. Safe, engaging, and endlessly delightful.",
  },
  {
    icon: Wand2,
    color: "text-purple-500",
    bg: "bg-purple-500/15",
    title: "AI with Soul",
    description:
      "Our AI doesn't just generate text – it weaves narratives with warmth, humor, and the kind of magic only stories can hold.",
  },
  {
    icon: Shield,
    color: "text-blue-500",
    bg: "bg-blue-500/15",
    title: "Privacy & Safety",
    description:
      "We are deeply committed to protecting your family's data and keeping the experience safe, clean, and ad-free.",
  },
  {
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-500/15",
    title: "Built for Families",
    description:
      "From toddlers to tweens, our platform grows with your child and offers stories that spark curiosity at every age.",
  },
];

const stats = [
  { value: "10K+", label: "Stories Created" },
  { value: "98%", label: "Parent Approval" },
  { value: "50+", label: "Story Themes" },
  { value: "∞", label: "Possible Endings" },
];

function RouteComponent() {
  return (
    <div className="flex w-full flex-col items-center relative overflow-x-hidden px-4 pt-16 sm:pt-24 pb-24 sm:pb-32">
      {/* Background Particles */}
      <Particles
        className="fixed inset-0 z-0 h-full w-full pointer-events-none"
        quantity={50}
        ease={100}
        staticity={60}
        color="#8b5cf6"
        refresh
      />

      {/* Fixed Ambient Glows */}
      <div className="fixed top-1/4 right-1/4 w-[min(700px,80vw)] h-[min(700px,80vw)] bg-blue-500/8 dark:bg-blue-500/15 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-1/4 w-[min(600px,80vw)] h-[min(600px,80vw)] bg-pink-500/8 dark:bg-pink-500/15 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,70vw)] h-[min(500px,70vw)] bg-purple-500/5 dark:bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* === HERO === */}
      <div className="container relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <BlurFade delay={0.1} offset={20}>
          <div className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-xl mb-8">
            <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
            Our Story
          </div>
        </BlurFade>

        <BlurFade delay={0.2} offset={20}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Sparking Imagination,
            <br />
            <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              One Tale at a Time.
            </span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} offset={20}>
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 leading-relaxed mb-10 sm:mb-12">
            Story Weaver was born from a simple belief — every child deserves to
            be the hero of their own story. We blend cutting-edge AI with your
            child's boundless imagination to create personalized, illustrated,
            and animated bedtime tales they'll remember forever.
          </p>
        </BlurFade>

        {/* Stats Row */}
        <BlurFade delay={0.4} offset={20}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full mb-16 sm:mb-24">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 sm:p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              >
                <span className="text-3xl sm:text-4xl font-black bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-black/50 dark:text-white/50 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>

      {/* === MISSION SECTION === */}
      <div className="container relative z-10 max-w-5xl mx-auto mb-16 sm:mb-24">
        <BlurFade delay={0.1} offset={20}>
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden p-6 sm:p-10 md:p-16">
            <GridPattern
              width={40}
              height={40}
              className="absolute inset-0 h-full w-full opacity-20 dark:opacity-15 mask-[radial-gradient(ellipse_at_center,white,transparent_75%)]"
            />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs font-semibold mb-5 sm:mb-6">
                  <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                  Why We Exist
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  Technology that{" "}
                  <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    empowers
                  </span>
                  , not replaces.
                </h2>
                <p className="text-black/60 dark:text-white/60 text-base sm:text-lg leading-relaxed">
                  We didn't build Story Weaver for efficiency. We built it for
                  the quiet moment before sleep when a parent and child get lost
                  in a world that belongs entirely to them.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:gap-5">
                {[
                  { icon: Star, text: "Every story is 100% unique — generated fresh each time." },
                  { icon: Zap, text: "Beautiful AI illustrations that feel warm, not robotic." },
                  { icon: Heart, text: "Designed by educators, parents, and storytellers." },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-black/70 dark:text-white/70 leading-relaxed text-sm">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* === VALUES SECTION === */}
      <div className="container relative z-10 max-w-5xl mx-auto mb-16 sm:mb-24">
        <BlurFade delay={0.1} offset={20}>
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs font-semibold mb-4">
              <Wand2 className="h-3.5 w-3.5 text-pink-500" />
              What We Believe
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Our Values
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {values.map((v, i) => (
            <BlurFade key={v.title} delay={0.1 + i * 0.08} offset={20}>
              <div className="flex gap-4 sm:gap-5 items-start p-5 sm:p-7 rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all group">
                <div
                  className={`h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-2xl ${v.bg} flex items-center justify-center ${v.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <v.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{v.title}</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed text-sm">
                    {v.description}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* === CTA === */}
      <div className="container relative z-10 max-w-3xl mx-auto w-full">
        <BlurFade delay={0.2} offset={20}>
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(400px,80vw)] h-[200px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Ready to Start?
              </h2>
              <p className="text-base sm:text-lg text-black/60 dark:text-white/60 mb-8 sm:mb-10 max-w-lg mx-auto">
                Join thousands of families creating magical stories together. Your
                first story is just one click away.
              </p>
              <Link to="/login" className="group relative inline-block w-full sm:w-auto">
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />
                <Button
                  size="lg"
                  className="relative h-14 w-full sm:w-auto rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 px-12 text-lg shadow-xl font-bold"
                >
                  Start Weaving Free
                </Button>
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
