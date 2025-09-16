import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
  tabs?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, description, className = "", tabs, actions }: PageHeaderProps) {
  return (
    <div className={`bg-[#F8F9FA] border-b border-border ${className}`}>
      <div className="mx-0 pt-8 pb-3 px-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-foreground">
            {title}
          </h1>
          {actions}
        </div>
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