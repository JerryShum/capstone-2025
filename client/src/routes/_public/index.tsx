import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import AIlandscape from "@/assets/AIlandscape.jpg";
import { Link } from "@tanstack/react-router";
import { Sparkles, PenTool, Film } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";
import { authClient } from "@/lib/auth-client";

const features = [
  {
    Icon: Sparkles,
    name: "Your Magical Co-Creator",
    description:
      "Our friendly AI helps you dream up new worlds, lovable characters, and exciting plots.",
    href: "/login",
    cta: "Start generating",
    background: (
      <div className="absolute -top-10 -right-10 text-blue-500 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40">
        <Sparkles className="h-64 w-64" />
      </div>
    ),
    className:
      "col-span-3 lg:col-span-1 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300",
  },
  {
    Icon: PenTool,
    name: "Endless Adventures",
    description:
      "From sleepy bunnies to brave astronauts, create a brand-new story every time. The only limit is your imagination.",
    href: "/login",
    cta: "Start writing",
    background: (
      <div className="absolute -top-10 -right-10 text-purple-500 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40">
        <PenTool className="h-64 w-64" />
      </div>
    ),
    className:
      "col-span-3 lg:col-span-1 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300",
  },
  {
    Icon: Film,
    name: "Bring Stories to Life",
    description:
      "Go beyond just text. Generate beautiful illustrations and simple, charming animations to make storytime unforgettable.",
    href: "/login",
    cta: "Start animating",
    background: (
      <div className="absolute -top-10 -right-10 text-pink-500 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40">
        <Film className="h-64 w-64" />
      </div>
    ),
    className:
      "col-span-3 lg:col-span-1 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300",
  },
];

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const studioUrl = import.meta.env.DEV ? "http://localhost:5173" : "/studio";

  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden border-b">
        <Particles
          className="absolute inset-0 z-0 h-full w-full"
          quantity={100}
          ease={80}
          staticity={20}
          vx={0.2}
          vy={0.2}
          color="#3b82f6"
          refresh
        />

        <div className="relative z-10 container mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
          {/* Pill Badge */}
          <BlurFade delay={0.1} offset={10}>
            <div className="text-foreground mx-auto mb-6 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium shadow-[0_0_2rem_-0.5rem_#0003] backdrop-blur-xl transition-all hover:bg-black/10 hover:shadow-[0_0_2.5rem_-0.5rem_#0005] sm:px-5 sm:py-2 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_2rem_-0.5rem_#fff8] dark:hover:bg-white/10 dark:hover:shadow-[0_0_2.5rem_-0.5rem_#fff8]">
              <Sparkles className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text font-bold text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 dark:font-medium">
                Introducing Story Weaver Beta!
              </span>
            </div>
          </BlurFade>

          {/* Headline */}
          <BlurFade delay={0.2} offset={20}>
            <h1 className="mx-auto mb-4 max-w-4xl text-3xl font-extrabold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Weave{" "}
              <TypingAnimation
                className="inline-block bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                duration={50}
                delay={300}
                as="span"
              >
                magical, animated
              </TypingAnimation>
              <br className="hidden sm:block" /> stories for any child.
            </h1>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={0.3} offset={20}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/70 sm:mt-6 sm:text-lg md:text-xl dark:text-white/70">
              Just add a spark of imagination. Our tools help you generate,
              illustrate, and animate a unique tale in minutes, creating
              memories & lessons that last a lifetime.
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.4} offset={20}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
              {user ? (
                <a
                  href={studioUrl}
                  className="group relative w-full sm:w-auto"
                >
                  <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"></div>
                  <Button
                    variant="default"
                    size="lg"
                    className="relative h-12 w-full rounded-full bg-black px-8 text-base font-bold tracking-wide text-white shadow-xl hover:cursor-pointer hover:bg-black/90 sm:h-14 sm:w-auto sm:text-lg dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Return to Studio
                  </Button>
                </a>
              ) : (
                <Link to="/login" className="group relative w-full sm:w-auto">
                  <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"></div>
                  <Button
                    variant="default"
                    size="lg"
                    className="relative h-12 w-full rounded-full bg-black px-8 text-base text-white shadow-xl hover:bg-black/90 sm:h-14 sm:w-auto sm:text-lg dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Start Weaving Free
                  </Button>
                </Link>
              )}
              <Link to="/about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-foreground h-12 w-full rounded-full border-black/20 bg-black/5 px-8 text-base backdrop-blur-md hover:cursor-pointer hover:bg-black/10 sm:h-14 sm:w-auto sm:text-lg dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  How it works
                </Button>
              </Link>
            </div>
          </BlurFade>

          {/* Visual Content (Featured Image) */}
          <BlurFade delay={0.6} offset={40}>
            <div className="mx-auto mt-14 w-full max-w-5xl perspective-[1000px] sm:mt-20 md:mt-28">
              <div className="bg-background/50 relative rotate-x-2 rounded-2xl border p-2 shadow-2xl backdrop-blur-sm transition-transform duration-700 ease-out hover:rotate-x-0 sm:p-4">
                <div className="bg-muted relative overflow-hidden rounded-xl border">
                  <img
                    src={AIlandscape}
                    alt="A magical AI-generated landscape"
                    className="w-full object-cover"
                  />
                  {/* Overlay gradient inside image frame */}
                  <div className="from-background/20 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent"></div>
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
        <div className="relative mt-20 sm:mt-28 md:mt-40 lg:mt-48">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[400px] w-[min(800px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"></div>
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Your Personal Story Studio
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-base text-black/60 sm:mb-16 sm:text-lg dark:text-white/60">
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
        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-black/10 bg-black/5 px-5 py-16 shadow-2xl backdrop-blur-3xl sm:mt-28 sm:rounded-[3rem] sm:px-8 sm:py-24 md:mt-40 lg:mt-48 dark:border-white/10 dark:bg-white/5">
          <GridPattern
            width={40}
            height={40}
            className="absolute inset-0 h-full w-full mask-[radial-gradient(ellipse_at_center,white,transparent_80%)] opacity-20"
          />

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-16 text-center sm:mb-24">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How the Magic Happens
              </h2>
              <p className="mx-auto max-w-2xl text-base text-black/60 sm:text-lg md:text-xl dark:text-white/60">
                It's as easy as 1, 2, 3 to create your child's next favorite
                story.
              </p>
            </div>

            <div className="space-y-20 sm:space-y-32">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-8 sm:gap-12 md:flex-row md:gap-20">
                <div className="flex-1 text-center md:text-right">
                  <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                    1. Tell Us Your Idea
                  </h3>
                  <p className="text-base leading-relaxed text-black/60 sm:text-lg dark:text-white/60">
                    Start with a character, a place, or a simple idea. Our AI
                    will help you brainstorm and build the perfect plot,
                    ensuring every adventure is tailored exactly how you want
                    it.
                  </p>
                </div>
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-black/10 bg-black/5 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] backdrop-blur-xl sm:h-40 sm:w-40 md:h-56 md:w-56 dark:border-white/10 dark:bg-white/5">
                  <Sparkles className="relative z-10 h-12 w-12 text-green-600 sm:h-16 sm:w-16 dark:text-green-400" />
                  <div className="absolute -inset-4 -z-10 rounded-full bg-green-500 opacity-30 blur-3xl dark:opacity-20"></div>
                </div>
                <div className="hidden flex-1 md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-8 sm:gap-12 md:flex-row-reverse md:gap-20">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                    2. Watch It Come Alive
                  </h3>
                  <p className="text-base leading-relaxed text-black/60 sm:text-lg dark:text-white/60">
                    Our AI generates beautiful illustrations and gentle
                    animations to match your story. We weave the text and art
                    together making every single page a breathtaking delight.
                  </p>
                </div>
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-black/10 bg-black/5 shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)] backdrop-blur-xl sm:h-40 sm:w-40 md:h-56 md:w-56 dark:border-white/10 dark:bg-white/5">
                  <PenTool className="relative z-10 h-12 w-12 text-yellow-600 sm:h-16 sm:w-16 dark:text-yellow-400" />
                  <div className="absolute -inset-4 -z-10 rounded-full bg-yellow-500 opacity-40 blur-3xl dark:opacity-20"></div>
                </div>
                <div className="hidden flex-1 md:block"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-8 sm:gap-12 md:flex-row md:gap-20">
                <div className="flex-1 text-center md:text-right">
                  <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                    3. Share and Enjoy
                  </h3>
                  <p className="text-base leading-relaxed text-black/60 sm:text-lg dark:text-white/60">
                    Read your new story together, save it to your personalized
                    library, or even print it out for a special keepsake. The
                    adventure never truly ends.
                  </p>
                </div>
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-black/10 bg-black/5 shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)] backdrop-blur-xl sm:h-40 sm:w-40 md:h-56 md:w-56 dark:border-white/10 dark:bg-white/5">
                  <Film className="relative z-10 h-12 w-12 text-red-600 sm:h-16 sm:w-16 dark:text-red-400" />
                  <div className="absolute -inset-4 -z-10 rounded-full bg-red-500 opacity-30 blur-3xl dark:opacity-20"></div>
                </div>
                <div className="hidden flex-1 md:block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* MARQUEE SECTION */}
        <div className="relative mt-20 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg sm:mt-28 md:mt-40 lg:mt-48">
          {/* Gradients for Marquee fading effect */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-linear-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-linear-to-l"></div>

          <Marquee pauseOnHover className="[--duration:30s]">
            {[
              "The Brave Little Toaster",
              "Adventures of Timmy the Turtle",
              "Princess Luna's Moon Quest",
              "The Magic Treehouse",
              "Space Explorer Rex",
              "The Sleepy Fox's Lullaby",
            ].map((title, i) => (
              <div
                key={i}
                className="mx-2 flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-5 py-2.5 shadow-md backdrop-blur-md transition-all hover:bg-black/10 hover:shadow-lg sm:px-6 sm:py-3 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <span className="text-foreground text-base font-medium sm:text-lg">
                  {title}
                </span>
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="mt-4 [--duration:35s]">
            {[
              "Bedtime Stories",
              "Educational Tales",
              "Sci-Fi Adventures",
              "Fairy Tales",
              "Animal Fables",
              "Mystery Journeys",
            ].map((theme, i) => (
              <div
                key={i}
                className="mx-2 flex items-center justify-center rounded-full border border-black/5 bg-transparent px-5 py-2.5 transition-all hover:bg-black/5 sm:px-6 sm:py-3 dark:border-white/5 dark:hover:bg-white/5"
              >
                <span className="text-base font-medium text-black/50 sm:text-lg dark:text-white/50">
                  {theme}
                </span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* SECTION 4: CALL TO ACTION (Reiterated) */}
        <div className="relative mt-20 pt-10 pb-16 text-center sm:mt-28 sm:pt-12 sm:pb-24 md:mt-40 lg:mt-48">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-[min(600px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]"></div>
          <h2 className="mb-4 text-3xl font-black sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Ready for an Adventure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-black/60 sm:mb-12 sm:text-xl dark:text-white/60">
            Join thousands of parents and children creating unforgettable
            stories every day.
          </p>
          <div className="mt-6 flex justify-center px-4 sm:mt-8">
            {user ? (
              <a
                href={studioUrl}
                className="group relative w-full sm:w-auto"
              >
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"></div>
                <Button
                  variant="default"
                  size="lg"
                  className="relative h-14 w-full rounded-full bg-black px-10 text-lg font-bold tracking-wide text-white uppercase hover:bg-black/90 sm:w-auto sm:text-xl dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Open Your Workspace
                </Button>
              </a>
            ) : (
              <Link to="/login" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"></div>
                <Button
                  variant="default"
                  size="lg"
                  className="relative h-14 w-full rounded-full bg-black px-10 text-lg font-bold tracking-wide text-white uppercase hover:bg-black/90 sm:w-auto sm:text-xl dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Start Your Story Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
