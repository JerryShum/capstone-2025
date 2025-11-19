import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import AIlandscape from "@/assets/AIlandscape.jpg";
import { Link } from "@tanstack/react-router";
// Updated icons to be more story-focused
import { Sparkles, PenTool, Film } from "lucide-react";

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
      {/* SECTION 1: HERO */}
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Column 1: Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl leading-tight font-semibold md:text-6xl">
            Weave{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              magical, animated
            </span>{" "}
            stories for your child.
          </h1>
          <h2 className="text-muted-foreground text-2xl">
            Just add a spark of imagination. Our AI helps you generate,
            illustrate, and animate a unique tale in minutes.
          </h2>
          <div className="mt-4">
            <Link to="/create">
              {/* UPDATED CTA */}
              <Button variant="default" size="lg" className="text-lg">
                Start Weaving
              </Button>
            </Link>
          </div>
        </div>

        {/* Column 2: Visual Content */}
        <div>
          <img
            src={AIlandscape}
            alt="A magical AI-generated landscape"
            className="mx-auto h-auto w-full max-w-4xl rounded-lg shadow-2xl transition-all duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      {/* SECTION 2: FEATURES (Now with updated, kid-focused text) */}
      <div className="mt-24 pt-12 md:mt-32">
        <h2 className="mb-4 text-center text-4xl font-semibold">
          Your Personal Story Studio
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
          Story Weaver makes it easy to create a brand-new adventure every
          night.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-semibold">Your Magical Co-Creator</h3>
            <p className="text-muted-foreground">
              Our friendly AI helps you dream up new worlds, lovable characters,
              and exciting plots. No more writer's block!
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <PenTool className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-semibold">Endless Adventures</h3>
            <p className="text-muted-foreground">
              From sleepy bunnies to brave astronauts, you can create a
              brand-new story every time. The only limit is your imagination.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-600">
              <Film className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-semibold">Bring Stories to Life</h3>
            <p className="text-muted-foreground">
              Go beyond just text. Generate beautiful illustrations and simple,
              charming animations to make storytime unforgettable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
