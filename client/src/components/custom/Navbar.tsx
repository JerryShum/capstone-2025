import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import logo from "/story_weaver_logo_2.svg";

export default function Navbar() {
  return (
    <header className="bg-background/50 backdrop-blur-xl sticky top-0 z-50 flex h-16 items-center border-b border-border/50 px-4 lg:px-6">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img className="w- h-10" src={logo} />
          <span className="text-2xl font-bold">StoryWeaver</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            How it Works
          </Link>
        </nav>
      </div>

      {/* Right Side: Navigation Links and Action Buttons */}
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {/* Separator (optional) */}
        <div className="bg-border mx-2 h-6 w-px"></div>

        <ModeToggle />

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
