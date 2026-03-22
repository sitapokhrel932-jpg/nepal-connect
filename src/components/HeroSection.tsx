import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown, Search } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const cities = [
  "Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur", "Biratnagar",
  "Birgunj", "Dharan", "Butwal", "Hetauda", "Nepalgunj"
];

const HeroSection = () => {
  const [selectedCity, setSelectedCity] = useState("Kathmandu");
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
      
      <div className="container-tight section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="animate-reveal-up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-6">
                <MapPin className="w-3 h-3" />
                Nepal's Trusted Service Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight mb-5 animate-reveal-up stagger-1">
              Book Skilled Workers
              <br />
              <span className="text-gradient-primary">Near You, Instantly</span>
            </h1>

            <p className="text-lg leading-relaxed max-w-md mb-8 animate-reveal-up stagger-2">
              From plumbers to electricians — find trusted local service providers, set your own price, and get help when you need it.
            </p>

            {/* City selector + Search */}
            <div className="flex flex-col sm:flex-row gap-3 animate-reveal-up stagger-3">
              {/* City dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-surface-card text-sm font-medium hover:border-primary/30 transition-colors active:scale-[0.98] w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  {selectedCity}
                  <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
                </button>
                {cityOpen && (
                  <div className="absolute top-full mt-2 left-0 w-48 bg-surface-card border border-border rounded-xl shadow-xl z-20 py-1 animate-fade-in">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => { setSelectedCity(city); setCityOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                          city === selectedCity ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="hero" size="lg" className="h-12 px-6 rounded-xl text-base gap-2">
                <Search className="w-4 h-4" />
                Find Services
              </Button>
            </div>

            {/* Trust stats */}
            <div className="flex items-center gap-6 mt-10 animate-reveal-up stagger-4">
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">2,400+</p>
                <p className="text-xs text-muted-foreground">Service Providers</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">18,000+</p>
                <p className="text-xs text-muted-foreground">Jobs Completed</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">4.8</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-reveal-up stagger-2 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src={heroImage}
                alt="Skilled service provider helping a customer in Nepal"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 bg-surface-card rounded-xl p-4 shadow-lg border border-border/50 animate-slide-in-left stagger-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-success text-lg">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Booking Confirmed!</p>
                  <p className="text-xs text-muted-foreground">Electrician arriving in 25 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
