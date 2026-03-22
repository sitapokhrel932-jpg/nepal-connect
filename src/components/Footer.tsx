import { Wrench } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-surface-card">
      <div className="container-tight section-padding py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Wrench className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-foreground">SewaHub</span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs">
              Nepal's trusted marketplace connecting customers with skilled local service providers.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Services</h4>
            <ul className="space-y-2">
              {["Plumber", "Electrician", "Mechanic", "Carpenter", "Painter"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Become a Provider", "Blog", "Careers"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 SewaHub. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
