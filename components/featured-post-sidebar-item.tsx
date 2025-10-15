import Image from "next/image";

interface FeaturedPostSidebarItemProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
}

export function FeaturedPostSidebarItem({
  imageSrc,
  imageAlt,
  title
}: FeaturedPostSidebarItemProps) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt}
        width={64}
        height={64}
        className="aspect-square rounded-md object-cover"
      />
      <h4 className="text-sm leading-snug font-medium">{title}</h4>
    </div>
  );
}