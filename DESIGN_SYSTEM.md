# CreatiVaultAI Design System

> A comprehensive design system documentation for CreatiVaultAI project

## Overview

CreatiVaultAI uses a modern design system built on:
- **Framework**: Next.js 14 + React 18
- **Styling**: Tailwind CSS 3.3+
- **Components**: Radix UI primitives
- **Font**: Plus Jakarta Sans
- **Icons**: Lucide React

---

## 1. Color System

### 1.1 Core Colors (Light Mode)

| Token | HSL Value | Hex | Usage |
|-------|-----------|-----|-------|
| `--background` | 0 0% 100% | #FFFFFF | Page backgrounds |
| `--foreground` | 0 0% 3.9% | #0A0A0A | Primary text |
| `--primary` | 0 0% 9% | #171717 | Primary buttons, links |
| `--primary-foreground` | 0 0% 98% | #FAFAFA | Text on primary |
| `--secondary` | 0 0% 96.1% | #F5F5F5 | Secondary elements |
| `--muted` | 0 0% 96.1% | #F5F5F5 | Subtle backgrounds |
| `--muted-foreground` | 0 0% 45.1% | #737373 | Secondary text |
| `--accent` | 0 0% 96.1% | #F5F5F5 | Highlights |
| `--destructive` | 0 84.2% 60.2% | #EF4444 | Error states |
| `--border` | 0 0% 89.8% | #E5E5E5 | Borders |
| `--input` | 0 0% 89.8% | #E5E5E5 | Input borders |
| `--ring` | 0 0% 3.9% | #0A0A0A | Focus rings |

### 1.2 Core Colors (Dark Mode)

| Token | HSL Value | Hex |
|-------|-----------|-----|
| `--background` | 0 0% 3.9% | #0A0A0A |
| `--foreground` | 0 0% 98% | #FAFAFA |
| `--primary` | 0 0% 98% | #FAFAFA |
| `--secondary` | 0 0% 14.9% | #262626 |
| `--muted` | 0 0% 14.9% | #262626 |
| `--muted-foreground` | 0 0% 63.9% | #A3A3A3 |
| `--border` | 0 0% 14.9% | #262626 |

### 1.3 Plugin Theme (Blue)

| Token | HSL Value | Hex | Usage |
|-------|-----------|-----|-------|
| `--plugin-bg` | 210 40% 98% | #F8FAFC | Plugin backgrounds |
| `--plugin-primary` | 211 96% 50% | #0B7CFF | Primary actions |
| `--plugin-primary-light` | 211 96% 96% | #EBF5FF | Hover highlights |
| `--plugin-accent` | 199 89% 48% | #0EA5E9 | Gradients, accents |
| `--plugin-success` | 142 76% 36% | #16A34A | Success states |

### 1.4 Platform Brand Colors

| Platform | HSL Value | Hex |
|----------|-----------|-----|
| TikTok | 349 100% 60% | #FF3366 |
| Instagram | 340 75% 54% | #E1306C |
| YouTube | 0 100% 50% | #FF0000 |

### 1.5 Chart Colors

```css
--chart-1: hsl(12 76% 61%);   /* Coral */
--chart-2: hsl(173 58% 39%);  /* Teal */
--chart-3: hsl(197 37% 24%);  /* Dark Cyan */
--chart-4: hsl(43 74% 66%);   /* Gold */
--chart-5: hsl(27 87% 67%);   /* Orange */
```

---

## 2. Typography

### 2.1 Font Family

```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
```

Font weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### 2.2 Type Scale

| Style | Size | Weight | Line Height | Class |
|-------|------|--------|-------------|-------|
| Page Title | 30px | 700 | 1.2 | `text-3xl font-bold` |
| Card Title | 24px | 600 | 1.2 | `text-2xl font-semibold leading-none tracking-tight` |
| Dialog Title | 18px | 600 | 1.2 | `text-lg font-semibold leading-none tracking-tight` |
| Body | 14px | 400 | 1.5 | `text-sm` |
| Label | 14px | 500 | 1.5 | `text-sm font-medium leading-none` |
| Small/Caption | 12px | 400 | 1.4 | `text-xs` |
| Muted | 14px | 400 | 1.5 | `text-sm text-muted-foreground` |

---

## 3. Spacing

Based on Tailwind's default 4px grid:

| Token | rem | px | Class |
|-------|-----|-----|-------|
| 1 | 0.25rem | 4px | `p-1`, `m-1`, `gap-1` |
| 1.5 | 0.375rem | 6px | `p-1.5`, `gap-1.5` |
| 2 | 0.5rem | 8px | `p-2`, `m-2`, `gap-2` |
| 3 | 0.75rem | 12px | `p-3`, `m-3`, `gap-3` |
| 4 | 1rem | 16px | `p-4`, `m-4`, `gap-4` |
| 5 | 1.25rem | 20px | `p-5`, `m-5`, `gap-5` |
| 6 | 1.5rem | 24px | `p-6`, `m-6`, `gap-6` |
| 8 | 2rem | 32px | `p-8`, `m-8`, `gap-8` |

---

## 4. Border Radius

| Token | Value | Class |
|-------|-------|-------|
| sm | 4px | `rounded-sm` |
| md | 6px | `rounded-md` |
| lg | 8px | `rounded-lg` |
| xl | 12px | `rounded-xl` |
| full | 9999px | `rounded-full` |

Base radius: `--radius: 0.5rem` (8px)

---

## 5. Shadows

### 5.1 Plugin Shadows

```css
/* Standard plugin shadow */
.plugin-shadow {
  box-shadow: 0 4px 20px -4px rgba(59, 130, 246, 0.15);
}

/* Large plugin shadow */
.plugin-shadow-lg {
  box-shadow: 0 8px 32px -8px rgba(59, 130, 246, 0.18);
}

/* Glow effect */
.plugin-glow {
  box-shadow: 0 0 24px rgba(59, 130, 246, 0.25);
}
```

---

## 6. Components

### 6.1 Button

**Variants:**
- `default` - Primary dark background
- `secondary` - Light gray background
- `destructive` - Red for dangerous actions
- `outline` - Bordered, transparent background
- `ghost` - No background until hover
- `link` - Text link style

**Sizes:**
- `sm` - 0.25rem 0.75rem padding
- `default` - 0.5rem 1rem padding
- `lg` - 0.625rem 1.25rem padding
- `icon` - 2.25rem square

**Plugin Button:**
```css
.plugin-btn-primary {
  background: linear-gradient(135deg, hsl(211, 96%, 50%) 0%, hsl(199, 89%, 48%) 100%);
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px -4px rgba(59, 130, 246, 0.15);
}
```

### 6.2 Card

```jsx
<Card>                          // rounded-lg border bg-card shadow-sm
  <CardHeader>                  // flex flex-col space-y-1.5 p-6
    <CardTitle />               // text-2xl font-semibold
    <CardDescription />         // text-sm text-muted-foreground
  </CardHeader>
  <CardContent />               // p-6 pt-0
  <CardFooter />                // flex items-center p-6 pt-0
</Card>
```

**Plugin Card:**
```css
.plugin-card {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid hsl(0 0% 89.8% / 0.6);
  box-shadow: 0 4px 20px -4px rgba(59, 130, 246, 0.15);
  transition: all 0.2s;
}
.plugin-card:hover {
  box-shadow: 0 8px 32px -8px rgba(59, 130, 246, 0.18);
  transform: translateY(-2px);
}
```

### 6.3 Input

```jsx
<Input />  // h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
```

Focus state: `focus-visible:ring-2 focus-visible:ring-ring`

### 6.4 Badge

**Variants:**
- `default` - Dark background
- `secondary` - Light gray
- `destructive` - Red
- `outline` - Bordered

```css
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
}
```

### 6.5 Tag

```css
.plugin-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: hsl(0 0% 96%);
  color: hsl(0 0% 40%);
  transition: all 0.2s;
}
.plugin-tag:hover {
  background: hsl(211 96% 96%);
  color: hsl(211 96% 50%);
}
.plugin-tag.selected {
  background: hsl(211 96% 50%);
  color: white;
}
```

---

## 7. Animations

### 7.1 Keyframes

```css
/* Accordion */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

/* Fade In Up */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide In Right */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Pulse Scale */
@keyframes pulse-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### 7.2 Animation Classes

| Class | Duration | Timing |
|-------|----------|--------|
| `animate-accordion-down` | 0.2s | ease-out |
| `animate-accordion-up` | 0.2s | ease-out |
| `animate-fade-in-up` | 0.4s | ease-out |
| `animate-slide-in-right` | 0.3s | ease-out |
| `animate-pulse-scale` | 2s | ease-in-out infinite |
| `animate-shimmer` | 2s | linear infinite |

### 7.3 Stagger Classes

```css
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.1s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.2s; }
```

---

## 8. Layout

### 8.1 Container

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
```

### 8.2 Breakpoints

| Breakpoint | Width |
|------------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1400px |

---

## 9. Component Library

Location: `/components/ui/`

| Component | File | Dependencies |
|-----------|------|--------------|
| Accordion | `accordion.tsx` | Radix UI |
| Avatar | `avatar.tsx` | Radix UI |
| Badge | `badge.tsx` | CVA |
| Button | `button.tsx` | CVA |
| Calendar | `calendar.tsx` | react-day-picker |
| Card | `card.tsx` | - |
| Checkbox | `checkbox.tsx` | Radix UI |
| Dialog | `dialog.tsx` | Radix UI |
| Input | `input.tsx` | - |
| Label | `label.tsx` | Radix UI |
| Popover | `popover.tsx` | Radix UI |
| Radio Group | `radio-group.tsx` | Radix UI |
| Select | `select.tsx` | Radix UI |
| Separator | `separator.tsx` | Radix UI |
| Sheet | `sheet.tsx` | Radix UI |
| Slider | `slider.tsx` | Radix UI |
| Switch | `switch.tsx` | Radix UI |
| Table | `table.tsx` | - |
| Tabs | `tabs.tsx` | Radix UI |
| Textarea | `textarea.tsx` | - |
| Toast | `toast.tsx` | Radix UI |
| Tooltip | `tooltip.tsx` | Radix UI |

---

## 10. Utility Functions

### 10.1 Class Merge Utility

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usage:
```tsx
<div className={cn('base-class', conditional && 'conditional-class', className)} />
```

---

## 11. Custom Utilities

### 11.1 Line Clamp

```css
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
```

### 11.2 Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
```

### 11.3 Glass Effect

```css
.plugin-glass {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

---

## 12. Gradients

### 12.1 Plugin Gradient

```css
.plugin-gradient {
  background: linear-gradient(135deg, hsl(211, 96%, 50%) 0%, hsl(199, 89%, 48%) 100%);
}

.plugin-gradient-light {
  background: linear-gradient(180deg, hsl(210, 40%, 98%) 0%, hsl(210, 35%, 95%) 100%);
}
```

---

## 13. Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-*": "^1.x",
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "lucide-react": "^0.x",
    "tailwind-merge": "^2.x",
    "tailwindcss-animate": "^1.x",
    "react-day-picker": "^8.x",
    "recharts": "^2.x",
    "date-fns": "^3.x"
  }
}
```

---

## 14. File Structure

```
/components
  /ui                    # Reusable UI components
    button.tsx
    card.tsx
    input.tsx
    ...
  /icons                 # Custom SVG icons
  /navigation            # Navigation components
    sidebar.tsx

/app
  globals.css            # Global styles & CSS variables
  layout.tsx             # Root layout with providers

/lib
  utils.ts               # Utility functions

tailwind.config.js       # Tailwind configuration
```

---

## 15. Usage Examples

### Button with Icon

```tsx
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
```

### Card with Content

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
    <CardDescription>Overview of your account</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>
```

### Plugin Styled Card

```tsx
<div className="plugin-card p-6">
  <h3 className="text-lg font-semibold mb-2">Feature Card</h3>
  <p className="text-sm text-muted-foreground mb-4">
    Description text here
  </p>
  <button className="plugin-btn-primary">
    Get Started
  </button>
</div>
```

---

**Version**: 1.0
**Last Updated**: 2026-02-24
**Tech Stack**: Next.js 14 + Tailwind CSS + Radix UI
