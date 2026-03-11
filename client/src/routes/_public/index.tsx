import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import AIlandscape from "@/assets/AIlandscape.jpg";
import { Link } from "@tanstack/react-router";
import { Sparkles, PenTool, Film, ChevronRight } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";

const features = [
  {
    Icon: Sparkles,
    name: "Your Magical Co-Creator",
    description: "Our friendly AI helps you dream up new worlds, lovable characters, and exciting plots.",
    href: "/login",
    cta: "Start generating",
    background: <div className="absolute -right-10 -top-10 opacity-20 text-blue-500 blur-2xl transition-all duration-500 group-hover:opacity-40"><Sparkles className="h-64 w-64" /></div>,
    className: "col-span-3 lg:col-span-1 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300",
  },
  {
    Icon: PenTool,
    name: "Endless Adventures",
    description: "From sleepy bunnies to brave astronauts, create a brand-new story every time. The only limit is your imagination.",
    href: "/login",
    cta: "Start writing",
    background: <div className="absolute -right-10 -top-10 opacity-20 text-purple-500 blur-2xl transition-all duration-500 group-hover:opacity-40"><PenTool className="h-64 w-64" /></div>,
    className: "col-span-3 lg:col-span-1 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300",
  },
  {
    Icon: Film,
    name: "Bring Stories to Life",
    description: "Go beyond just text. Generate beautiful illustrations and simple, charming animations to make storytime unforgettable.",
    href: "/login",
    cta: "Start animating",
    background: <div className="absolute -right-10 -top-10 opacity-20 text-pink-500 blur-2xl transition-all duration-500 group-hover:opacity-40"><Film className="h-64 w-64" /></div>,
    className: "col-span-3 lg:col-span-1 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300",
  },
];

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex w-full flex-col">
      {/* SECTION 1: HERO */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden border-b">
        <Particles
          className="absolute inset-0 z-0 h-full w-full"
          quantity={100}
          ease={80}
          color="#3b82f6"
          refresh
        />

        <div className="container mx-auto relative z-10 max-w-7xl px-4 pt-32 pb-24 text-center">
          {/* Pill Badge */}
          <BlurFade delay={0.1} offset={10}>
            <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm font-medium text-foreground shadow-[0_0_2rem_-0.5rem_#0003] dark:shadow-[0_0_2rem_-0.5rem_#fff8] backdrop-blur-xl transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:shadow-[0_0_2.5rem_-0.5rem_#0005] dark:hover:shadow-[0_0_2.5rem_-0.5rem_#fff8]">
              <Sparkles className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent font-bold dark:font-medium">Introducing Story Weaver Beta!</span>
            </div>
          </BlurFade>

          {/* Headline */}
          <BlurFade delay={0.2} offset={20}>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Weave{" "}
              <TypingAnimation
                className="inline-block bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                duration={50}
                delay={300}
                as="span"
              >
                magical, animated
              </TypingAnimation>
              <br className="hidden sm:block" />
              {" "}stories for your child.
            </h1>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={0.3} offset={20}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-black/70 dark:text-white/70 md:text-xl leading-relaxed">
              Just add a spark of imagination. Our AI helps you generate,
              illustrate, and animate a unique tale in minutes, creating memories that last a lifetime.
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.4} offset={20}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/login" className="w-full sm:w-auto relative group">
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"></div>
                <Button variant="default" size="lg" className="relative h-14 w-full rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 px-8 text-lg shadow-xl sm:w-auto">
                  Start Weaving Free
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-14 w-full rounded-full border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-foreground hover:bg-black/10 dark:hover:bg-white/10 px-8 text-lg sm:w-auto backdrop-blur-md">
                  How it works
                </Button>
              </Link>
            </div>
          </BlurFade>

          {/* Visual Content (Featured Image) */}
          <BlurFade delay={0.6} offset={40}>
            <div className="mx-auto mt-20 w-full max-w-5xl md:mt-28 perspective-[1000px]">
              <div className="relative rounded-2xl border bg-background/50 p-2 shadow-2xl backdrop-blur-sm sm:p-4 rotate-x-2 hover:rotate-x-0 transition-transform duration-700 ease-out">
                <div className="overflow-hidden rounded-xl border bg-muted relative">
                  <img
                    src={AIlandscape}
                    alt="A magical AI-generated landscape"
                    className="w-full object-cover"
                  />

                  {/* Overlay gradient inside image frame */}
                  <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Decorative Glow behind the image wrapper */}
                <div className="absolute -inset-1 -z-10 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-2xl"></div>
              </div>
            </div>
          </BlurFade>

        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        {/* SECTION 2: FEATURES */}
        <div className="mt-40 md:mt-48 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          <h2 className="mb-4 text-center text-4xl md:text-5xl font-bold tracking-tight">
            Your Personal Story Studio
          </h2>
          <p className="text-black/60 dark:text-white/60 mx-auto max-w-2xl text-center text-lg mb-16">
            Story Weaver makes it easy to create a brand-new adventure every
            night.
          </p>

          <BentoGrid className="lg:grid-rows-1">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>

        {/* SECTION 3: HOW IT WORKS */}
        <div className="relative mt-40 py-24 md:mt-48 overflow-hidden rounded-[3rem] border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-6 shadow-2xl backdrop-blur-3xl">
          <GridPattern
            width={40}
            height={40}
            className="absolute inset-0 h-full w-full opacity-20 mask-[radial-gradient(ellipse_at_center,white,transparent_80%)]"
          />

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="text-center mb-24">
              <h2 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight">
                How the Magic Happens
              </h2>
              <p className="text-black/60 dark:text-white/60 mx-auto max-w-2xl text-lg md:text-xl">
                It's as easy as 1, 2, 3 to create your child's next favorite story.
              </p>
            </div>

            <div className="space-y-32">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-3xl font-bold mb-4">1. Tell Us Your Idea</h3>
                  <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
                    Start with a character, a place, or a simple idea. Our AI will
                    help you brainstorm and build the perfect plot, ensuring every adventure is tailored exactly how you want it.
                  </p>
                </div>
                <div className="relative flex h-40 w-40 md:h-56 md:w-56 shrink-0 items-center justify-center rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]">
                  <Sparkles className="h-16 w-16 text-green-600 dark:text-green-400 relative z-10" />
                  <div className="absolute -inset-4 -z-10 bg-green-500 opacity-30 dark:opacity-20 blur-3xl rounded-full"></div>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4">2. Watch It Come Alive</h3>
                  <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
                    Our AI generates beautiful illustrations and gentle animations to
                    match your story. We weave the text and art together making every single page a breathtaking delight.
                  </p>
                </div>
                <div className="relative flex h-40 w-40 md:h-56 md:w-56 shrink-0 items-center justify-center rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)]">
                  <PenTool className="h-16 w-16 text-yellow-600 dark:text-yellow-400 relative z-10" />
                  <div className="absolute -inset-4 -z-10 bg-yellow-500 opacity-40 dark:opacity-20 blur-3xl rounded-full"></div>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-3xl font-bold mb-4">3. Share and Enjoy</h3>
                  <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
                    Read your new story together, save it to your personalized library, or even print it out for a
                    special keepsake. The adventure never truly ends.
                  </p>
                </div>
                <div className="relative flex h-40 w-40 md:h-56 md:w-56 shrink-0 items-center justify-center rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]">
                  <Film className="h-16 w-16 text-red-600 dark:text-red-400 relative z-10" />
                  <div className="absolute -inset-4 -z-10 bg-red-500 opacity-30 dark:opacity-20 blur-3xl rounded-full"></div>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* MARQUEE SECTION */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg mt-32 md:mt-48">
          {/* Gradients for Marquee fading effect - updated for dark mode */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background z-10"></div>

          <Marquee pauseOnHover className="[--duration:30s]">
            {[
              "The Brave Little Toaster",
              "Adventures of Timmy the Turtle",
              "Princess Luna's Moon Quest",
              "The Magic Treehouse",
              "Space Explorer Rex",
              "The Sleepy Fox's Lullaby"
            ].map((title, i) => (
              <div key={i} className="mx-2 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md px-6 py-3 shadow-md transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:shadow-lg">
                <span className="text-lg font-medium text-foreground">{title}</span>
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:35s] mt-4">
            {[
              "Bedtime Stories",
              "Educational Tales",
              "Sci-Fi Adventures",
              "Fairy Tales",
              "Animal Fables",
              "Mystery Journeys"
            ].map((theme, i) => (
              <div key={i} className="mx-2 flex items-center justify-center rounded-full border border-black/5 dark:border-white/5 bg-transparent px-6 py-3 transition-all hover:bg-black/5 dark:hover:bg-white/5">
                <span className="text-lg font-medium text-black/50 dark:text-white/50">{theme}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* SECTION 4: CALL TO ACTION (Reiterated) */}
        <div className="mt-32 pt-12 text-center md:mt-48 pb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          <h2 className="mb-6 text-5xl md:text-6xl font-black">Ready for an Adventure?</h2>
          <p className="text-black/60 dark:text-white/60 mx-auto max-w-2xl text-center text-xl mb-12">
            Join thousands of parents and children creating unforgettable stories
            every day.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/login" className="group relative">
              <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"></div>
              <Button variant="default" size="lg" className="relative h-16 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 px-10 text-xl font-bold uppercase tracking-wide">
                Start Your Story Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
