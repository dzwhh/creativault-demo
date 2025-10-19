import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // 评分值，范围 0-5
  maxRating?: number; // 最大评分，默认 5
  size?: 'sm' | 'md' | 'lg'; // 星星大小
  showValue?: boolean; // 是否显示数值
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  className,
}: StarRatingProps) {
  // 确保评分在有效范围内
  const clampedRating = Math.max(0, Math.min(rating, maxRating));
  
  // 星星尺寸映射
  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  // 文字尺寸映射
  const textSizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // 渲染单个星星
  const renderStar = (index: number) => {
    const fillPercentage = Math.max(0, Math.min(1, clampedRating - index));
    const starId = `star-${index}-${Math.random()}`;
    
    return (
      <div key={index} className="relative inline-block">
        <svg
          className={cn(sizeMap[size], 'text-gray-300')}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        
        {fillPercentage > 0 && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage * 100}%` }}
          >
            <svg
              className={cn(sizeMap[size], 'text-yellow-400')}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* 星星显示 */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      
      {/* 数值显示 */}
      {showValue && (
        <span className={cn('font-medium text-gray-900', textSizeMap[size])}>
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
