'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  Star, 
  Heart,
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

// Sample course data - in real app this would come from API
const courseData = {
  '1': {
    id: '1',
    title: 'Complete Digital Marketing Mastery',
    description: 'In this comprehensive course, we\'ll delve into the fundamentals of digital marketing and explore the critical principles of modern marketing strategies. Whether you\'re a seasoned marketing professional or just starting your journey, this course is designed to equip you with the essential skills and knowledge needed to excel in the field.',
    instructor: 'Sarah Johnson',
    duration: '12 hours',
    students: 15420,
    rating: 4.8,
    level: 'Intermediate',
    price: 89,
    originalPrice: 199,
    image: '/courses/digital-marketing.jpg',
    category: 'Marketing',
    curriculum: [
      {
        id: 1,
        title: 'Introduction to Digital Marketing',
        duration: '0:23',
        completed: true
      },
      {
        id: 2,
        title: 'Digital Marketing Goals and More',
        duration: '0:11',
        completed: false
      },
      {
        id: 3,
        title: 'Creating Marketing Campaigns',
        duration: '7:32',
        completed: false
      },
      {
        id: 4,
        title: 'Analyzing Campaign Results',
        duration: '6:34',
        completed: false
      },
      {
        id: 5,
        title: 'Social Media Strategy',
        duration: '2:56',
        completed: false
      },
      {
        id: 6,
        title: 'SEO and Content Marketing',
        duration: '1:23',
        completed: false
      },
      {
        id: 7,
        title: 'Email Marketing Best Practices',
        duration: '2:34',
        completed: false
      },
      {
        id: 8,
        title: 'Paid Advertising Strategies',
        duration: '8:21',
        completed: false
      },
      {
        id: 9,
        title: 'Analytics and Measurement',
        duration: '6:18',
        completed: false
      },
      {
        id: 10,
        title: 'Advanced Marketing Techniques',
        duration: '3:42',
        completed: false
      },
      {
        id: 11,
        title: 'Building Marketing Funnels',
        duration: '1:34',
        completed: false
      },
      {
        id: 12,
        title: 'Creating a Marketing Plan',
        duration: '2:01',
        completed: false
      }
    ]
  },
  '2': {
    id: '2',
    title: 'AI-Powered Content Creation',
    description: 'Learn to leverage AI tools for creating engaging content across multiple platforms. This advanced course covers the latest AI technologies and how to integrate them into your content creation workflow.',
    instructor: 'Mike Chen',
    duration: '8 hours',
    students: 8930,
    rating: 4.9,
    level: 'Advanced',
    price: 129,
    originalPrice: 249,
    image: '/courses/ai-content.jpg',
    category: 'Technology',
    curriculum: [
      {
        id: 1,
        title: 'Introduction to AI Content Tools',
        duration: '0:15',
        completed: true
      },
      {
        id: 2,
        title: 'Text Generation with AI',
        duration: '1:20',
        completed: false
      },
      {
        id: 3,
        title: 'Image Creation and Editing',
        duration: '2:10',
        completed: false
      },
      {
        id: 4,
        title: 'Video Content with AI',
        duration: '1:45',
        completed: false
      },
      {
        id: 5,
        title: 'AI Content Strategy',
        duration: '0:50',
        completed: false
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Social Media Strategy Fundamentals',
    description: 'Build effective social media strategies that drive engagement and conversions. This comprehensive course covers platform-specific strategies, content planning, and performance measurement.',
    instructor: 'Emma Davis',
    duration: '6 hours',
    students: 12650,
    rating: 4.7,
    level: 'Beginner',
    price: 69,
    originalPrice: 149,
    image: '/courses/social-media.jpg',
    category: 'Marketing',
    curriculum: [
      {
        id: 1,
        title: 'Introduction to Social Media Marketing',
        duration: '0:18',
        completed: true
      },
      {
        id: 2,
        title: 'Platform Overview and Selection',
        duration: '0:45',
        completed: false
      },
      {
        id: 3,
        title: 'Content Strategy Development',
        duration: '1:20',
        completed: false
      },
      {
        id: 4,
        title: 'Creating Engaging Content',
        duration: '1:15',
        completed: false
      },
      {
        id: 5,
        title: 'Community Management',
        duration: '0:55',
        completed: false
      },
      {
        id: 6,
        title: 'Measuring Social Media Success',
        duration: '1:27',
        completed: false
      }
    ]
  },
  '4': {
    id: '4',
    title: 'Data Analytics for Marketers',
    description: 'Transform data into actionable marketing insights with advanced analytics techniques. Learn to use analytics tools effectively and make data-driven marketing decisions.',
    instructor: 'David Wilson',
    duration: '10 hours',
    students: 6840,
    rating: 4.6,
    level: 'Intermediate',
    price: 99,
    originalPrice: 179,
    image: '/courses/analytics.jpg',
    category: 'Analytics',
    curriculum: [
      {
        id: 1,
        title: 'Introduction to Marketing Analytics',
        duration: '0:25',
        completed: true
      },
      {
        id: 2,
        title: 'Setting Up Analytics Tools',
        duration: '1:10',
        completed: false
      },
      {
        id: 3,
        title: 'Understanding Key Metrics',
        duration: '1:35',
        completed: false
      },
      {
        id: 4,
        title: 'Data Collection and Processing',
        duration: '2:05',
        completed: false
      },
      {
        id: 5,
        title: 'Creating Analytics Reports',
        duration: '1:40',
        completed: false
      },
      {
        id: 6,
        title: 'Advanced Analytics Techniques',
        duration: '2:15',
        completed: false
      },
      {
        id: 7,
        title: 'Making Data-Driven Decisions',
        duration: '1:50',
        completed: false
      }
    ]
  },
  '5': {
    id: '5',
    title: 'E-commerce Growth Strategies',
    description: 'Scale your online business with proven growth strategies and optimization techniques. Learn conversion optimization, customer retention, and advanced e-commerce tactics.',
    instructor: 'Lisa Park',
    duration: '14 hours',
    students: 11230,
    rating: 4.8,
    level: 'Advanced',
    price: 149,
    originalPrice: 299,
    image: '/courses/ecommerce.jpg',
    category: 'Business',
    curriculum: [
      {
        id: 1,
        title: 'E-commerce Fundamentals',
        duration: '0:30',
        completed: true
      },
      {
        id: 2,
        title: 'Conversion Rate Optimization',
        duration: '2:15',
        completed: false
      },
      {
        id: 3,
        title: 'Customer Acquisition Strategies',
        duration: '1:50',
        completed: false
      },
      {
        id: 4,
        title: 'Retention and Loyalty Programs',
        duration: '1:30',
        completed: false
      },
      {
        id: 5,
        title: 'Advanced SEO for E-commerce',
        duration: '2:20',
        completed: false
      },
      {
        id: 6,
        title: 'International Expansion',
        duration: '1:45',
        completed: false
      },
      {
        id: 7,
        title: 'Scaling Operations',
        duration: '2:10',
        completed: false
      },
      {
        id: 8,
        title: 'Future of E-commerce',
        duration: '1:40',
        completed: false
      }
    ]
  },
  '6': {
    id: '6',
    title: 'Mobile App Marketing',
    description: 'Master mobile app promotion strategies across different platforms and channels. Learn app store optimization, user acquisition, and retention strategies.',
    instructor: 'Alex Chen',
    duration: '7 hours',
    students: 5680,
    rating: 4.5,
    level: 'Beginner',
    price: 79,
    originalPrice: 139,
    image: '/courses/mobile-marketing.jpg',
    category: 'Marketing',
    curriculum: [
      {
        id: 1,
        title: 'Introduction to App Marketing',
        duration: '0:20',
        completed: true
      },
      {
        id: 2,
        title: 'App Store Optimization',
        duration: '1:25',
        completed: false
      },
      {
        id: 3,
        title: 'User Acquisition Strategies',
        duration: '1:40',
        completed: false
      },
      {
        id: 4,
        title: 'In-App Engagement',
        duration: '1:15',
        completed: false
      },
      {
        id: 5,
        title: 'Retention and Re-engagement',
        duration: '1:30',
        completed: false
      },
      {
        id: 6,
        title: 'Analytics and Attribution',
        duration: '1:10',
        completed: false
      }
    ]
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [isFavorited, setIsFavorited] = useState(false);
  const [expandedSection, setExpandedSection] = useState('curriculum');

  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Courses
              </Button>
              <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                {course.title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                All Videos
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                Resources
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Video Area */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-cyan-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  Introduction to {course.category}
                </div>
              </div>

              {/* Course Information */}
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h1>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{course.category} Course:</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What You'll Learn:</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Gain practical skills and knowledge in {course.category.toLowerCase()} through hands-on exercises, real-world case studies, and expert guidance. This course combines theoretical foundations with practical applications to ensure you can immediately apply what you learn in your professional work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Course Details */}
          <div className="space-y-6">
            {/* Course Level Tags */}
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                {course.level}
              </Badge>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                Live Class
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                24 Classes
              </Badge>
            </div>

            {/* Enroll Button */}
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg font-semibold">
              <Play className="h-5 w-5 mr-2" />
              Enroll Now
            </Button>

            {/* Add to Favorites */}
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              Add to Favorites
            </Button>

            {/* Course Curriculum */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setExpandedSection(expandedSection === 'curriculum' ? '' : 'curriculum')}
                className="w-full px-4 py-3 flex items-center justify-between text-left border-b border-gray-200 hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-900">Course Curriculum</span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
                  expandedSection === 'curriculum' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {expandedSection === 'curriculum' && (
                <div className="p-4">
                  <div className="space-y-2">
                    {course.curriculum.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {lesson.title}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Course Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{course.students.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-600">{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Instructor: {course.instructor}</span>
                </div>
              </div>
            </div>

            {/* Instructor Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Instructor</h3>
              
              <div className="flex items-start gap-3">
                {/* Instructor Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {course.instructor.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                </div>
                
                {/* Instructor Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{course.instructor}</h4>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-3 w-3 ${
                          star <= Math.floor(course.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">{course.rating} rating</span>
                  </div>
                  
                  {/* Instructor Bio */}
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Expert in {course.category.toLowerCase()} with years of industry experience. Passionate about teaching and helping students succeed in their careers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}