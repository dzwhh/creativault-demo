'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, BookOpen } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

export function CourseCard({
  id,
  title,
  description,
  instructor,
  duration,
  students,
  rating,
  level,
  price,
  originalPrice,
  image,
  category
}: CourseCardProps) {
  const router = useRouter();

  const handleCourseClick = () => {
    router.push(`/community/academy/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer" 
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
      onClick={handleCourseClick}
    >
      {/* Course Image */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-cyan-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-blue-400" />
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
            {category}
          </Badge>
        </div>
        
        {/* Level Badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className={`text-xs ${
              level === 'Beginner' ? 'bg-green-100 text-green-700' :
              level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}
          >
            {level}
          </Badge>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        {/* Instructor */}
        <p className="text-sm text-blue-600 font-medium">
          by {instructor}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}