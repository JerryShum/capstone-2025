import { Link } from "@tanstack/react-router";
import logo from "/story_weaver_logo_2.svg";

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t p-6">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Logo and Copyright */}
        <div className="col-span-1 flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img className="h-10" src={logo} alt="StoryWeaver Logo" />
            <span className="text-foreground text-2xl font-bold">
              StoryWeaver
            </span>
          </Link>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} StoryWeaver. All rights reserved.
          </p>
        </div>

        {/* Navigation Column 1 */}
        <div className="col-span-1 flex flex-col items-start gap-2">
          <h4 className="text-foreground text-lg font-semibold">Explore</h4>
          <Link to="/create" className="hover:text-primary text-sm">
            Create Story
          </Link>
          <Link to="/dashboard" className="hover:text-primary text-sm">
            Dashboard
          </Link>
          <Link to="/about" className="hover:text-primary text-sm">
            About Us
          </Link>
        </div>

        {/* Navigation Column 2 (Example) */}
        <div className="col-span-1 flex flex-col items-start gap-2">
          <h4 className="text-foreground text-lg font-semibold">Support</h4>
          <Link to="/contact" className="hover:text-primary text-sm">
            Contact
          </Link>
          <Link to="/faq" className="hover:text-primary text-sm">
            FAQ
          </Link>
          <Link to="/terms" className="hover:text-primary text-sm">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
