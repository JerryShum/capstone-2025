import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AtSign, Cat } from "lucide-react";

export const Route = createFileRoute("/(general)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <Card className="w-full max-w-96">
        <CardHeader className="text-center">
          <CardTitle className="text-primary text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" size="lg" className="w-full">
            <Cat className="" /> Login with Github
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            <AtSign /> Login with Google
          </Button>
        </CardContent>

        <div className="mx-auto w-3/4">
          <FieldSeparator>Or continue with</FieldSeparator>
        </div>

        <CardFooter className="flex-col gap-6">
          <Field className="gap-1">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="user@example.com"
              type="email"
              disabled
            />
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              disabled
            />
          </Field>
          <Button className="w-full">Login</Button>
          <div className="flex gap-1">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account?
            </p>

            <Link
              to="/signup"
              className="text-muted-foreground text-sm underline hover:brightness-75"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
