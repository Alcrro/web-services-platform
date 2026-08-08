import { anthropic } from "@/lib/anthropic";
import { openai } from "@/lib/openai";
import { AnalysisResult } from "../../domain/application.types";
import { AnalysisResultSchema, AnalyzeMetadata } from "../validators/application.validators";

const SYSTEM_PROMPT = `Ești un asistent expert în freelancing web development. Analizezi descrieri de proiecte de pe platforme ca Upwork sau Freelancer și oferi o analiză structurată pentru a ajuta freelancerul să decidă dacă și cum să aplice.

Returnează EXCLUSIV un obiect JSON valid, fără text înainte sau după, cu structura exactă de mai jos:
{
  "score": {
    "value": 7.5,
    "verdict": "apply",
    "breakdown": {
      "clientTrust": 8,
      "budget": 7,
      "competition": 5,
      "clarity": 9
    }
  },
  "client": {
    "name": "numele clientului dacă e menționat, altfel omite câmpul",
    "needs": "ce vrea clientul — rezumat clar în 2-3 propoziții",
    "redFlags": ["problemă 1", "problemă 2"]
  },
  "theme": "categoria proiectului (ex: Landing page, E-commerce, Dashboard, API REST, Mobile app)",
  "questions": [
    "întrebare non-tehnică 1 de clarificat cu clientul",
    "întrebare non-tehnică 2",
    "întrebare non-tehnică 3"
  ],
  "pitch": "cum să te prezinți și să răspunzi la acest job posting — 3-4 propoziții directe, specifice pentru acest proiect",
  "estimate": {
    "complexity": "low sau medium sau high",
    "budgetRange": "ex: 300-600 EUR",
    "timeEstimate": "ex: 1-2 săptămâni"
  },
  "prd": {
    "features": [
      {
        "name": "Numele feature-ului",
        "criteria": [
          "Criteriu de acceptare 1 — specific și verificabil",
          "Criteriu de acceptare 2"
        ]
      }
    ],
    "outOfScope": [
      "Lucru explicit exclus 1",
      "Lucru explicit exclus 2"
    ],
    "assumptions": [
      "Asumpție 1 — ce presupunem că clientul furnizează sau că e implicit"
    ]
  },
  "bid": {
    "recommendedDays": 7,
    "proposalTips": [
      "Sfat specific 1 bazat pe cerințele proiectului — ce să menționezi explicit",
      "Sfat specific 2",
      "Sfat specific 3"
    ],
    "nextSteps": [
      "Pas 1 după trimiterea bid-ului",
      "Pas 2",
      "Pas 3"
    ]
  },
  "technical": {
    "canPlan": true,
    "stack": ["React", "Next.js", "TailwindCSS"],
    "architecture": "SPA React cu API REST Express, PostgreSQL pentru persistență",
    "hosting": "Vercel (frontend) + Railway (backend + DB)",
    "keyDecisions": [
      "SSG în loc de SSR — conținut static, nu necesită date dinamice la request",
      "Prisma ORM — type-safety și migrări simple"
    ],
    "technicalQuestions": []
  }
}

Reguli score:
- value: număr real 1-10, medie ponderată a breakdown-ului
- verdict: "skip" (1-3.9), "consider" (4-5.9), "apply" (6-7.9), "priority" (8-10)
- clientTrust: 10 dacă toate verificările sunt OK și rating bun; scade cu fiecare verificare lipsă sau rating 0
- budget: 10 dacă bugetul e realist și bun; scade dacă e prea mic sau nerealist
- competition: 10 dacă puțini bids (<10); scade progresiv până la 1 pentru >150 bids
- clarity: 10 dacă cerințele sunt clare și detaliate; scade dacă sunt vage

Reguli generale:
- questions: minim 3, maxim 5 — EXCLUSIV non-tehnice (business, livrabile, deadline, design existent)
- pitch: specific pentru ACEST proiect, nu generic
- budgetRange: estimare realistă în EUR pentru munca cerută
- redFlags: omite câmpul dacă nu există probleme reale

Reguli prd:
- features: 3-6 feature-uri din perspectiva clientului (CE face produsul, nu CUM)
- criteria: 1-3 criterii de acceptare per feature — specifice și verificabile ("se poate filtra pe categorie", nu "e frumos")
- outOfScope: 2-4 lucruri explicit excluse — previn scope creep la acceptare
- assumptions: 2-3 asumpții implicite (ce furnizează clientul, ce e deja clarificat)

Reguli bid:
- recommendedDays: zile realiste pentru livrare completă, nu prea scurte (risc) și nu prea lungi
- proposalTips: 3-5 sfaturi SPECIFICE — fă referire la detalii concrete din descriere
- nextSteps: 3-5 pași în ordine: imediat după submit, dacă nu răspunde, la acceptare

Reguli technical:
- canPlan: true dacă descrierea e suficientă pentru a alege stack și arhitectură
- canPlan: false dacă cerințele sunt prea vage — omite stack/architecture/hosting/keyDecisions
- stack: tehnologiile pe care LE-AI FOLOSI TU bazat pe cerințe
- keyDecisions: 2-4 decizii tehnice cheie cu justificare scurtă (DE CE acea alegere)
- technicalQuestions: întrebări tehnice neacoperite — gol [] dacă totul e clar`;

function buildMetadataContext(metadata: AnalyzeMetadata): string {
  const lines: string[] = ["\n\n---\nContext suplimentar (date extrase automat din platformă):"];

  if (metadata.budget) {
    const { formatted, currencySign, currency } = metadata.budget;
    const avg = metadata.bidStats?.avg;
    lines.push(`- Budget client: ${formatted}`);
    if (avg) lines.push(`- Bid mediu concurență: ${currencySign}${avg.toLocaleString()} ${currency}`);
  }

  if (metadata.bidStats) {
    lines.push(`- Număr bids depuse: ${metadata.bidStats.count}`);
  }

  if (metadata.daysLeft !== undefined) {
    lines.push(`- Deadline: ${metadata.daysLeft} zile rămase`);
  }

  if (metadata.client) {
    const { country, city, rating, reviewCount, verification } = metadata.client;
    const location = [city, country].filter(Boolean).join(", ");
    if (location) lines.push(`- Client: ${location}`);
    lines.push(`- Rating client: ${rating.toFixed(1)}/5 (${reviewCount} recenzii)`);

    const verified: string[] = [];
    const notVerified: string[] = [];
    if (verification.payment) verified.push("Payment"); else notVerified.push("Payment");
    if (verification.deposit) verified.push("Deposit"); else notVerified.push("Deposit");
    if (verification.email) verified.push("Email"); else notVerified.push("Email");
    if (verification.phone) verified.push("Phone"); else notVerified.push("Phone");
    if (verified.length) lines.push(`- Verificări OK: ${verified.join(", ")}`);
    if (notVerified.length) lines.push(`- Neverificat: ${notVerified.join(", ")} ← potențial red flag`);
  }

  if (metadata.skills?.length) {
    lines.push(`- Skills cerute: ${metadata.skills.join(", ")}`);
  }

  return lines.join("\n");
}

function parseJsonResult(rawText: string): AnalysisResult {
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI response did not contain valid JSON");

  const parsed = AnalysisResultSchema.safeParse(JSON.parse(jsonMatch[0]));
  if (!parsed.success) throw new Error("AI response did not match expected schema");

  return parsed.data as AnalysisResult;
}

async function analyzeWithClaude(userMessage: string): Promise<AnalysisResult> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: userMessage }],
    system: SYSTEM_PROMPT,
  });

  const rawText = message.content[0].type === "text" ? message.content[0].text : "{}";
  return parseJsonResult(rawText);
}

async function analyzeWithOpenAI(userMessage: string): Promise<AnalysisResult> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 1024,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
  });

  const rawText = completion.choices[0]?.message?.content ?? "{}";
  return parseJsonResult(rawText);
}

export class AnalyzeApplication {
  async execute(jobDescription: string, metadata?: AnalyzeMetadata): Promise<AnalysisResult> {
    const userMessage =
      `Analizează următorul job posting:\n\n${jobDescription}` +
      (metadata ? buildMetadataContext(metadata) : "");

    if (process.env.ANTHROPIC_API_KEY) {
      try {
        return await analyzeWithClaude(userMessage);
      } catch {
        // fall through to OpenAI
      }
    }

    if (process.env.OPENAI_API_KEY) {
      return await analyzeWithOpenAI(userMessage);
    }

    throw new Error("No AI provider configured");
  }
}
