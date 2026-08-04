export interface IServiceFAQ {
  question: string;
  answer: string;
}

export interface IServiceDetailData {
  faqs: IServiceFAQ[];
}

const process = [
  { step: "01", title: "Discovery", description: "Discuție despre cerințe, obiective și timeline. Definim scope-ul exact al proiectului." },
  { step: "02", title: "Design", description: "Wireframes și design vizual. Aprobi fiecare ecran înainte să scriem o linie de cod." },
  { step: "03", title: "Development", description: "Implementare iterativă cu update-uri regulate. Ai acces la un link de preview pe tot parcursul." },
  { step: "04", title: "Launch", description: "QA complet, deploy pe producție și handover cu documentație. Suport 30 de zile inclus." },
];

export const serviceProcess = process;

const serviceDetailMap: Record<string, IServiceDetailData> = {
  "starter-website": {
    faqs: [
      { question: "Cât durează livrarea unui Starter Website?", answer: "De obicei 2–3 săptămâni de la aprobare design. Dacă ai conținut pregătit (texte, imagini), mergem mai repede." },
      { question: "Pot adăuga pagini în plus față de cele 4?", answer: "Da, fiecare pagină adițională se cotează separat în funcție de complexitate." },
      { question: "Hosting-ul și domeniul sunt incluse?", answer: "Domeniul nu este inclus — te ajutăm să îl alegi și configurezi. Hosting-ul recomandat (Vercel sau similar) costă ~$5–20/lună, separat." },
      { question: "Pot actualiza conținutul singur după livrare?", answer: "Dacă adăugăm un CMS (Sanity, Contentful — add-on), da. Altfel, modificările de conținut se fac contra cost per intervenție." },
    ],
  },
  "professional-website": {
    faqs: [
      { question: "Ce diferențiază Professional față de Starter?", answer: "6 pagini în loc de 4, blog funcțional, SEO avansat cu Analytics și automatizări email — potrivit pentru afaceri care vor să crească organic." },
      { question: "Blog-ul e inclus sau add-on?", answer: "Blog Integration este add-on opțional. Dacă îl vrei inclus, îl adăugăm în ofertă cu un cost suplimentar." },
      { question: "Cât de repede apare site-ul în Google?", answer: "SEO tehnic e gata de la lansare. Indexarea Google durează 2–6 săptămâni. Pozițiile depind de conținut și concurență — nu promitem locul 1." },
      { question: "Pot migra un site existent?", answer: "Da. Migrarea conținutului (texte, imagini, SEO meta) se cotează separat în funcție de volum." },
    ],
  },
  "e-commerce-website": {
    faqs: [
      { question: "Ce gateway de plată integrați?", answer: "Stripe (recomandat) sau PayU. Ambele suportă carduri, 3D Secure și facturare automată. Comisioanele gateway sunt ale tale, nu ale noastre." },
      { question: "Câte produse poate gestiona magazinul?", answer: "Fără limită tehnică. Dacă ai mii de produse, discutăm despre optimizare și import în bulk." },
      { question: "Am nevoie de cont Stripe sau PayU?", answer: "Da — tu ești proprietarul contului și primești banii direct. Noi facem doar integrarea tehnică." },
      { question: "Ce se întâmplă dacă un produs rămâne fără stoc?", answer: "Se marchează automat ca indisponibil și dispare din listări. Primești notificare email la stoc minim (configurabil)." },
    ],
  },
  "premium-custom-website": {
    faqs: [
      { question: "De ce nu există un preț fix?", answer: "Proiectele custom variază enorm ca complexitate — de la landing pages animate la platforme cu zeci de integrări. Cotăm după un brief detaliat." },
      { question: "Cum decurge procesul pentru proiecte custom?", answer: "Începem cu o sesiune de discovery (1h, gratuită) în care înțelegem business-ul tău. Livrăm un brief tehnic + estimare detaliată în 3–5 zile." },
      { question: "Pot include funcționalități de AI?", answer: "Da — AI Chatbot, generare conținut, analiză date și integrări LLM sunt disponibile ca add-on sau incluse în scope dacă sunt centrale produsului." },
      { question: "Oferiți și mentenanță după lansare?", answer: "Da, avem pachete lunare de mentenanță (update-uri, securitate, monitorizare). Discutăm separat în funcție de complexitatea proiectului." },
    ],
  },
  "crm-application": {
    faqs: [
      { question: "CRM-ul e un produs gata sau construit custom?", answer: "Construit custom pe stack-ul tău — nu vindem licență SaaS. Tu ești proprietarul codului și al datelor." },
      { question: "Se poate integra cu emailul meu de business?", answer: "Da, cu Gmail sau Outlook prin OAuth. Emailurile apar automat în fișa clientului fără copiere manuală." },
      { question: "Câți utilizatori poate gestiona?", answer: "Fără limită — CRM-ul e construit pe infrastructura ta. Scalezi serverul, nu plătești per seat." },
      { question: "Datele clienților mei sunt în siguranță?", answer: "Da. Datele stau pe serverul tău (self-hosted) sau pe o instanță dedicată în cloud. Nu există acces terț la ele." },
    ],
  },
  "automation-scripts": {
    faqs: [
      { question: "Ce tipuri de automatizări puteți construi?", answer: "Sincronizări între sisteme, procesare fișiere, rapoarte automate, notificări, scraping, ETL — orice flux repetitiv care poate fi codat." },
      { question: "Pe ce platformă rulează scripturile?", answer: "Oriunde: server propriu, AWS Lambda, Google Cloud Run, GitHub Actions sau un VPS. Recomandăm în funcție de volumul și frecvența job-urilor." },
      { question: "Pot vedea ce rulează și ce eșuează?", answer: "Da — cu add-on-ul Admin UI ai o interfață web cu logs, status per job și posibilitatea de reluare manuală a task-urilor eșuate." },
      { question: "Cât de repede detectați o problemă în producție?", answer: "Cu Monitoring & Alerts (Prometheus/Grafana), alertele ajung în sub 2 minute pe email sau Slack." },
    ],
  },
};

export function getServiceDetailData(slug: string): IServiceDetailData {
  return serviceDetailMap[slug] ?? { faqs: [] };
}
