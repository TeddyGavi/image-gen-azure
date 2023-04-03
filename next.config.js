/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["imageai24cfdc4.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
