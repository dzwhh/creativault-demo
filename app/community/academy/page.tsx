'use client';

import { useState } from 'react';
import { FeaturedCourseCarousel } from '@/components/featured-course-carousel';
import { CourseCard } from '@/components/course-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List } from 'lucide-react';

// Sample course data
const allCourses = [
  {
    id: '1',
    title: 'Complete Digital Marketing Mastery',
    description: 'Master all aspects of digital marketing from SEO to social media advertising and analytics.',
    instructor: 'Sarah Johnson',
    duration: '12 hours',
    students: 15420,
    rating: 4.8,
    level: 'Intermediate' as const,
    price: 89,
    originalPrice: 199,
    image: '/courses/digital-marketing.jpg',
    category: 'Marketing'
  },
  {
    id: '2',
    title: 'AI-Powered Content Creation',
    description: 'Learn to leverage AI tools for creating engaging content across multiple platforms.',
    instructor: 'Mike Chen',
    duration: '8 hours',
    students: 8930,
    rating: 4.9,
    level: 'Advanced' as const,
    price: 129,
    originalPrice: 249,
    image: '/courses/ai-content.jpg',
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Social Media Strategy Fundamentals',
    description: 'Build effective social media strategies that drive engagement and conversions.',
    instructor: 'Emma Davis',
    duration: '6 hours',
    students: 12650,
    rating: 4.7,
    level: 'Beginner' as const,
    price: 69,
    originalPrice: 149,
    image: '/courses/social-media.jpg',
    category: 'Marketing'
  },
  {
    id: '4',
    title: 'Data Analytics for Marketers',
    description: 'Transform data into actionable marketing insights with advanced analytics techniques.',
    instructor: 'David Wilson',
    duration: '10 hours',
    students: 6840,
    rating: 4.6,
    level: 'Intermediate' as const,
    price: 99,
    originalPrice: 179,
    image: '/courses/analytics.jpg',
    category: 'Analytics'
  },
  {
    id: '5',
    title: 'E-commerce Growth Strategies',
    description: 'Scale your online business with proven growth strategies and optimization techniques.',
    instructor: 'Lisa Park',
    duration: '14 hours',
    students: 11230,
    rating: 4.8,
    level: 'Advanced' as const,
    price: 149,
    originalPrice: 299,
    image: '/courses/ecommerce.jpg',
    category: 'Business'
  },
  {
    id: '6',
    title: 'Mobile App Marketing',
    description: 'Master mobile app promotion strategies across different platforms and channels.',
    instructor: 'Alex Chen',
    duration: '7 hours',
    students: 5680,
    rating: 4.5,
    level: 'Beginner' as const,
    price: 79,
    originalPrice: 139,
    image: '/courses/mobile-marketing.jpg',
    category: 'Marketing'
  }
];

const categories = ['All', 'Marketing', 'Technology', 'Analytics', 'Business'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter courses based on selected criteria
  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CreatiVault Academy</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Master digital marketing, analytics, and technology with expert-led courses designed for modern professionals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Featured Course Carousel */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h2>
          <FeaturedCourseCarousel />
        </section>

        {/* Course Selection and Filters */}
        <section>
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex border border-blue-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Badges */}
          <div className="space-y-4 mb-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Level</h3>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className={selectedLevel === level 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                    }
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredCourses.length} of {allCourses.length} courses
            </p>
            {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                  setSearchQuery('');
                }}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Clear all filters
              </Button>
            )}
          </div>

          {/* Course Cards Grid */}
          {filteredCourses.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  {...course}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                  setSearchQuery('');
                }}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}