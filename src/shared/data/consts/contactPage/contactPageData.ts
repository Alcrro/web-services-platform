import { serviceNames } from "@/modules/services/domain/types/service.types";

export const contactPageData: ContactPageData = {
  hero: {
    title: "Contact Us",
    subtitle:
      "Let’s talk about your software project and find the best solution together.",
    cta: "Send a Message",
  },
  form: {
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: false },
      {
        name: "service",
        label: "Service Type",
        type: "select",
        options: serviceNames,
        required: true,
      },
      {
        name: "message",
        label: "Your Message",
        type: "textarea",
        required: false,
      },
    ],
    submitText: "Send Message",
    note: "We’ll reply within 24 hours.",
  },
  contactInfo: {
    email: "contact@your-company.com",
    phone: "+40 712 345 678",
    address: "123 Example Street, Bucharest, Romania",
    workHours: "Monday – Friday, 3:00 PM – 6:00 PM",
  },
  socials: {
    whatsapp: "https://wa.me/40712345678",
    telegram: "https://t.me/your_company",
    linkedin: "https://linkedin.com/company/your-company",
  },
  trust: {
    message:
      "Your data is safe with us. We don’t send spam and we never share your information.",
    testimonials: [
      {
        name: "Andrew Popescu",
        feedback:
          "I received a very quick reply and the solution was exactly what I needed.",
      },
      {
        name: "Maria Ionescu",
        feedback:
          "Professional and very attentive to detail. Highly recommend!",
      },
    ],
  },
  faq: [
    {
      q: "How soon will I get a reply?",
      a: "We usually respond within 24 hours.",
    },
    {
      q: "Do you offer a free consultation?",
      a: "Yes, the first discussion is free and without obligation.",
    },
    {
      q: "How can I schedule a meeting?",
      a: "After filling out the form, we’ll send you a link to book a call.",
    },
  ],
};

// Tipurile pentru câmpurile din formular
export type ContactFormFieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "textarea";

export interface ContactFormField {
  name: string;
  label: string;
  type: ContactFormFieldType;
  required: boolean;
  options?: string[];
}

// Formularul complet
export interface ContactForm {
  fields: ContactFormField[];
  submitText: string;
  note: string;
}

// Informațiile de contact
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  workHours: string;
}

// Social links
export interface ContactSocials {
  whatsapp?: string;
  telegram?: string;
  linkedin?: string;
}

// Testimoniale
export interface ContactTestimonial {
  name: string;
  feedback: string;
}

// Trust box
export interface ContactTrust {
  message: string;
  testimonials: ContactTestimonial[];
}

// FAQ
export interface ContactFaqItem {
  q: string;
  a: string;
}

// Hero section
export interface ContactHeroSection {
  title: string;
  subtitle: string;
  cta: string;
}

// Structura mare
export interface ContactPageData {
  hero: ContactHeroSection;
  form: ContactForm;
  contactInfo: ContactInfo;
  socials: ContactSocials;
  trust: ContactTrust;
  faq: ContactFaqItem[];
}
