import "dotenv/config";
import { prisma } from "../../src/lib/prisma.ts";

const USER_EMAIL = "alex.roventa94@gmail.com";

async function main() {
  // ─── 1. User ───────────────────────────────────────────────────────────────
  const user = await prisma.user.findUnique({ where: { email: USER_EMAIL } });
  if (!user) throw new Error("User not found. Run create-admin.ts first.");

  // ─── 2. Client ─────────────────────────────────────────────────────────────
  let client = await prisma.client.findUnique({ where: { email: USER_EMAIL } });
  if (!client) {
    client = await prisma.client.create({
      data: {
        name: "Alexandru Roventa",
        email: USER_EMAIL,
        phone: "+40 700 000 000",
      },
    });
    console.log("✓ Client created:", client.id);
  } else {
    console.log("✓ Client exists:", client.id);
  }

  // ─── 3. Link User → Client ─────────────────────────────────────────────────
  await prisma.user.update({
    where: { id: user.id },
    data: { clientId: client.id },
  });
  console.log("✓ User.clientId →", client.id);

  // ─── 4. Services + techStack ───────────────────────────────────────────────
  const profService = await prisma.service.findFirst({
    where: { name: "Professional Website" },
    include: { serviceFeatures: { where: { isIncluded: true }, include: { feature: true } } },
  });
  const crmService = await prisma.service.findFirst({
    where: { name: "CRM Application" },
    include: { serviceFeatures: { where: { isIncluded: true }, include: { feature: true } } },
  });

  if (!profService || !crmService) {
    throw new Error("Services not found. Run seeds.ts first.");
  }

  await prisma.service.update({
    where: { id: profService.id },
    data: { techStack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Prisma", "Vercel"] },
  });
  await prisma.service.update({
    where: { id: crmService.id },
    data: { techStack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Prisma", "Zustand"] },
  });
  console.log("✓ techStack setat pe Professional Website + CRM Application");

  // ─── 5. Order 1 — Professional Website (IN_PROGRESS) ──────────────────────
  let order1 = await prisma.serviceOrder.findFirst({
    where: { clientId: client.id, serviceId: profService.id },
  });

  if (!order1) {
    order1 = await prisma.serviceOrder.create({
      data: {
        projectName: "Portfolio & Agency Website",
        serviceId: profService.id,
        clientId: client.id,
        initialPrice: 3200,
        totalPrice: 4128,
        status: "IN_PROGRESS",
        requirements:
          "Website profesional cu portfolio, blog și pagina de contact.\nDesign modern, dark mode, mobile-first.\nIntegrare cu Google Analytics și newsletter.",
      },
    });
    console.log("✓ Order 1 creat:", order1.id);

    const stdFeatures = profService.serviceFeatures.slice(0, 4);

    const items1 = await Promise.all(
      stdFeatures.map((sf) =>
        prisma.serviceOrderItem.create({
          data: {
            orderId: order1!.id,
            name: sf.feature.name,
            description: `Implementare: ${sf.feature.name}`,
            quantity: 1,
            type: "STANDARD",
            showPrice: false,
          },
        })
      )
    );

    const extraItem1 = await prisma.serviceOrderItem.create({
      data: {
        orderId: order1.id,
        name: "Dark Mode Support",
        description: "Toggle dark/light cu preferință sistem",
        quantity: 1,
        unitPrice: 320,
        totalPrice: 320,
        type: "OPTIONAL",
        showPrice: true,
      },
    });

    const taskSets: Array<{ title: string; status: "DONE" | "TESTED" | "IN_PROGRESS" | "NOT_STARTED" }[]> = [
      [
        { title: `Design UI — ${items1[0].name}`, status: "DONE" },
        { title: `Implementare — ${items1[0].name}`, status: "DONE" },
        { title: `QA & review — ${items1[0].name}`, status: "TESTED" },
      ],
      [
        { title: `Design UI — ${items1[1].name}`, status: "DONE" },
        { title: `Implementare — ${items1[1].name}`, status: "IN_PROGRESS" },
      ],
      [
        { title: `Design UI — ${items1[2].name}`, status: "IN_PROGRESS" },
        { title: `Implementare — ${items1[2].name}`, status: "NOT_STARTED" },
      ],
      [
        { title: `Design UI — ${items1[3].name}`, status: "NOT_STARTED" },
        { title: `Implementare — ${items1[3].name}`, status: "NOT_STARTED" },
      ],
    ];

    for (let i = 0; i < items1.length; i++) {
      for (const t of taskSets[i] ?? []) {
        await prisma.task.create({
          data: { ...t, orderItemId: items1[i].id, orderId: order1.id },
        });
      }
    }

    await prisma.task.createMany({
      data: [
        { title: "Dark mode CSS variables", status: "IN_PROGRESS", orderItemId: extraItem1.id, orderId: order1.id },
        { title: "Theme toggle component", status: "NOT_STARTED", orderItemId: extraItem1.id, orderId: order1.id },
      ],
    });

    await prisma.task.createMany({
      data: [
        { title: "Setup hosting & domeniu", status: "DONE", orderId: order1.id },
        { title: "Configurare SSL", status: "DONE", orderId: order1.id },
        { title: "QA final & livrare", status: "NOT_STARTED", orderId: order1.id },
      ],
    });

    console.log("✓ Tasks Order 1 create");
  } else {
    console.log("✓ Order 1 există deja:", order1.id);
  }

  // Patch: asigură că extra item are unitPrice setat
  const existingExtra = await prisma.serviceOrderItem.findFirst({
    where: { orderId: order1.id, type: "OPTIONAL" },
  });
  if (existingExtra && (!existingExtra.unitPrice || Number(existingExtra.unitPrice) === 0)) {
    await prisma.serviceOrderItem.update({
      where: { id: existingExtra.id },
      data: { unitPrice: 320, totalPrice: 320, showPrice: true },
    });
    await prisma.serviceOrder.update({
      where: { id: order1.id },
      data: { totalPrice: 4128 },
    });
    console.log("✓ Patch: extra item unitPrice + order totalPrice actualizate");
  }

  // ─── 6. Order 2 — CRM Application (APPROVED) ──────────────────────────────
  let order2 = await prisma.serviceOrder.findFirst({
    where: { clientId: client.id, serviceId: crmService.id },
  });

  if (!order2) {
    order2 = await prisma.serviceOrder.create({
      data: {
        projectName: "Business CRM Dashboard",
        serviceId: crmService.id,
        clientId: client.id,
        initialPrice: 2000,
        totalPrice: 2380,
        status: "APPROVED",
        requirements:
          "CRM pentru echipa de vânzări. Tracking clienți, pipeline vânzări, rapoarte lunare.\nIntegrare cu email pentru notificări automate.",
      },
    });
    console.log("✓ Order 2 creat:", order2.id);

    const stdFeatures2 = crmService.serviceFeatures.slice(0, 3);

    const items2 = await Promise.all(
      stdFeatures2.map((sf) =>
        prisma.serviceOrderItem.create({
          data: {
            orderId: order2!.id,
            name: sf.feature.name,
            description: `Implementare: ${sf.feature.name}`,
            quantity: 1,
            type: "STANDARD",
            showPrice: false,
          },
        })
      )
    );

    for (const item of items2) {
      await prisma.task.createMany({
        data: [
          { title: `Design — ${item.name}`, status: "DONE", orderItemId: item.id, orderId: order2!.id },
          { title: `Backend — ${item.name}`, status: "DONE", orderItemId: item.id, orderId: order2!.id },
          { title: `Testing — ${item.name}`, status: "TESTED", orderItemId: item.id, orderId: order2!.id },
        ],
      });
    }

    await prisma.task.createMany({
      data: [
        { title: "Deploy staging", status: "DONE", orderId: order2.id },
        { title: "Client demo & aprobare", status: "DONE", orderId: order2.id },
        { title: "Deploy production", status: "IN_PROGRESS", orderId: order2.id },
      ],
    });

    console.log("✓ Tasks Order 2 create");
  } else {
    console.log("✓ Order 2 există deja:", order2.id);
  }

  console.log("\n✅ Seed finalizat cu succes!");
  console.log(`   Client: ${client.id}`);
  console.log(`   Order 1 (IN_PROGRESS): ${order1.id}`);
  console.log(`   Order 2 (APPROVED): ${order2.id}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
