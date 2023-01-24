/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@code-editor/preview-pip",
    "@code-editor/monaco",
    "@code-editor/utils",
  ],
};

module.exports = nextConfig;
