import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = {
  default:
    "inline-flex items-center rounded-full border border-transparent bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500",
  secondary:
    "inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-900 transition-colors hover:bg-gray-200",
  destructive:
    "inline-flex items-center rounded-full border border-transparent bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white transition-colors hover:bg-red-500",
  outline:
    "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-900 transition-colors hover:bg-gray-50",
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants[variant], className)} {...props} />
  )
}

export { Badge }