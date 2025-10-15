import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
//import star from "/star.svg";
//import { Book } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-background flex h-16 items-center border-b px-4 lg:px-6">
      {/* Left Side: Logo/Icon */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6" />
          <span className="text-2xl font-bold">StoryWeaver</span>
        </Link>
        {/* rearranging the buttons*/}
        <nav className="flex items-center gap-4 sm:gap-6">
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
        </nav>
      </div>

      {/* Right Side: Navigation Links and Action Buttons */}
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
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
