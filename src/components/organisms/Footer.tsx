import Link from "next/link";
import { footerData, iconsMap } from "@/shared/data/consts/footer/footerData";
import FooterColumn from "../molecules/footer/FooterColumn";
import { IconType } from "react-icons/lib";

const Footer = () => {
  const year = 2025;

  const brand = footerData.find((d) => d.title === "alcrro");
  const navColumns = footerData.filter((d) =>
    ["services", "company"].includes(d.title)
  );
  const contact = footerData.find((d) => d.title === "contact");
  const socials = footerData.find((d) => d.title === "socials");

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">

        {/* Brand */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <span className="text-2xl font-bold uppercase tracking-wider text-(--color-text)">
            {brand?.title}
          </span>
          {brand?.description && (
            <p className="text-sm text-(--color-text-secondary) leading-relaxed max-w-sm">
              {brand.description}
            </p>
          )}
        </div>

        {/* Nav columns + Contact + Socials */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8">
          {navColumns.map((col) => (
            <FooterColumn key={col.id} item={col} />
          ))}

          {contact && (
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-(--color-text-secondary) mb-4">
                contact
              </p>
              {contact.children.map((item) => (
                <Link
                  key={item.id}
                  href={`mailto:${item.value}`}
                  className="text-base text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
                >
                  {item.value}
                </Link>
              ))}
            </div>
          )}

          {socials && (
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-(--color-text-secondary) mb-4">
                socials
              </p>
              <div className="flex gap-4 items-center justify-center">
                {socials.children.map((item) => {
                  const Icon = iconsMap[item.name] as IconType;
                  if (!Icon) return null;
                  return (
                    <Link
                      key={item.id}
                      href={item.link ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
                    >
                      <Icon size={18} aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-gray-200 dark:border-white/10">
          <span className="text-xs text-(--color-text-secondary)">
            © {year} Alcrro. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
