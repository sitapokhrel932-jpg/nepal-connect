import { Search, MessageSquare, CheckCircle, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: Search,
    title: "Choose a Service",
    desc: "Select what you need — plumber, electrician, mechanic, and more.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: MessageSquare,
    title: "Set Your Price",
    desc: "Propose a fair price. Providers can accept or negotiate — just like inDrive.",
    accent: "bg-accent/15 text-accent-foreground",
  },
  {
    icon: CheckCircle,
    title: "Get Matched",
    desc: "A nearby provider accepts your request and heads to your location.",
    accent: "bg-success/10 text-success",
  },
  {
    icon: Star,
    title: "Rate & Pay",
    desc: "Pay securely via eSewa, Khalti, or fonepay. Leave a review to help others.",
    accent: "bg-amber-50 text-amber-600",
  },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-primary/[0.03]" ref={ref}>
      <div className="container-tight section-padding">
        <div className={`text-center max-w-lg mx-auto mb-14 ${visible ? "animate-reveal-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How SewaHub Works
          </h2>
          <p className="text-base leading-relaxed">
            Four simple steps from booking to completion. No hassle, transparent pricing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative p-6 rounded-2xl bg-surface-card border border-border/50 
                ${visible ? `animate-reveal-up stagger-${i + 1}` : "opacity-0"}`}
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs font-bold text-muted-foreground/40 tabular-nums">
                0{i + 1}
              </span>
              <div className={`w-11 h-11 rounded-xl ${step.accent} flex items-center justify-center mb-4`}>
                <step.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
