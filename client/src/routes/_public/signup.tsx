import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AtSign, Cat, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { useMutation } from "@tanstack/react-query"

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});


type SignupCredentials = {
  [k: string]: FormDataEntryValue;
};

function RouteComponent() {

  const navigate = useNavigate();

  const mutation = useMutation<any, Error, SignupCredentials>({
    mutationFn: async (credentials) => {
      const res = await fetch ("/api/login/addUser", {
        method: "POST",
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify(credentials),
      })
      return res.json();
    },
    onSuccess: (data) => {
        console.log("Signup processed",data)
        navigate({ to: "/login" }) // later should change to route to the page with user's videos
    },
  });

    // event handler:  sends the data to mutationFn
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    mutation.mutate(data); 
  };
  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)] flex-col items-center justify-center relative overflow-x-hidden px-4 py-16">
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
      <div className="absolute top-1/4 left-1/4 w-[min(500px,80vw)] h-[min(500px,80vw)] bg-blue-500/10 dark:bg-blue-500/20 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[min(400px,80vw)] h-[min(400px,80vw)] bg-pink-500/10 dark:bg-pink-500/20 blur-[110px] rounded-full pointer-events-none z-0" />

      {/* Card */}
      <BlurFade delay={0.15} offset={30} className="z-10 w-full max-w-md">
        <div className="relative rounded-[2rem] border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-3xl shadow-2xl overflow-hidden p-8 md:p-10">
          {/* Inner top glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur-xl mb-5">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
              Story Weaver Beta
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Create an Account</h1>
            <p className="text-sm text-black/60 dark:text-white/50">Your adventure starts right here</p>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <Button variant="outline" size="lg" className="w-full rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground font-medium transition-all">
              <Cat className="mr-2 h-4 w-4" /> Sign up with GitHub
            </Button>
            <Button variant="outline" size="lg" className="w-full rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground font-medium transition-all">
              <AtSign className="mr-2 h-4 w-4" /> Sign up with Google
            </Button>
          </div>

          <div className="relative flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            <span className="text-xs font-medium text-black/40 dark:text-white/40 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
          </div>

          {/* Fields */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="name" className="text-sm font-medium">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="name"
                  type="name"
                  className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 focus:ring-2 focus:ring-blue-500/30 h-11"
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="age" className="text-sm font-medium">Age</FieldLabel>
                <Input
                  id="age"
                  name="age"
                  placeholder="age"
                  type="age"
                  className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 focus:ring-2 focus:ring-blue-500/30 h-11"
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="email" className="text-sm font-medium">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                  className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 focus:ring-2 focus:ring-blue-500/30 h-11"
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="password" className="text-sm font-medium">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 focus:ring-2 focus:ring-blue-500/30 h-11"
                />
              </Field>
            </div>

          {/* CTA */}
          <div className="relative group mt-6">
              <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />
              <Button className="relative w-full rounded-xl h-12 bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-bold text-base">
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-black/50 dark:text-white/40">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-500 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
