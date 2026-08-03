/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Enable the most effective optimizations
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@mui/material",
      "@mui/icons-material",
      "date-fns",
    ],
  },

  // Remove unnecessary JS in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Reduce polyfills / reduce JS output size

  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
  },

  // Keep redirects and rewrites if needed
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
