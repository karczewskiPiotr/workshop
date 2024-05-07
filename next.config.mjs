import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build.
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Marks `oslo/password` dependencies as external to avoid bundling them.
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  redirects: async () => [
    { source: "/", destination: "/login", permanent: true },
  ],
};

export default nextConfig;
