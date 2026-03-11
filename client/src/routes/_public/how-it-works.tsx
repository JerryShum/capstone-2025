import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  LogIn,
  LayoutGrid,
  Cpu,
  Clapperboard,
  Download,
  ChevronRight,
  BookOpen,
  Palette,
  Users,
  MapPin,
  ScrollText,
  Video,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Particles } from "@/components/ui/particles";

export const Route = createFileRoute("/_public/how-it-works")({
  component: RouteComponent,
});

const steps = [
  {
    number: "01",
    icon: LogIn,
    color: "text-blue-500",
    bg: "bg-blue-500/15",
    glow: "rgba(59,130,246,0.3)",
    title: "Create your Account",
    description:
      "Sign up in seconds using your GitHub or Google account. Once you're in, you'll land in your personal Story Studio — a creative workspace built entirely for you.",
    tags: ["Free to start", "Secure login", "Personalized dashboard"],
  },
  {
    number: "02",
    icon: LayoutGrid,
    color: "text-purple-500",
    bg: "bg-purple-500/15",
    glow: "rgba(168,85,247,0.3)",
    title: "Build your Story in the Visual Canvas",
    description:
      "The Studio is a node-based canvas powered by React Flow. You drag and connect blocks to architect your story — no coding required. Each block has a purpose in the narrative pipeline.",
    tags: ["Node-based editor", "Character blocks", "Scene composition"],
    nodes: [
      { icon: Users, label: "Character Node", desc: "Define your story's characters — name, traits, appearance." },
      { icon: MapPin, label: "Environment Node", desc: "Set the scene — world, time period, mood, atmosphere." },
      { icon: Palette, label: "Prompt Node", desc: "Write your creative direction and visual style." },
      { icon: ScrollText, label: "Script Node", desc: "Control narrative flow — how your pages connect." },
    ],
  },
  {
    number: "03",
    icon: Cpu,
    color: "text-green-500",
    bg: "bg-green-500/15",
    glow: "rgba(34,197,94,0.3)",
    title: "AI Generates Your Script & Visuals",
    description:
      "When you trigger a scene, Story Weaver sends your node configuration to our server. Gemini 2.5 Flash generates your full illustrated script and a rich set of scene image prompts simultaneously — both in a single parallel call for ultra-fast results.",
    tags: ["Gemini 2.5 Flash", "Parallel generation", "Structured output"],
  },
  {
    number: "04",
    icon: Clapperboard,
    color: "text-orange-500",
    bg: "bg-orange-500/15",
    glow: "rgba(249,115,22,0.3)",
    title: "Veo 3 Animates Every Scene",
    description:
      "Each scene image prompt is handed to Google Veo 3 — a state-of-the-art video generation model. Veo 3 renders a cinematic, 8-second animated clip for each page of your story. The server polls the generation status and securely stores the finished video in Google Cloud Storage.",
    tags: ["Google Veo 3", "8s per scene", "Cloud Storage"],
  },
  {
    number: "05",
    icon: BookOpen,
    color: "text-pink-500",
    bg: "bg-pink-500/15",
    glow: "rgba(236,72,153,0.3)",
    title: "Watch, Share & Treasure",
    description:
      "Your completed story — full script, AI illustrations, and animated scenes — is assembled in the Studio. Preview it page by page, share it with family, or save it to your personal library to revisit whenever storytime calls.",
    tags: ["Full storybook", "Scene previews", "Shareable"],
  },
];

function RouteComponent() {
  return (
    <div className="flex w-full flex-col items-center relative overflow-x-hidden px-4 pt-16 sm:pt-24 pb-24 sm:pb-32">
      {/* Fixed Ambient Glows */}
      <Particles
        className="fixed inset-0 z-0 h-full w-full pointer-events-none"
        quantity={40}
        ease={100}
        staticity={70}
        color="#6366f1"
        refresh
      />
      <div className="fixed top-1/4 left-1/4 w-[min(700px,80vw)] h-[min(700px,80vw)] bg-indigo-500/5 dark:bg-indigo-500/8 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[min(600px,80vw)] h-[min(600px,80vw)] bg-blue-500/5 dark:bg-blue-500/8 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* === HERO === */}
      <div className="container relative z-10 max-w-4xl mx-auto text-center mb-16 sm:mb-24">
        <BlurFade delay={0.1} offset={20}>
          <div className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-xl mb-8">
            <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
            Under the Hood
          </div>
        </BlurFade>

        <BlurFade delay={0.2} offset={20}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            How Story Weaver{" "}
            <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Actually Works
            </span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} offset={20}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 leading-relaxed">
            From a blank canvas to a fully illustrated, animated storybook — here's the step-by-step journey behind every story you create.
          </p>
        </BlurFade>
      </div>

      {/* === STEPS === */}
      <div className="container relative z-10 max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-black/10 dark:via-white/10 to-transparent hidden md:block" />

          <div className="flex flex-col gap-16 sm:gap-20">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <BlurFade key={step.number} delay={0.1 + i * 0.08} offset={30}>
                  <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 sm:gap-10 md:gap-16`}>
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} text-left w-full`}>
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"} justify-start`}>
                        <span className="text-xs font-black tracking-widest text-black/30 dark:text-white/30 uppercase">Step {step.number}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-3">{step.title}</h2>
                      <p className="text-black/60 dark:text-white/60 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">{step.description}</p>

                      {/* Tags */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"} justify-start`}>
                        {step.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-medium text-black/60 dark:text-white/60">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Node sub-grid (step 2 only) */}
                      {step.nodes && (
                        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.nodes.map((node) => (
                            <div key={node.label} className={`flex gap-3 items-start p-3 sm:p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-left`}>
                              <div className={`h-8 w-8 shrink-0 rounded-xl ${step.bg} flex items-center justify-center ${step.color}`}>
                                <node.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold mb-0.5">{node.label}</p>
                                <p className="text-xs text-black/50 dark:text-white/50 leading-snug">{node.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Icon orb — center */}
                    <div className="relative shrink-0">
                      <div
                        className={`relative flex h-28 w-28 sm:h-36 sm:w-36 md:h-48 md:w-48 items-center justify-center rounded-3xl border border-black/10 dark:border-white/10 ${step.bg} backdrop-blur-xl`}
                        style={{ boxShadow: `0 0 60px -10px ${step.glow}` }}
                      >
                        <step.icon className={`h-12 w-12 sm:h-16 sm:w-16 ${step.color}`} />
                        <span className="absolute -top-5 -right-5 text-5xl sm:text-6xl font-black text-black/5 dark:text-white/5 select-none">{step.number}</span>
                        <div className="absolute -inset-4 -z-10 rounded-full blur-3xl opacity-30" style={{ background: step.glow }} />
                      </div>
                    </div>

                    {/* Spacer for alignment */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>

      {/* === TECH STACK === */}
      <div className="container relative z-10 max-w-5xl mx-auto mt-20 sm:mt-28 md:mt-32">
        <BlurFade delay={0.1} offset={20}>
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden p-6 sm:p-10 md:p-16">
            <GridPattern
              width={40}
              height={40}
              className="absolute inset-0 h-full w-full opacity-15 mask-[radial-gradient(ellipse_at_center,white,transparent_75%)]"
            />
            <div className="relative z-10 text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs font-semibold mb-4 sm:mb-5">
                <Cpu className="h-3.5 w-3.5 text-green-500" />
                Powered By
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">World-Class AI, End to End</h2>
            </div>
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "Gemini 2.5 Flash", sub: "Script & image prompts", color: "text-blue-500", bg: "bg-blue-500/15", icon: ScrollText },
                { label: "Google Veo 3", sub: "Scene video generation", color: "text-orange-500", bg: "bg-orange-500/15", icon: Video },
                { label: "React Flow", sub: "Node-based story canvas", color: "text-purple-500", bg: "bg-purple-500/15", icon: LayoutGrid },
                { label: "Google Cloud", sub: "Secure video storage", color: "text-green-500", bg: "bg-green-500/15", icon: Download },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-2xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all group">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-xs sm:text-sm">{item.label}</p>
                    <p className="text-xs text-black/50 dark:text-white/50 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>

      {/* === CTA === */}
      <div className="container relative z-10 max-w-3xl mx-auto mt-16 sm:mt-24 text-center w-full">
        <BlurFade delay={0.2} offset={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            See it for Yourself
          </h2>
          <p className="text-base sm:text-lg text-black/60 dark:text-white/60 mb-8 sm:mb-10">
            The best way to understand Story Weaver is to use it. Your first story is free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />
              <Button size="lg" className="relative h-14 w-full sm:w-auto rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 px-10 text-lg shadow-xl font-bold">
                Start for Free
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="h-14 w-full sm:w-auto rounded-full border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-10 text-lg font-medium hover:bg-black/10 dark:hover:bg-white/10">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
