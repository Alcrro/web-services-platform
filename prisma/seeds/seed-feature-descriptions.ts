import "dotenv/config";
import { prisma } from "../../src/lib/prisma.ts";

const descriptions: Record<string, string> = {
  // ── Starter Website ────────────────────────────────────────────────────────
  "starter-website-seo-ready":
    "Sitemap XML, meta tags optimizate, Open Graph și structură URL curată — site-ul tău apare corect în Google și pe rețelele sociale.",
  "starter-website-4-pages":
    "Home, About, Services și Contact — paginile esențiale pentru orice afacere, cu conținut personalizat și navigație clară.",
  "starter-website-responsive":
    "Design adaptat automat pe orice dispozitiv: desktop, tabletă și telefon — fără layout rupt sau text tăiat.",
  "starter-website-contact-form":
    "Formular de contact cu validare și trimitere automată pe email — primești mesajele direct în inbox, fără spam.",

  // ── Professional Website ───────────────────────────────────────────────────
  "professional-website-seo-analytics":
    "SEO tehnic complet (Core Web Vitals, structured data, sitemap) + integrare Google Analytics 4 pentru tracking trafic și conversii.",
  "professional-website-6-pages":
    "6 pagini complete incluzând Blog și Portfolio — conținut care atrage vizitatori organici și demonstrează expertiza ta.",
  "professional-website-responsive-design":
    "Layout fluid testat pe 10+ rezoluții — de la telefoane mici la monitoare 4K. Pixel-perfect pe orice ecran.",
  "professional-website-automated-contact":
    "Email automat de confirmare pentru client + notificare pentru tine la fiecare mesaj. Integrare cu servicii SMTP (Resend, SendGrid).",
  "professional-website-blog-integration":
    "Blog cu categorii, taguri, paginare și RSS feed. Conținut indexabil de Google — ideal pentru inbound marketing.",

  // ── E-commerce Website ─────────────────────────────────────────────────────
  "ecommerce-website-seo-analytics":
    "SEO pentru pagini de produs (schema Product, breadcrumbs, canonical URLs) + Google Analytics cu tracking e-commerce (revenue, conversii, coș abandonat).",
  "ecommerce-website-6-pages-catalog":
    "6 pagini + catalog de produse cu filtrare, sortare, căutare și pagini individuale de produs optimizate SEO.",
  "ecommerce-website-mobile-friendly":
    "Experiență de cumpărare optimizată pe mobil — butoane mari, checkout simplu, imagini optimizate pentru 4G/5G.",
  "ecommerce-website-shop-setup":
    "Configurare completă a magazinului: categorii, atribute produs (culoare, mărime), stoc și prețuri cu discount.",
  "ecommerce-website-payment-gateway":
    "Integrare Stripe sau PayU cu plată cu cardul, 3D Secure și facturare automată. Tranzacții securizate PCI-DSS.",
  "ecommerce-website-vendor-dashboard":
    "Panou separat pentru furnizori: gestionare produse proprii, vizualizare comenzi și rapoarte de vânzări individuale.",
  "ecommerce-website-inventory-management":
    "Gestionare stoc în timp real cu alerte de stoc minim, rezervare automată la plasarea comenzii și rapoarte de rotație.",

  // ── CRM Application ────────────────────────────────────────────────────────
  "crm-dashboard":
    "Panou central cu KPI-uri cheie: lead-uri noi, conversii, revenue lunar și activitate recentă — toate dintr-o privire.",
  "crm-customers":
    "Bază de clienți cu profil complet: contact, istoric interacțiuni, note, documente atașate și segmentare pe taguri.",
  "crm-sales-pipeline":
    "Pipeline vizual tip Kanban cu etape configurabile (Lead → Calificat → Propunere → Câștigat/Pierdut) și valoare estimată per deal.",
  "crm-tasks":
    "Task-uri și remindere atribuite per client sau deal, cu deadline, prioritate și notificări automate.",
  "crm-notifications":
    "Notificări în timp real pentru activități importante: mesaj nou, deadline task, deal actualizat — în browser și email.",
  "crm-reports":
    "Rapoarte lunare/trimestriale de vânzări cu grafice: revenue per agent, rata de conversie, sursa lead-urilor și forecast.",
  "crm-permissions":
    "Roluri și permisiuni granulare: Admin, Manager, Agent — fiecare vede și editează doar ce îi aparține.",
  "crm-integrations":
    "Conectare cu Gmail, Outlook sau Slack — emailuri și mesaje sincronizate automat în fișa clientului.",
  "crm-calendar":
    "Calendar integrat cu întâlniri, apeluri și follow-up-uri. Sincronizare bidirecțională cu Google Calendar.",
  "crm-files":
    "Spațiu de stocare pentru documente per client: contracte, oferte, facturi — acces rapid fără căutare în email.",

  // ── Automation Scripts ─────────────────────────────────────────────────────
  "automation-cron":
    "Job-uri programate (zilnic, săptămânal, la oră fixă) pentru rapoarte automate, backup, curățare date sau sincronizări periodice.",
  "automation-data-sync":
    "Sincronizare bidirecțională între două sau mai multe sisteme (CRM, ERP, API extern) fără intervenție manuală.",
  "automation-etl":
    "Extragere, transformare și încărcare date din surse eterogene (CSV, JSON, API, SQL) într-un format unificat.",
  "automation-webhooks":
    "Procesare evenimente în timp real: la o acțiune în sistem A se declanșează automat un workflow în sistem B.",
  "automation-retry":
    "Logică de reîncercare automată cu backoff exponențial pentru apeluri de API care eșuează temporar — zero pierdere de date.",
  "automation-secrets":
    "Gestionare securizată a cheilor API și credențialelor prin variabile de mediu sau vault (nu hardcodate în cod).",
  "automation-monitoring":
    "Dashboard Prometheus + Grafana cu metrici custom: erori, latență, job-uri eșuate — cu alerte pe email sau Slack.",
  "automation-admin-ui":
    "Interfață web pentru rulare manuală a job-urilor, vizualizare logs și reluare task-uri eșuate — fără acces la server.",
  "automation-rate-limit":
    "Throttling configurabil pentru a respecta limitele API-urilor externe și a evita ban-ul sau costurile suplimentare.",
  "automation-audit-logs":
    "Log complet al tuturor operațiunilor: cine a declanșat ce, când, cu ce rezultat — exportabil în CSV sau vizualizabil în UI.",
  "automation-sla-support":
    "Suport prioritar cu timp de răspuns garantat (SLA). Monitorizare continuă și intervenție rapidă în caz de incident.",

  // ── AI Add-ons ─────────────────────────────────────────────────────────────
  "professional-website-ai-chatbot":
    "Chatbot antrenat pe conținutul site-ului tău — răspunde automat la întrebări frecvente și califică lead-uri 24/7.",
  "ecommerce-website-ai-recommendations":
    "Recomandări de produse personalizate bazate pe comportamentul de cumpărare — crește valoarea medie a coșului.",
  "premium-custom-website-ai-features":
    "Integrare LLM custom (OpenAI, Anthropic, Mistral) adaptată exact nevoilor tale: generare conținut, analiză date sau asistent intern.",
  "crm-ai-lead-scoring":
    "Scor automat per lead bazat pe comportament, interacțiuni și date istorice — prioritizezi lead-urile cu cel mai mare potențial.",
  "automation-llm-powered":
    "Automatizări care înțeleg limbaj natural: clasificare emailuri, extragere date din documente PDF sau generare rapoarte narative.",
};

async function main() {
  let updated = 0;
  let notFound = 0;

  for (const [uniqueId, description] of Object.entries(descriptions)) {
    const result = await prisma.feature.updateMany({
      where: { uniqueId },
      data: { description },
    });

    if (result.count > 0) {
      updated++;
    } else {
      console.warn(`⚠ Feature not found in DB: ${uniqueId}`);
      notFound++;
    }
  }

  console.log(`\n✅ Descriptions updated: ${updated}`);
  if (notFound > 0) console.log(`⚠  Not found: ${notFound}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
