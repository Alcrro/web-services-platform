import {
  FeatureTemplate,
  LabelTypes,
} from "../../../../../shared/data/consts/githubIssuesTemplate/githubIssuesTemplates.ts";
import { LABELS } from "../../../../../shared/data/consts/githubIssuesTemplate/labels/labels.ts";
import { Octokit } from "octokit";

type IGithubProps = {
  title: string | number;
  body?: string | undefined;
  assignee?: string | null | undefined;
  milestone?: string | number | null | undefined;
  labels?: LabelTypes[];
  assignees?: string[] | undefined;
  type?: string | null | undefined;
  repo?: string;
};

type LabelType = {
  [key: string]: {
    name: string;
    color: string;
    description: string;
  };
};

export class GithubServices {
  private readonly client: Octokit;

  constructor(
    private readonly token: string,
    private readonly owner: string,
    private readonly repo: string
  ) {
    this.client = new Octokit({ auth: this.token });
  }

  async createRepository(
    name: string,
    isPrivate: boolean | true,
    description?: string
  ) {
    try {
      const response = await this.client.rest.repos.createForAuthenticatedUser({
        name,
        description,
        private: isPrivate,
      });
      console.log("Repo created at: ", response.data.html_url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createIssues({ title, body, labels }: IGithubProps) {
    try {
      const parentIssue = await this.client.rest.issues.create({
        owner: this.owner,
        repo: this.repo,
        title,
        body: body || "",
        labels: labels || undefined,
      });
      return parentIssue.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createFeatureIssues(orderId: string, template: FeatureTemplate) {
    let parentBody = template.description || "";

    if (template.subtasks) {
      const tasksMarkdown = template.subtasks
        .map((sub) => `- [ ] ${sub.title} - ${sub.description || ""}`)
        .join("\n");
      parentBody += `\n\n### Subtasks\n${tasksMarkdown}`;
    }

    const parentLabels = [LABELS.epic.name][0];

    const parentTitle = `${parentLabels.toUpperCase()} [Order ${orderId}] ${
      template.feature
    }`;
    const parent = await this.createIssues({
      title: parentTitle,
      body: parentBody,

      labels: template.labels ?? undefined,
    });

    // Optionally, still create individual issues for subtasks
    if (template.subtasks) {
      for (const sub of template.subtasks) {
        await this.createIssues({
          title: `[Order ${orderId}] ${template.feature} - ${sub.title}`,
          body: `Parent Issue: #${parent.number}\n${sub.description || ""}`,
          labels: sub.labels || template.labels,
        });
      }
    }

    return parent;
  }

  private async ensureLabel(
    name: string,
    color?: string,
    description?: string
  ) {
    try {
      await this.client.rest.issues.getLabel({
        owner: this.owner,
        repo: this.repo,
        name,
      });
    } catch {
      await this.client.rest.issues.createLabel({
        owner: this.owner,
        repo: this.repo,
        name,
        color,
        description,
      });
    }
  }

  async ensureAllLabels(labels: LabelType) {
    // 1. Get all existing labels in the repository
    const existingLabels = await this.client.rest.issues.listLabelsForRepo({
      owner: this.owner,
      repo: this.repo,
    });
    const existingLabelNames = existingLabels.data.map((label) => label.name);

    for (const label of Object.values(labels)) {
      if (!existingLabelNames.includes(label.name)) {
        await this.ensureLabel(label.name, label.color, label.description);
      }
    }
  }

  async getBy(options: {
    name: string;
    status: "open" | "closed" | "all" | undefined;
  }) {
    try {
      const issues = await this.client.rest.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,

        assignee: options.name,
        state: options.status || "open",
      });

      return issues.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
