// src/scripts/github-test.ts
import { Octokit } from "octokit";
import "dotenv/config";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

async function createGitHubIssue(title: string, body?: string) {
  const issue = await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
  });
  return issue.data;
}

async function fetchAllIssues() {
  try {
    const issues = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "all", // "open", "closed", or "all"
      per_page: 100, // pagination
    });

    return issues.data.map((issue) => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      body: issue.body,
      state: issue.state,
      labels: issue.labels.map((label) =>
        typeof label === "string" ? label : label.name
      ),
      assignee: issue.assignee?.login || null,
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      url: issue.html_url,
    }));
  } catch (err) {
    console.error("Failed to fetch issues:", err);
    return [];
  }
}

(async () => {
  const issues = await fetchAllIssues();
  console.log("Fetched issues:", issues);
})();
