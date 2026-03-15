import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import logo from "/story_weaver_logo_2.svg";
import { Menu, Sparkles, X, User } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="bg-background/50 border-border/50 sticky top-0 z-50 border-b backdrop-blur-xl">
      {/* Main bar */}
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <img className="h-10" src={logo} alt="StoryWeaver Logo" />
          <span className="text-2xl font-bold">StoryWeaver</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="ml-6 hidden items-center gap-4 sm:gap-6 md:flex">
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
        <nav className="ml-auto hidden items-center gap-4 sm:gap-6 md:flex">
          <div className="bg-border mx-2 h-6 w-px" />
          <ModeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <User className="text-primary h-4 w-4" />
                Hello,{" "}
                <span className="text-foreground font-bold">{user.name}</span>
              </span>
              <a href={import.meta.env.VITE_STUDIO_URL}>
                <Button
                  variant="outline"
                  className="border-primary/20 hover:border-primary/50 gap-2 transition-all"
                >
                  <Sparkles className="text-primary h-4 w-4" />
                  Dashboard
                </Button>
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.reload();
                      },
                    },
                  })
                }
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:cursor-pointer">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Right side — mobile: theme toggle + hamburger */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
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
        <div className="border-border/50 bg-background/95 flex flex-col gap-4 border-t px-4 py-6 backdrop-blur-xl md:hidden">
          <Link
            to="/"
            className="text-foreground hover:text-primary py-1 text-base font-medium transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-foreground hover:text-primary py-1 text-base font-medium transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            className="text-foreground hover:text-primary py-1 text-base font-medium transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            How it Works
          </Link>

          <div className="bg-border my-1 h-px w-full" />

          {user ? (
            <div className="flex flex-col gap-4">
              <div className="border-border/50 mb-2 flex items-center gap-2 border-b pb-4">
                <span className="text-base font-medium">
                  Hello, <span className="font-bold">{user.name}</span>
                </span>
              </div>
              <a href={import.meta.env.VITE_STUDIO_URL} className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2"
                >
                  <Sparkles className="text-primary h-4 w-4 hover:cursor-pointer" />
                  Dashboard
                </Button>
              </a>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-destructive w-full justify-start"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        setMobileOpen(false);
                        window.location.reload();
                      },
                    },
                  })
                }
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="flex-1"
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link
                to="/signup"
                className="flex-1"
                onClick={() => setMobileOpen(false)}
              >
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
