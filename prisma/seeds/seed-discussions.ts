import { config } from "dotenv";
config({ path: ".env.local" });
import { prisma } from "../../src/lib/prisma.ts";

const USER_EMAIL = "alex.roventa94@gmail.com";

async function main() {
  const user = await prisma.user.findUnique({ where: { email: USER_EMAIL } });
  if (!user) throw new Error("User not found.");

  const client = await prisma.client.findUnique({ where: { email: USER_EMAIL } });
  if (!client) throw new Error("Client not found. Run seed-alex-demo.ts first.");

  const order1 = await prisma.serviceOrder.findFirst({
    where: { clientId: client.id, projectName: "Portfolio & Agency Website" },
  });
  const order2 = await prisma.serviceOrder.findFirst({
    where: { clientId: client.id, projectName: "Business CRM Dashboard" },
  });

  if (!order1 || !order2) throw new Error("Orders not found. Run seed-alex-demo.ts first.");

  // Skip if discussions already exist
  const existingCount = await prisma.orderDiscussion.count({
    where: { orderId: { in: [order1.id, order2.id] } },
  });
  if (existingCount > 0) {
    console.log(`✓ Discussions already exist (${existingCount}), skipping.`);
    return;
  }

  // ─── ORDER 1 — Portfolio & Agency Website ─────────────────────────────────

  // Discussion 1 — CONFIRMED
  const disc1 = await prisma.orderDiscussion.create({
    data: {
      orderId: order1.id,
      status: "CONFIRMED",
      summary: "Agreed on project scope: responsive design, dark mode toggle, and SEO optimization as mandatory deliverables. Client confirmed mobile-first priority.",
      notes: `<p>Am discutat scopul inițial al proiectului. Clientul dorește:</p><ul><li><strong>Design responsive</strong> — prioritate mobile-first</li><li><strong>Dark mode</strong> — toggle vizibil în header</li><li>Optimizare SEO de bază (meta tags, sitemap, robots.txt)</li></ul><p>Termen estimat discutat: <strong>6 săptămâni</strong>. Clientul a confirmat că aprobă stack-ul tehnic propus.</p>`,
    },
  });

  const item1a = await prisma.serviceOrderItem.create({
    data: {
      orderId: order1.id,
      discussionId: disc1.id,
      name: "SEO Optimization",
      description: "Meta tags, Open Graph, sitemap.xml, robots.txt și structured data pentru pagina principală",
      quantity: 1,
      unitPrice: 280,
      totalPrice: 280,
      type: "OPTIONAL",
      showPrice: true,
    },
  });

  const item1b = await prisma.serviceOrderItem.create({
    data: {
      orderId: order1.id,
      discussionId: disc1.id,
      name: "Mobile-First Responsive Layout",
      description: "Breakpoints personalizate pentru mobile, tablet și desktop cu testare pe device-uri reale",
      quantity: 1,
      type: "STANDARD",
      showPrice: false,
    },
  });

  await prisma.task.createMany({
    data: [
      { title: "Configurare meta tags + Open Graph", status: "DONE", orderItemId: item1a.id, orderId: order1.id },
      { title: "Generare sitemap dinamic", status: "IN_PROGRESS", orderItemId: item1a.id, orderId: order1.id },
      { title: "Structured data (JSON-LD)", status: "NOT_STARTED", orderItemId: item1a.id, orderId: order1.id },
      { title: "Layout mobile breakpoints", status: "DONE", orderItemId: item1b.id, orderId: order1.id },
      { title: "Testare cross-device", status: "IN_PROGRESS", orderItemId: item1b.id, orderId: order1.id },
    ],
  });

  console.log("✓ Order1 Discussion 1 (CONFIRMED) + 2 items + 5 tasks");

  // Discussion 2 — CONFIRMED
  const disc2 = await prisma.orderDiscussion.create({
    data: {
      orderId: order1.id,
      status: "CONFIRMED",
      summary: "Client reviewed first mockups and requested custom page transition animations and a contact form with email notifications. Both confirmed as additional scope.",
      notes: `<p>Review mockup-uri iterația 1. Feedback primit:</p><ul><li>Paleta de culori aprobată ✓</li><li>Clientul dorește <strong>animații de tranziție</strong> între pagini — efect fade + slide</li><li>Formular de contact cu <strong>notificări email</strong> automate la fiecare submission</li></ul><p>Am convenit că aceste două cerințe sunt adăugate în scope ca extra items. ETA revizuit: +1 săptămână.</p>`,
    },
  });

  const item2a = await prisma.serviceOrderItem.create({
    data: {
      orderId: order1.id,
      discussionId: disc2.id,
      name: "Page Transition Animations",
      description: "Animații fade + slide la navigare între pagini, optimizate pentru performanță (no layout shift)",
      quantity: 1,
      unitPrice: 180,
      totalPrice: 180,
      type: "OPTIONAL",
      showPrice: true,
    },
  });

  const item2b = await prisma.serviceOrderItem.create({
    data: {
      orderId: order1.id,
      discussionId: disc2.id,
      name: "Contact Form + Email Notifications",
      description: "Formular validat cu Zod, trimitere email via Resend, rate limiting și protecție anti-spam",
      quantity: 1,
      unitPrice: 220,
      totalPrice: 220,
      type: "OPTIONAL",
      showPrice: true,
    },
  });

  await prisma.task.createMany({
    data: [
      { title: "Implementare AnimatePresence (Framer Motion)", status: "DONE", orderItemId: item2a.id, orderId: order1.id },
      { title: "Optimizare performanță animații", status: "IN_PROGRESS", orderItemId: item2a.id, orderId: order1.id },
      { title: "Setup Resend + template email", status: "DONE", orderItemId: item2b.id, orderId: order1.id },
      { title: "Validare Zod + rate limiting", status: "IN_PROGRESS", orderItemId: item2b.id, orderId: order1.id },
      { title: "Testare end-to-end formular", status: "NOT_STARTED", orderItemId: item2b.id, orderId: order1.id },
    ],
  });

  console.log("✓ Order1 Discussion 2 (CONFIRMED) + 2 items + 5 tasks");

  // Discussion 3 — DRAFT
  const disc3 = await prisma.orderDiscussion.create({
    data: {
      orderId: order1.id,
      status: "DRAFT",
      summary: null,
      notes: `<p>Discuție în curs despre adăugarea unui <strong>blog integrat</strong>. Clientul vrea:</p><ul><li>Editor WYSIWYG pentru articole</li><li>Categorii și taguri</li><li>RSS feed</li></ul><p>Urmează să confirmăm prețul și termenul. <em>Nedecis încă.</em></p>`,
    },
  });

  const item3a = await prisma.serviceOrderItem.create({
    data: {
      orderId: order1.id,
      discussionId: disc3.id,
      name: "Blog integrat cu CMS",
      description: "Editor articole, categorii, taguri, RSS feed și pagini de listing cu paginare",
      quantity: 1,
      unitPrice: 650,
      totalPrice: 650,
      type: "OPTIONAL",
      showPrice: false,
    },
  });

  await prisma.task.createMany({
    data: [
      { title: "Schema DB pentru articole + categorii", status: "NOT_STARTED", orderItemId: item3a.id, orderId: order1.id },
      { title: "Editor WYSIWYG (Tiptap)", status: "NOT_STARTED", orderItemId: item3a.id, orderId: order1.id },
      { title: "Pagini listing + detaliu articol", status: "NOT_STARTED", orderItemId: item3a.id, orderId: order1.id },
      { title: "RSS feed endpoint", status: "NOT_STARTED", orderItemId: item3a.id, orderId: order1.id },
    ],
  });

  console.log("✓ Order1 Discussion 3 (DRAFT) + 1 item + 4 tasks");

  // ─── ORDER 2 — Business CRM Dashboard ─────────────────────────────────────

  // Discussion 4 — CONFIRMED
  const disc4 = await prisma.orderDiscussion.create({
    data: {
      orderId: order2.id,
      status: "CONFIRMED",
      summary: "Finalized CRM scope: sales pipeline board, email notifications for lead updates, and PDF export for monthly reports. All three confirmed as deliverables.",
      notes: `<p>Finalizare scope CRM. Confirmate:</p><ul><li><strong>Sales pipeline</strong> — board Kanban cu drag & drop pentru lead-uri</li><li><strong>Notificări email</strong> — alertă la update status lead</li><li><strong>Export PDF</strong> — rapoarte lunare cu statistici</li></ul><p>Clientul a semnat oferta. Startul implementării: imediat.</p>`,
    },
  });

  const item4a = await prisma.serviceOrderItem.create({
    data: {
      orderId: order2.id,
      discussionId: disc4.id,
      name: "Sales Pipeline Board",
      description: "Board Kanban cu drag & drop, etape configurabile și filtrare pe assignee sau dată",
      quantity: 1,
      unitPrice: 480,
      totalPrice: 480,
      type: "OPTIONAL",
      showPrice: true,
    },
  });

  const item4b = await prisma.serviceOrderItem.create({
    data: {
      orderId: order2.id,
      discussionId: disc4.id,
      name: "Email Notifications — Lead Updates",
      description: "Alertă email automată la schimbarea statusului unui lead, cu template personalizabil",
      quantity: 1,
      unitPrice: 150,
      totalPrice: 150,
      type: "OPTIONAL",
      showPrice: true,
    },
  });

  const item4c = await prisma.serviceOrderItem.create({
    data: {
      orderId: order2.id,
      discussionId: disc4.id,
      name: "PDF Report Export",
      description: "Generare PDF cu statistici lunare: leads, conversii, venituri estimate",
      quantity: 1,
      unitPrice: 230,
      totalPrice: 230,
      type: "OPTIONAL",
      showPrice: true,
    },
  });

  await prisma.task.createMany({
    data: [
      { title: "Schema DB pipeline + leads", status: "DONE", orderItemId: item4a.id, orderId: order2.id },
      { title: "Kanban board UI + drag & drop", status: "DONE", orderItemId: item4a.id, orderId: order2.id },
      { title: "API endpoints pipeline CRUD", status: "DONE", orderItemId: item4a.id, orderId: order2.id },
      { title: "Setup email trigger la status change", status: "DONE", orderItemId: item4b.id, orderId: order2.id },
      { title: "Template email lead update", status: "DONE", orderItemId: item4b.id, orderId: order2.id },
      { title: "Generare PDF cu react-pdf", status: "DONE", orderItemId: item4c.id, orderId: order2.id },
      { title: "Endpoint download raport lunar", status: "DONE", orderItemId: item4c.id, orderId: order2.id },
    ],
  });

  console.log("✓ Order2 Discussion 4 (CONFIRMED) + 3 items + 7 tasks");

  // Discussion 5 — CONFIRMED
  const disc5 = await prisma.orderDiscussion.create({
    data: {
      orderId: order2.id,
      status: "CONFIRMED",
      summary: "Client approved staging demo. Minor UI adjustments requested: date format change and table density. Both implemented and verified before production deploy.",
      notes: `<p>Demo pe staging — feedback final înainte de deploy production.</p><ul><li>Format dată în tabele: <strong>DD/MM/YYYY</strong> în loc de ISO</li><li>Density tabel: mai compact, spacing redus</li><li>Confirmat că toate funcționalitățile principale funcționează</li></ul><p>Deploy production planificat pentru <strong>mâine dimineață</strong>. Client a dat OK final.</p>`,
    },
  });

  const item5a = await prisma.serviceOrderItem.create({
    data: {
      orderId: order2.id,
      discussionId: disc5.id,
      name: "UI Adjustments — Tables & Date Format",
      description: "Modificare format dată la DD/MM/YYYY și ajustare density tabele pentru o mai bună lizibilitate",
      quantity: 1,
      type: "STANDARD",
      showPrice: false,
    },
  });

  await prisma.task.createMany({
    data: [
      { title: "Schimbare format dată în toate tabelele", status: "TESTED", orderItemId: item5a.id, orderId: order2.id },
      { title: "Ajustare spacing & padding tabele", status: "TESTED", orderItemId: item5a.id, orderId: order2.id },
    ],
  });

  console.log("✓ Order2 Discussion 5 (CONFIRMED) + 1 item + 2 tasks");

  console.log("\n✅ Seed discussions finalizat!");
  console.log(`   Order1: 3 discussions (2 confirmed, 1 draft), 5 items, 14 tasks`);
  console.log(`   Order2: 2 discussions (2 confirmed), 4 items, 9 tasks`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
