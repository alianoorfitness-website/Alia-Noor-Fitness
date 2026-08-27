import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity serves all uploaded assets from this single CDN host,
    // regardless of project — the path itself is scoped to the project ID
    // and dataset, so this pattern is safe to allow globally.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  // Required for the styled-components registry used by embedded Sanity
  // Studio (next-sanity's peer dependency). Has no effect on the public
  // site, which does not use styled-components.
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
