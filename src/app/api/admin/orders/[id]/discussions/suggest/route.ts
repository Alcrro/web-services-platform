import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";
import { requireAuth } from "@/lib/requireAuth";
import { checkRateLimit } from "@/lib/ratelimit";

const schema = z.object({
  notes: z.string().min(1).max(5000),
  discussionId: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const rl = await checkRateLimit(req, "ai");
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { id: orderId } = await params;

  const order = await prisma.serviceOrder.findUnique({
    where: { id: orderId },
    include: {
      service: {
        include: {
          serviceFeatures: {
            where: { isDeleted: false },
            include: { feature: true },
          },
        },
      },
      items: { where: { isDeleted: false }, select: { name: true, type: true } },
    },
  });

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { notes } = parsed.data;

  const serviceFeaturesList = order.service.serviceFeatures
    .map((sf) => `- [ID:${sf.id}] ${sf.feature.name} (${sf.type})${sf.unitPrice ? ` — $${sf.unitPrice}` : ""}`)
    .join("\n");

  const existingItemsList = order.items.length > 0
    ? order.items.map((i) => `- ${i.name} (${i.type})`).join("\n")
    : "Niciun item existent.";

  const prompt = `Ești un asistent pentru managementul proiectelor web. Analizează discuția cu clientul și sugerează ce features trebuie adăugate sau scoase din order.

Serviciu: ${order.service.name}

Features disponibile în serviciu:
${serviceFeaturesList || "Nu există features configurate."}

Features deja în order:
${existingItemsList}

Discuție cu clientul:
${notes}

Returnează EXCLUSIV un JSON valid (fără text înainte sau după) cu structura:
{
  "match": [
    { "serviceFeatureId": "ID din lista de mai sus ca string", "name": "numele featurului", "action": "ADD" sau "REMOVE", "unitPrice": number sau null }
  ],
  "suggest": [
    { "name": "nume feature nou", "description": "descriere scurtă", "estimatedPrice": number sau null }
  ]
}

Reguli:
- "match" conține doar features DIN LISTA DE MAI SUS care sunt menționate explicit sau implicit în discuție
- "suggest" conține features NOI care nu există în lista serviciului dar sunt menționate în discuție
- Nu adăuga features care sunt deja în order (lista "Features deja în order") dacă action ar fi ADD
- Dacă clientul vrea să scoată ceva deja în order, pune action: "REMOVE"
- Dacă discuția nu menționează niciun feature specific, returnează { "match": [], "suggest": [] }`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "{}";

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ match: [], suggest: [], raw: rawText });
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      match: result.match ?? [],
      suggest: result.suggest ?? [],
    });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json({ match: [], suggest: [], error: "AI unavailable" });
  }
}
