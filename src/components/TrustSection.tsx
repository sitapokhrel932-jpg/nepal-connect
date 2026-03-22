import { Shield, Clock, Banknote, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Shield,
    title: "Verified Providers",
    desc: "Every service provider is background-checked and skill-verified before joining.",
  },
  {
    icon: Banknote,
    title: "You Set the Price",
    desc: "Propose your budget. Providers accept, reject, or counter — transparent and fair.",
  },
  {
    icon: Clock,
    title: "Instant or Scheduled",
    desc: "Need help now? Or want to book for later? Both options available.",
  },
  {
    icon: Users,
    title: "Local & Reliable",
    desc: "Connect with skilled workers in your city who understand local needs.",
  },
];

const TrustSection = () => {
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
    <section id="pricing" className="py-20 md:py-28" ref={ref}>
      <div className="container-tight section-padding">
        <div className={`text-center max-w-lg mx-auto mb-14 ${visible ? "animate-reveal-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Why Choose SewaHub?
          </h2>
          <p className="text-base leading-relaxed">
            Built for Nepal, trusted by thousands of customers and providers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className={`flex gap-4 p-5 rounded-2xl border border-border/50 bg-surface-card hover:shadow-md hover:shadow-primary/5 transition-shadow duration-300
                ${visible ? `animate-reveal-up stagger-${i + 1}` : "opacity-0"}`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <feat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{feat.title}</h3>
                <p className="text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
