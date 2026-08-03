import "dotenv/config";
import { Octokit } from "octokit";
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

export async function createGuthubIssues(title: string, body?: string) {
  const issue = await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
  });
  return issue.data;
}

(async () => {
  const issue = await createGuthubIssues(
    "Test Issue from Octokit",
    "Hello world"
  );
  console.log(issue.html_url); // should print link to GitHub issue
})();
