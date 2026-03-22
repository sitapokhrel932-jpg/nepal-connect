import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wrench } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container-tight section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              SewaHub
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button variant="hero" size="sm">Get Started</Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted active:scale-95 transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              <a href="#services" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">Services</a>
              <a href="#how-it-works" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">How It Works</a>
              <a href="#pricing" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">Pricing</a>
              <div className="flex gap-2 mt-2 px-3">
                <Button variant="ghost" size="sm" className="flex-1">Log In</Button>
                <Button variant="hero" size="sm" className="flex-1">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
