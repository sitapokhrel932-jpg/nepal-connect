import { 
  Wrench, Zap, Droplets, Hammer, Paintbrush, Wind,
  Monitor, Truck
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  { icon: Wrench, label: "Mechanic", desc: "Vehicle & appliance repair", color: "bg-blue-50 text-blue-600" },
  { icon: Droplets, label: "Plumber", desc: "Pipes, taps & leaks", color: "bg-cyan-50 text-cyan-600" },
  { icon: Zap, label: "Electrician", desc: "Wiring & installations", color: "bg-amber-50 text-amber-600" },
  { icon: Hammer, label: "Carpenter", desc: "Furniture & woodwork", color: "bg-orange-50 text-orange-600" },
  { icon: Paintbrush, label: "Painter", desc: "Interior & exterior", color: "bg-rose-50 text-rose-600" },
  { icon: Wind, label: "AC Repair", desc: "Servicing & installation", color: "bg-sky-50 text-sky-600" },
  { icon: Monitor, label: "IT Support", desc: "Computer & network", color: "bg-violet-50 text-violet-600" },
  { icon: Truck, label: "Movers", desc: "Shifting & transport", color: "bg-emerald-50 text-emerald-600" },
];

const ServicesSection = () => {
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
    <section id="services" className="py-20 md:py-28" ref={ref}>
      <div className="container-tight section-padding">
        <div className={`text-center max-w-lg mx-auto mb-14 ${visible ? "animate-reveal-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What Do You Need Help With?
          </h2>
          <p className="text-base leading-relaxed">
            Browse from our growing list of skilled service categories across Nepal.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <button
              key={service.label}
              className={`group flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface-card border border-border/50 
                hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 
                active:scale-[0.97] transition-all duration-200 cursor-pointer
                ${visible ? `animate-reveal-up stagger-${i + 1}` : "opacity-0"}`}
            >
              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center 
                group-hover:scale-110 transition-transform duration-200`}>
                <service.icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{service.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{service.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
