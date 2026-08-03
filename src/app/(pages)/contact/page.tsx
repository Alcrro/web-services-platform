import ContactForm from "@/components/molecules/contact/ContactForm";
import ContactHero from "@/components/molecules/contact/ContactHero";
import ContactInfo from "@/components/molecules/contact/ContactInfo";
import ContactTrust from "@/components/molecules/contact/ContactTrust";
import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { buildSEO } from "@/lib/seo/seo.utils";
import { contactPageData } from "@/shared/data/consts/contactPage/contactPageData";
import { contactSEO } from "@/shared/data/seo/contactSEO";
import { Metadata } from "next";

export async function getMetadata(): Promise<Metadata> {
  return {
    ...buildSEO(contactSEO),
  };
}
const page = () => {
  const { hero, form, contactInfo, trust } = contactPageData;
  return (
    <DefaultLayout>
      <main className="flex flex-col gap-12 py-6">
        <section aria-labelledby="contact-hero">
          <ContactHero hero={hero} />
        </section>

        <section aria-labelledby="contact-trust">
          <ContactTrust trust={trust} />
        </section>

        <section
          aria-label="Contact form and info"
          id="form"
          className="scroll-mt-5 mx-auto w-full max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr] lg:items-stretch">
            <div className="h-full">
              <ContactForm form={form} />
            </div>
            <div className="h-full">
              <ContactInfo info={contactInfo} />
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default page;
