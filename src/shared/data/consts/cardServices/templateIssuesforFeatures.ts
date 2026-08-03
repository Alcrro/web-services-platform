export const featureIssueTemplates = {
  // Starter Website
  "starter-website-seo-ready": [
    {
      title: "Add Meta Tags and SEO Settings",
      body: "Add meta tags (title, description, keywords) and OpenGraph tags for SEO.",
      labels: ["seo", "frontend", "junior-dev"],
    },
    {
      title: "Generate Sitemap and Robots.txt",
      body: "Add sitemap.xml and robots.txt dynamically during build for proper crawling.",
      labels: ["seo", "devops", "mid-dev"],
    },
  ],

  "starter-website-responsive": [
    {
      title: "Responsive Layout Setup",
      body: "Ensure layout and typography scale across devices using CSS Grid and Tailwind responsive utilities.",
      labels: ["frontend", "ui", "junior-dev"],
    },
  ],

  "starter-website-contact-form": [
    {
      title: "Setup Contact Form UI",
      body: "Build responsive form with proper fields and error handling.",
      labels: ["frontend", "ui"],
    },
    {
      title: "Integrate Email Notification Service",
      body: "Send notification emails via API route or external provider when users submit form.",
      labels: ["backend", "email", "senior-dev"],
    },
  ],

  // E-commerce Website
  "ecommerce-website-payment-gateway": [
    {
      title: "Integrate Payment Gateway",
      body: "Set up Stripe/PayPal integration for checkout process.",
      labels: ["backend", "payments", "senior-dev"],
    },
    {
      title: "Handle Payment Webhooks",
      body: "Implement webhook handler to verify transactions and update order status.",
      labels: ["backend", "api", "mid-dev"],
    },
  ],

  // CRM
  "crm-dashboard": [
    {
      title: "Design Dashboard Layout",
      body: "Create UI for dashboard with KPIs and summary widgets.",
      labels: ["frontend", "ui"],
    },
    {
      title: "Implement Data Fetching and API Calls",
      body: "Connect the dashboard to backend API endpoints for stats and charts.",
      labels: ["backend", "api", "mid-dev"],
    },
  ],

  "automation-webhooks": [
    {
      title: "Setup Webhook Receiver",
      body: "Create endpoint to receive and verify incoming webhook events.",
      labels: ["backend", "api", "senior-dev"],
    },
    {
      title: "Process Webhook Payloads",
      body: "Transform and enqueue webhook data for downstream systems.",
      labels: ["backend", "queue", "senior-dev"],
    },
  ],
};
