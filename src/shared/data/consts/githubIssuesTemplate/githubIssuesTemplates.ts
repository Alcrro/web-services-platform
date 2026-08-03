import { LABELS } from "./labels/labels";

type NestedLabelNameTypes<T extends Record<string, { name: string }>> =
  T[keyof T];

export type LabelTypes = NonNullable<
  NestedLabelNameTypes<typeof LABELS>["name"]
>;

export type FeatureTemplate = {
  serviceId?: string;
  key: string; // unique, matches DB
  feature: string; // human-readable title
  description?: string;
  labels?: LabelTypes[];
  subtasks?: { title: string; description?: string; labels: LabelTypes[] }[];
};

// Example templates with keys
export const SEO_READY_TEMPLATE: FeatureTemplate = {
  key: "seo-ready",
  feature: "SEO Ready",
  description: "Optimized for Google search to help customers find you easily.",
  labels: [LABELS.epic.name, LABELS.high_priority.name], // parent issue labels
  subtasks: [
    {
      title: "Keyword research",
      description: "Identify main and secondary keywords for the website.",
      labels: [LABELS.frontend.name, LABELS.optimization.name],
    },
    {
      title: "Meta tags optimization",
      description: "Add proper meta titles, descriptions, and header tags.",
      labels: [LABELS.frontend.name, LABELS.UI.name, LABELS.UX.name],
    },
    {
      title: "Alt tags for images",
      description: "Add descriptive alt text to all website images.",
      labels: [LABELS.accessibility.name, LABELS.UI.name],
    },
    {
      title: "Sitemap & robots.txt",
      description: "Generate sitemap.xml and configure robots.txt.",
      labels: [LABELS.backend.name, LABELS.optimization.name],
    },
    {
      title: "Testing & validation",
      description:
        "Check Google Search Console for errors and indexing issues.",
      labels: [LABELS.test.name, LABELS.integration_test.name],
    },
  ],
};
