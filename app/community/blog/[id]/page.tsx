'use client';

import { BlogDetail } from '@/components/blog-detail';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return <BlogDetail />;
}