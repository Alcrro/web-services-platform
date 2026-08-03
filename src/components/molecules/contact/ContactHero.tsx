import { ContactHeroSection } from "@/shared/data/consts/contactPage/contactPageData";
import ContactButton from "../../atoms/buttons/ContactButton";
import ContactSubTitle from "../../atoms/contact/ContactSubTitle";
import ContactTitle from "../../atoms/contact/ContactTitle";

const ContactHero = ({ hero }: { hero: ContactHeroSection }) => {
  return (
    <>
      <style>{`
        @keyframes gradientBorder {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(24px, -28px) scale(1.25); opacity: 0.5; }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          50% { transform: translate(-18px, 22px) scale(0.8); opacity: 0.45; }
        }
        .hero-border-wrap {
          background: linear-gradient(
            135deg,
            var(--gradient-hero-from),
            var(--gradient-hero-to),
            var(--gradient-hero-from)
          );
          background-size: 200% 200%;
          animation: gradientBorder 5s ease-in-out infinite;
          padding: 2px;
          border-radius: 1rem;
        }
        .hero-inner {
          background: rgba(255, 255, 255, 0.80);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          --hero-text: rgba(15, 15, 25, 0.95);
          --hero-text-sub: rgba(15, 15, 25, 0.60);
          --hero-badge-bg: rgba(0, 0, 0, 0.07);
          --hero-badge-border: rgba(0, 0, 0, 0.12);
          --hero-badge-text: rgba(15, 15, 25, 0.70);
        }
        .dark .hero-inner {
          background: rgba(10, 10, 20, 0.82);
          --hero-text: rgba(255, 255, 255, 0.95);
          --hero-text-sub: rgba(255, 255, 255, 0.65);
          --hero-badge-bg: rgba(255, 255, 255, 0.10);
          --hero-badge-border: rgba(255, 255, 255, 0.18);
          --hero-badge-text: rgba(255, 255, 255, 0.82);
        }
      `}</style>

      <div className="hero-border-wrap relative w-full">
        <div className="hero-inner relative w-full overflow-hidden rounded-[calc(1rem-2px)] px-4 py-16 sm:py-24">
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "var(--gradient-hero-from)", animation: "orbFloat1 8s ease-in-out infinite" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "var(--gradient-hero-to)", animation: "orbFloat2 6s ease-in-out infinite" }}
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="flex flex-col items-center gap-6 px-8 py-10 text-center sm:px-14 sm:py-14">
              <span
                className="anim-scale-in inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
                style={{
                  background: "var(--hero-badge-bg)",
                  border: "1px solid var(--hero-badge-border)",
                  color: "var(--hero-badge-text)",
                }}
              >
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Available for projects
              </span>

              <div className="anim-fade-up anim-delay-100" style={{ color: "var(--hero-text)" }}>
                <ContactTitle title={hero.title} />
              </div>

              <div className="anim-fade-up anim-delay-200 max-w-lg" style={{ color: "var(--hero-text-sub)" }}>
                <ContactSubTitle subTitle={hero.subtitle} />
              </div>

              <div className="anim-fade-up anim-delay-350">
                <ContactButton cta={hero.cta} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactHero;
