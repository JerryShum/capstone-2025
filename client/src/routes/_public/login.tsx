import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from '@shared/schemas/loginSchema'

export const Route = createFileRoute("/_public/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onChange: loginSchema,
    },
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          // Check if there's a redirect query parameter
          const searchParams = new URLSearchParams(window.location.search);
          const redirectUrl = searchParams.get("redirect");

          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            // Default to the Studio dashboard
            window.location.href = import.meta.env.VITE_STUDIO_URL;
          }
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Login failed");
        },
      },
    );

    setLoading(false);
  };

  const handleGithubLogin = async () => {
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
          setError(ctx.error.message || "GitHub login failed");
        },
      },
    );
  };

  const handleGoogleLogin = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = searchParams.get("redirect");
    const callbackURL = redirectUrl || window.location.origin;

    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: callbackURL,
      },
      {
        onError: (ctx) => {
          setError(ctx.error.message || "Google login failed");
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
        color="#8b5cf6"
        refresh
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 z-0 h-[min(500px,80vw)] w-[min(500px,80vw)] rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/20" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 z-0 h-[min(400px,80vw)] w-[min(400px,80vw)] rounded-full bg-purple-500/10 blur-[110px] dark:bg-purple-500/20" />

      {/* Card */}
      <BlurFade delay={0.15} offset={30} className="z-10 w-full max-w-md">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-2xl backdrop-blur-3xl md:p-10 dark:border-white/10 dark:bg-black/40">
          {/* Inner top glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="text-foreground mb-5 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-purple-500" />
              Story Weaver Beta
            </div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              Welcome Back
            </h1>
            <p className="text-sm text-black/60 dark:text-white/50">
              Sign in to continue your magical stories
            </p>
          </div>

          {/* Social Buttons */}
          <div className="mb-6 flex flex-col gap-3">
            <Button
              variant="outline"
              size="lg"
              className="text-foreground w-full rounded-xl border-black/10 bg-black/5 font-medium transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              onClick={handleGithubLogin}
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-foreground w-full rounded-xl border-black/10 bg-black/5 font-medium transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              onClick={handleGoogleLogin}
            >
              <svg
                viewBox="0 0 48 48"
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Continue with Google
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
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <form.Field
                name="email"
                children={(field) => {
                  return <Field className="gap-1.5">
                    <FieldLabel htmlFor="email" className="text-sm font-medium">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      name="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-11 rounded-xl border-black/10 bg-black/5 focus:ring-2 focus:ring-purple-500/30 dark:border-white/10 dark:bg-white/5"
                    />
                    <FieldError>
                      {field.state.meta.errors ? <p className="text-red-500">{field.state.meta.errors.join(",")}</p> : null}
                    </FieldError>
                  </Field>
                }}>


              </form.Field>
              <form.Field
                name="password"
                children={(field) => {
                  return (
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="password" className="text-sm font-medium">
                        Password
                      </FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11 rounded-xl border-black/10 bg-black/5 focus:ring-2 focus:ring-purple-500/30 dark:border-white/10 dark:bg-white/5"
                      />
                      <FieldError>
                        {field.state.meta.errors ? <p className="text-red-500">{field.state.meta.errors.join(",")}</p> : null}
                      </FieldError>
                    </Field>
                  )
                }}>

              </form.Field>
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
                {loading ? "Authenticating..." : "Login"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-black/50 dark:text-white/40">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-purple-600 underline underline-offset-2 transition-colors hover:text-purple-500 dark:text-purple-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
