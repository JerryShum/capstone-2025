import { Link } from "@tanstack/react-router";
import { Mountain } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="bg-background flex h-16 items-center border-b px-4 lg:px-6">
      {/* Left Side: Logo/Icon */}
      <Link to="/" className="flex items-center justify-center">
        <Mountain className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
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

        <Button variant="ghost">
          <Link to="/login">Log In</Link>
        </Button>
        <Button>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </nav>
    </header>
  );
}
