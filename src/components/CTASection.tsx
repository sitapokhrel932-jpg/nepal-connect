import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="container-tight section-padding">
        <div className={`relative rounded-3xl overflow-hidden ${visible ? "animate-reveal-up" : "opacity-0"}`}
          style={{ background: "var(--hero-gradient)" }}
        >
          <div className="relative px-8 py-14 sm:px-14 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground mb-4">
              Ready to Get Things Fixed?
            </h2>
            <p className="text-base text-primary-foreground/80 max-w-md mx-auto mb-8 leading-relaxed">
              Join thousands of Nepalis who trust SewaHub for their home service needs. Book your first service today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="hero" size="lg" className="rounded-xl text-base gap-2 h-12 px-8" asChild>
                <Link to="/signup">
                  Book a Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="rounded-xl text-base h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/signup">Register as Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
