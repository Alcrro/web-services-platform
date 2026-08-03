import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, body: description } = body;

  try {
    const issue = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      description,
    });
    return Response.json(issue.status);
  } catch (err) {
    console.error(err);
    return NextResponse.json("Failed to create GitHub issue");
  }
}
