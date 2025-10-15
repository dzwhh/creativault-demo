'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, Users, Star, Play } from 'lucide-react';

interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  level: string;
}

const featuredCourses: FeaturedCourse[] = [
  {
    id: '1',
    title: 'Complete Digital Marketing Mastery',
    description: 'Master all aspects of digital marketing from SEO to social media advertising and analytics.',
    instructor: 'Sarah Johnson',
    duration: '12 hours',
    students: 15420,
    rating: 4.8,
    price: 89,
    originalPrice: 199,
    image: '/courses/digital-marketing.jpg',
    category: 'Marketing',
    level: 'Intermediate'
  },
  {
    id: '2',
    title: 'AI-Powered Content Creation',
    description: 'Learn to leverage AI tools for creating engaging content across multiple platforms.',
    instructor: 'Mike Chen',
    duration: '8 hours',
    students: 8930,
    rating: 4.9,
    price: 129,
    originalPrice: 249,
    image: '/courses/ai-content.jpg',
    category: 'Technology',
    level: 'Advanced'
  },
  {
    id: '3',
    title: 'Social Media Strategy Fundamentals',
    description: 'Build effective social media strategies that drive engagement and conversions.',
    instructor: 'Emma Davis',
    duration: '6 hours',
    students: 12650,
    rating: 4.7,
    price: 69,
    originalPrice: 149,
    image: '/courses/social-media.jpg',
    category: 'Marketing',
    level: 'Beginner'
  }
];

export function FeaturedCourseCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentCourse = featuredCourses[currentSlide];

  const handleStartLearning = () => {
    router.push(`/community/academy/${currentCourse.id}`);
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden border border-blue-100" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
      {/* Main Carousel Content */}
      <div className="relative h-80 md:h-96">
        {/* Background Image Area */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Course Info */}
              <div className="text-white space-y-4">
                {/* Category & Level */}
                <div className="flex gap-2">
                  <Badge className="bg-white bg-opacity-20 text-white backdrop-blur-sm">
                    {currentCourse.category}
                  </Badge>
                  <Badge className="bg-white bg-opacity-20 text-white backdrop-blur-sm">
                    {currentCourse.level}
                  </Badge>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  {currentCourse.title}
                </h2>

                {/* Description */}
                <p className="text-white text-opacity-90 leading-relaxed">
                  {currentCourse.description}
                </p>

                {/* Instructor */}
                <p className="text-white text-opacity-80">
                  Instructor: <span className="font-semibold">{currentCourse.instructor}</span>
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-6 text-sm text-white text-opacity-80">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{currentCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{currentCourse.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{currentCourse.rating}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">
                      ${currentCourse.price}
                    </span>
                    {currentCourse.originalPrice && (
                      <span className="text-white text-opacity-60 line-through">
                        ${currentCourse.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button 
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                    onClick={handleStartLearning}
                  >
                    Start Learning
                  </Button>
                </div>
              </div>

              {/* Course Preview */}
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-64 h-40 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm border border-white border-opacity-20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-opacity-30 transition-all">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white text-blue-600 px-2 py-1 rounded text-xs font-medium">
                    Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 backdrop-blur-sm border-white hover:bg-opacity-100 h-10 w-10 p-0"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 backdrop-blur-sm border-white hover:bg-opacity-100 h-10 w-10 p-0"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {featuredCourses.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}