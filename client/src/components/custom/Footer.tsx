import { Link } from "@tanstack/react-router";
import logo from "/story_weaver_logo_2.svg";

export default function Footer() {
  return (
    <footer className="bg-background/50 backdrop-blur-xl border-t border-border/50 px-6 py-8 md:py-10">
      <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Logo and Copyright */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img className="h-10" src={logo} alt="StoryWeaver Logo" />
            <span className="text-foreground text-2xl font-bold">
              StoryWeaver
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StoryWeaver. All rights reserved.
          </p>
        </div>

        {/* Navigation Column 1 */}
        <div className="col-span-1 flex flex-col items-start gap-2">
          <h4 className="text-foreground text-lg font-semibold">Explore</h4>
          <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            About Us
          </Link>
        </div>

        {/* Navigation Column 2 */}
        <div className="col-span-1 flex flex-col items-start gap-2">
          <h4 className="text-foreground text-lg font-semibold">Support</h4>
          <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            Contact
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            FAQ
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
