import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPostCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatarSrc: string;
  readTime: string;
}

export function BlogPostCard({
  imageSrc,
  imageAlt,
  title,
  description,
  authorName,
  authorAvatarSrc,
  readTime
}: BlogPostCardProps) {
  return (
    <div className="bg-card text-card-foreground overflow-hidden rounded-lg border">
      <img
        src={imageSrc}
        alt={imageAlt}
        width={400}
        height={225}
        className="h-48 w-full object-cover"
      />
      <div className="grid gap-2 p-4">
        <h3 className="text-lg leading-tight font-semibold">{title}</h3>
        <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Avatar className="h-6 w-6">
            <AvatarImage src={authorAvatarSrc || "/placeholder.svg"} />
            <AvatarFallback>
              {authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>{authorName}</span>
          <span>•</span>
          <span>{readTime} read</span>
        </div>
      </div>
    </div>
  );
}