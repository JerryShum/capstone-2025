import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import star from "/star.svg";

export default function Navbar() {
  return (
    <header className="bg-background flex h-16 items-center border-b px-4 lg:px-6">
      {/* Left Side: Logo/Icon */}
      <Link to="/" className="flex items-start justify-center gap-2">
        <img src={star} className="h-[24px] w-[24px]" />
        <span className="font-serif text-2xl">StoryWeaver</span>
      </Link>

      {/* Right Side: Navigation Links and Action Buttons */}
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          to="/create"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          Create
        </Link>
        <Link
          to="/dashboard"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/about"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          About
        </Link>

        {/* Separator (optional) */}
        <div className="bg-border mx-2 h-6 w-px"></div>

        <Link to="/login" className="hover:cursor-pointer">
          <Button variant="ghost">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </nav>
    </header>
  );
}
