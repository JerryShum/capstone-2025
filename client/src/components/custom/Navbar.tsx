import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import logo from "/story_weaver_logo_2.svg";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-background/50 backdrop-blur-xl sticky top-0 z-50 border-b border-border/50">
      {/* Main bar */}
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <img className="h-10" src={logo} alt="StoryWeaver Logo" />
          <span className="text-2xl font-bold">StoryWeaver</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-4 sm:gap-6 ml-6">
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

        {/* Right side — desktop */}
        <nav className="hidden md:flex ml-auto items-center gap-4 sm:gap-6">
          <div className="bg-border mx-2 h-6 w-px" />
          <ModeToggle />
          <Link to="/login" className="hover:cursor-pointer">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>

        {/* Right side — mobile: theme toggle + hamburger */}
        <div className="flex md:hidden ml-auto items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-6 flex flex-col gap-4">
          <Link
            to="/"
            className="text-foreground hover:text-primary text-base font-medium transition-colors py-1"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-foreground hover:text-primary text-base font-medium transition-colors py-1"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            className="text-foreground hover:text-primary text-base font-medium transition-colors py-1"
            onClick={() => setMobileOpen(false)}
          >
            How it Works
          </Link>

          <div className="bg-border h-px w-full my-1" />

          <div className="flex gap-3">
            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full">
                Log In
              </Button>
            </Link>
            <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
