import { ScrapedJobData } from "../../domain/application.types";

export class ScrapeFreelancerJob {
  async execute(url: string): Promise<ScrapedJobData> {
    if (!url.includes("freelancer.com/projects/")) {
      throw new Error("URL Freelancer invalid — structură nerecunoscută");
    }

    const html = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    });

    const scriptStart = html.indexOf('{"__nghData__"');
    if (scriptStart === -1) throw new Error("Structura paginii s-a schimbat — date indisponibile");
    const scriptEnd = html.indexOf("</script>", scriptStart);
    const state = JSON.parse(html.slice(scriptStart, scriptEnd).trim());

    const projectsStore = state?.NGRX_STATE?.projectsSeo ?? {};
    let raw: Record<string, unknown> | null = null;

    // Iterăm fără să depindem de seoKey derivat din URL — mai robust față de redirecturi
    outer: for (const storeKey of Object.keys(projectsStore)) {
      const docs =
        (projectsStore[storeKey] as { documents?: Record<string, unknown> })?.documents ?? {};
      for (const docKey of Object.keys(docs)) {
        const entry = docs[docKey] as { rawDocument?: Record<string, unknown> } | undefined;
        if (entry?.rawDocument?.title) {
          raw = entry.rawDocument;
          break outer;
        }
      }
    }

    if (!raw) throw new Error("Proiectul nu a fost găsit în pagină");

    const client = raw.client as {
      address?: { city?: string; country?: string };
      rating?: { average?: number; reviewCount?: number };
      registrationTime?: number;
      verification?: {
        paymentVerified?: boolean;
        emailVerified?: boolean;
        phoneVerified?: boolean;
        profileComplete?: boolean;
        depositMade?: boolean;
      };
    };

    const budget = raw.budget as { min?: number; max?: number } | undefined;
    const bidStats = raw.bidStats as { bidCount?: number; bidAvg?: number } | undefined;
    const currencyDetails = raw.currencyDetails as {
      code?: string;
      sign?: string;
    } | undefined;

    return {
      title: String(raw.title ?? ""),
      description: String(raw.description ?? ""),
      url,
      budget: {
        min: budget?.min ?? 0,
        max: budget?.max ?? 0,
        formatted: String(raw.formattedBudget ?? ""),
        currency: currencyDetails?.code ?? "USD",
        currencySign: currencyDetails?.sign ?? "$",
      },
      bidStats: {
        count: bidStats?.bidCount ?? 0,
        avg: bidStats?.bidAvg ?? 0,
      },
      daysLeft: Number(raw.daysLeft ?? 0),
      client: {
        city: client?.address?.city,
        country: client?.address?.country,
        rating: client?.rating?.average ?? 0,
        reviewCount: client?.rating?.reviewCount ?? 0,
        memberSince: client?.registrationTime,
        verification: {
          payment: client?.verification?.paymentVerified ?? false,
          email: client?.verification?.emailVerified ?? false,
          phone: client?.verification?.phoneVerified ?? false,
          profile: client?.verification?.profileComplete ?? false,
          deposit: client?.verification?.depositMade ?? false,
        },
      },
      skills: ((raw.skills as { name?: string }[]) ?? []).map((s) => s.name ?? "").filter(Boolean),
    };
  }
}
