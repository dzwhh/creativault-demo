import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
  tabs?: ReactNode;
}

export function PageHeader({ title, description, className = "", tabs }: PageHeaderProps) {
  return (
    <div className={`bg-[#F8F9FA] border-b border-border ${className}`}>
      <div className="mx-0 pt-8 pb-3 px-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      </div>
      {tabs && (
        <div className="bg-background/30">
          {tabs}
        </div>
      )}
    </div>
  );
}