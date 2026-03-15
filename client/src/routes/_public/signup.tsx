import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AtSign, Cat, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () => {
          navigate({ to: "/login" });
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Signup failed");
        },
      },
    );

    setLoading(false);
  };

  const handleGithubSignup = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = searchParams.get("redirect");
    const callbackURL = redirectUrl || window.location.origin;

    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: callbackURL,
      },
      {
        onError: (ctx) => {
          setError(ctx.error.message || "GitHub signup failed");
        },
      },
    );
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-x-hidden px-4 py-16">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={60}
        ease={80}
        staticity={30}
        color="#3b82f6"
        refresh
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 z-0 h-[min(500px,80vw)] w-[min(500px,80vw)] rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/20" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 z-0 h-[min(400px,80vw)] w-[min(400px,80vw)] rounded-full bg-pink-500/10 blur-[110px] dark:bg-pink-500/20" />

      {/* Card */}
      <BlurFade delay={0.15} offset={30} className="z-10 w-full max-w-md">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-2xl backdrop-blur-3xl md:p-10 dark:border-white/10 dark:bg-black/40">
          {/* Inner top glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="text-foreground mb-5 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
              Story Weaver Beta
            </div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              Create an Account
            </h1>
            <p className="text-sm text-black/60 dark:text-white/50">
              Your adventure starts right here
            </p>
          </div>

          {/* Social Buttons */}
          <div className="mb-6 flex flex-col gap-3">
            <Button
              variant="outline"
              size="lg"
              className="text-foreground w-full rounded-xl border-black/10 bg-black/5 font-medium transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              onClick={handleGithubSignup}
            >
              <Cat className="mr-2 h-4 w-4" /> Sign up with GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-foreground w-full rounded-xl border-black/10 bg-black/5 font-medium transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <AtSign className="mr-2 h-4 w-4" /> Sign up with Google
            </Button>
          </div>

          <div className="relative my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="text-xs font-medium tracking-widest text-black/40 uppercase dark:text-white/40">
              or
            </span>
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          </div>

          {/* Fields */}
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-4">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="name" className="text-sm font-medium">
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-xl border-black/10 bg-black/5 focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border-black/10 bg-black/5 focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="password" className="text-sm font-medium">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl border-black/10 bg-black/5 focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
                />
              </Field>
            </div>

            {error && (
              <p className="mt-2 text-center text-xs text-red-500">{error}</p>
            )}

            {/* CTA */}
            <div className="group relative mt-6">
              <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />
              <Button
                disabled={loading}
                className="relative h-12 w-full rounded-xl bg-black text-base font-bold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-black/50 dark:text-white/40">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-500 dark:text-blue-400"
            >
              Log in
            </Link>
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
