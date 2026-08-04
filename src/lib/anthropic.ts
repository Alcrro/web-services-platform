import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>|<\/li>|<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function generateDiscussionSummary(notesHtml: string): Promise<string | null> {
  const plain = htmlToPlainText(notesHtml);
  if (!plain) return null;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: `Rezumă în 1-2 propoziții scurte (max 30 cuvinte) ce s-a discutat cu clientul. Fii direct, fără introducere. Conversație:\n\n${plain}`,
        },
      ],
    });

    const block = msg.content[0];
    return block.type === "text" ? block.text.trim() : null;
  } catch {
    return null;
  }
}
