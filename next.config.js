/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // 忽略 TypeScript 构建错误（仅用于演示部署）
  typescript: {
    ignoreBuildErrors: true,
  },
  // 忽略 ESLint 错误（仅用于演示部署）
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;