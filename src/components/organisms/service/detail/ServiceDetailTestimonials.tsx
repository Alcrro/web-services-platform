import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Andrei Mihai",
    role: "Founder, TechStartup",
    text: "Livrare rapidă, cod curat și comunicare excelentă pe tot parcursul proiectului. Exact ce aveam nevoie.",
    rating: 5,
  },
  {
    name: "Elena Popescu",
    role: "CEO, DesignStudio",
    text: "Site-ul arată profesional și se încarcă instant. Clienții mei au observat imediat diferența față de varianta veche.",
    rating: 5,
  },
  {
    name: "Mihai Ionescu",
    role: "Owner, E-commerce RO",
    text: "Magazinul online e stabil, ușor de gestionat și integrarea cu Stripe a mers perfect din prima zi.",
    rating: 5,
  },
];

const ServiceDetailTestimonials = () => {
  return (
    <section className="py-16 border-t border-(--color-border)">
      <h2 className="text-2xl font-bold text-(--color-text) mb-2 text-center">
        What clients say
      </h2>
      <p className="text-sm text-(--color-text-secondary) text-center mb-10">
        Real feedback from real projects.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col gap-4 p-5 rounded-2xl border border-(--color-border) bg-(--color-bg-section)"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-(--color-text) leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
            <div>
              <p className="text-sm font-semibold text-(--color-text)">{t.name}</p>
              <p className="text-xs text-(--color-text-secondary)">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceDetailTestimonials;
