import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import { GithubServices } from "../../../src/modules/features/github/usecase/GithubServices.ts";
import { LABELS } from "../../../src/shared/data/consts/githubIssuesTemplate/labels/labels.ts";

export async function main() {
  const token = process.env.GITHUB_TOKEN!;
  const owner = process.env.GITHUB_OWNER!;
  try {
    const githubService = new GithubServices(token, owner, "web-services");

    await githubService.ensureAllLabels(LABELS);
  } catch (error) {
    console.log(error);
  }
}

main();
