'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Eye, User, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BlogPostCard } from '@/components/blog-post-card';
import { FeaturedPostSidebarItem } from '@/components/featured-post-sidebar-item';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  tags: string[];
  featuredImage: string;
  category?: string;
}

const featuredPost: BlogPost = {
  id: 'featured',
  title: 'Unlocking Business Efficiency with SaaS Solutions',
  excerpt: 'Discover how modern SaaS platforms are revolutionizing business operations and driving unprecedented efficiency gains across industries.',
  author: {
    name: 'Jennifer Taylor',
    avatar: '/avatars/jennifer.jpg',
    initials: 'JT'
  },
  publishedAt: 'March 15, 2024',
  readTime: 8,
  views: 2534,
  tags: ['Business', 'SaaS', 'Efficiency'],
  featuredImage: '/images/saas-business.jpg',
  category: 'Business'
};

const sidebarFeaturedPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Revolutionizing industries through SaaS implementation',
    excerpt: '',
    author: { name: 'Author', avatar: '', initials: 'A' },
    publishedAt: '',
    readTime: 0,
    views: 0,
    tags: [],
    featuredImage: '/images/featured-1.jpg'
  },
  {
    id: '2',
    title: 'Synergizing saas and UX design for elevating digital experiences',
    excerpt: '',
    author: { name: 'Author', avatar: '', initials: 'A' },
    publishedAt: '',
    readTime: 0,
    views: 0,
    tags: [],
    featuredImage: '/images/featured-2.jpg'
  },
  {
    id: '3',
    title: 'Navigating saas waters with intuitive UI and UX',
    excerpt: '',
    author: { name: 'Author', avatar: '', initials: 'A' },
    publishedAt: '',
    readTime: 0,
    views: 0,
    tags: [],
    featuredImage: '/images/featured-3.jpg'
  },
  {
    id: '4',
    title: 'Sculpting saas success - the art of UI and UX design',
    excerpt: '',
    author: { name: 'Author', avatar: '', initials: 'A' },
    publishedAt: '',
    readTime: 0,
    views: 0,
    tags: [],
    featuredImage: '/images/featured-4.jpg'
  },
  {
    id: '5',
    title: 'Transforming saas platforms - a UI/UX design odyssey',
    excerpt: '',
    author: { name: 'Author', avatar: '', initials: 'A' },
    publishedAt: '',
    readTime: 0,
    views: 0,
    tags: [],
    featuredImage: '/images/featured-5.jpg'
  }
];

const recentPosts: BlogPost[] = [
  {
    id: '6',
    title: 'Mastering UI Elements: A Practical Guide for Designers',
    excerpt: 'Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.',
    author: {
      name: 'Jennifer Taylor',
      avatar: '/avatars/jennifer.jpg',
      initials: 'JT'
    },
    publishedAt: 'March 12, 2024',
    readTime: 3,
    views: 1234,
    tags: ['Design', 'UI'],
    featuredImage: '/images/ui-guide.jpg'
  },
  {
    id: '7',
    title: 'Crafting Seamless Experiences: The Art of Intuitive UI Design',
    excerpt: 'Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive experience for your audience.',
    author: {
      name: 'Jennifer Taylor',
      avatar: '/avatars/jennifer.jpg',
      initials: 'JT'
    },
    publishedAt: 'March 10, 2024',
    readTime: 5,
    views: 2156,
    tags: ['Design', 'UX'],
    featuredImage: '/images/seamless-ui.jpg'
  },
  {
    id: '8',
    title: 'Beyond Aesthetics: The Power of Emotional UX Design',
    excerpt: 'Delve into the realm of emotional design and discover how incorporating empathy and psychological insights can elevate user experiences.',
    author: {
      name: 'Ryan A.',
      avatar: '/avatars/ryan.jpg',
      initials: 'RA'
    },
    publishedAt: 'March 8, 2024',
    readTime: 2,
    views: 1876,
    tags: ['UX', 'Psychology'],
    featuredImage: '/images/emotional-ux.jpg'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Post */}
            <div className="relative rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-400 to-gray-600 relative">
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                    {featuredPost.category}
                  </Badge>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    {featuredPost.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Recent Posts Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  All Posts
                </Button>
              </div>
              
              {/* Recent Posts Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/community/blog/${post.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                      {/* Post Image */}
                      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-400 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        {/* Author Info */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-blue-600">{post.author.initials}</span>
                            <span>{post.author.name}</span>
                          </div>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-blue-100" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Other featured posts</h3>
              
              <div className="space-y-4">
                {sidebarFeaturedPosts.map((post) => (
                  <Link key={post.id} href={`/community/blog/${post.id}`}>
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      {/* Post Thumbnail */}
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      </div>
                      
                      {/* Post Title */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-3 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}