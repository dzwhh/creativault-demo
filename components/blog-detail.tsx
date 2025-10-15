'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Twitter, Facebook, Linkedin, ThumbsUp } from 'lucide-react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

interface BlogDetailProps {
  post?: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar: string;
      initials: string;
    };
    publishedAt: string;
    category: string;
    featuredImage: string;
    readTime: number;
  };
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      initials: 'S'
    },
    content: "This is exactly what I needed! The personalization tips are incredibly valuable. I've been struggling with low open rates, and this gives me a clear direction to improve.",
    timestamp: '2 hours ago',
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      initials: 'M'
    },
    content: 'Great insights on email personalization. I especially liked the section about adding elements that spark interest. Have you tested A/B variations of these techniques?',
    timestamp: '5 hours ago',
    likes: 8,
    isLiked: false
  },
  {
    id: '3',
    author: {
      name: 'Emily Rodriguez',
      avatar: '/avatars/emily.jpg',
      initials: 'E'
    },
    content: 'Thanks for sharing this comprehensive guide! The practical examples make it easy to understand how to implement these strategies in our own campaigns.',
    timestamp: '1 day ago',
    likes: 15,
    isLiked: true
  }
];

export function BlogDetail({ post }: BlogDetailProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const defaultPost = {
    id: 'default',
    title: 'The Best Way to Write a Recurring Email Newsletter',
    content: `You cannot avoid the importance of the first outreach email for increasing your sales in the email campaign. But how can you move customers from this level and make a meaningful and personalized response?

Personalizing the emails for prospects and clients can get you the results you want from your email marketing strategy. As a result, you can engage prospects and drive them toward action, leading to a successful lead prospecting strategy in your sales outreach emails.

Although you cannot personalize every email with great accuracy, you can add a few elements that are enough to spark interest.

To get you in the right direction, here is the complete guide to email personalization for sales outreach that will help you create more engaging and effective email campaigns.

The key to successful email marketing lies in understanding your audience deeply and crafting messages that resonate with their specific needs, challenges, and goals. This approach not only improves open rates but also builds stronger relationships with your prospects.`,
    author: {
      name: 'Esther Howard',
      avatar: '/avatars/esther.jpg',
      initials: 'EH'
    },
    publishedAt: 'Nov 24, 2023',
    category: 'Company',
    featuredImage: '/images/email-newsletter.jpg',
    readTime: 8
  };

  const currentPost = post || defaultPost;

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          avatar: '',
          initials: 'Y'
        },
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                {currentPost.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {currentPost.title}
            </h1>

            {/* Author Info & Share */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentPost.author.avatar} alt={currentPost.author.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {currentPost.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">by {currentPost.author.name}</p>
                  <p className="text-sm text-gray-500">{currentPost.publishedAt}</p>
                </div>
              </div>

              {/* Share Section */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 mr-2">SHARE THIS</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50"
                  >
                    <Twitter className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50"
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50"
                  >
                    <Linkedin className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Desk Setup Illustration */}
                <div className="absolute inset-0 bg-gray-300">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* Keyboard */}
                    <div className="w-48 h-16 bg-white rounded-lg shadow-lg mb-4 relative">
                      <div className="grid grid-cols-14 gap-1 p-2">
                        {Array.from({ length: 56 }).map((_, i) => (
                          <div key={i} className="h-2 bg-gray-200 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                    {/* Mouse */}
                    <div className="w-12 h-20 bg-white rounded-full shadow-lg absolute -left-20 top-0"></div>
                    {/* Green accents */}
                    <div className="w-16 h-4 bg-green-500 rounded absolute -right-24 top-2"></div>
                    <div className="w-8 h-8 bg-green-500 rounded absolute -left-32 -top-4"></div>
                    <div className="w-20 h-6 bg-green-500 rounded absolute right-0 -bottom-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-700 leading-relaxed space-y-6 text-base">
              {currentPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Comments Section */}
          <section className="bg-white rounded-lg p-6 border border-blue-100" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            {/* Comments Header */}
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Comments ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <div className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-blue-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
              <div className="flex justify-end mt-3">
                <Button
                  onClick={handleCommentSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  {/* Avatar */}
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                      {comment.author.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    {/* Author & Timestamp */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{comment.author.name}</span>
                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                    </div>

                    {/* Comment Text */}
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {comment.content}
                    </p>

                    {/* Comment Actions */}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeComment(comment.id)}
                        className={`text-sm gap-1 ${comment.isLiked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm text-gray-500 hover:text-blue-600"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}