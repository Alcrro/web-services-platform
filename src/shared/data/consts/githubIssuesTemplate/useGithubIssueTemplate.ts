import { FeatureTemplate, SEO_READY_TEMPLATE } from "./githubIssuesTemplates";
interface IUseGithubIssuesTemplate {
  [key: string]: FeatureTemplate;
}
export const useGithubIssueTemplate: IUseGithubIssuesTemplate = {
  "starter-website-seo-ready": SEO_READY_TEMPLATE,
  "e-commerce-website-ecommerce-website-seo-analytics": SEO_READY_TEMPLATE,
};
