"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  dateRange?: DateRange
  onDateChange?: (date: Date | undefined) => void
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  placeholder?: string
  className?: string
  mode?: "single" | "range"
  showAsFilter?: boolean
  filterIcon?: React.ComponentType<any>
  filterTitle?: string
}

const Lightning = ({ className = '' }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
  </svg>
)

export function DatePicker({
  date,
  dateRange,
  onDateChange,
  onDateRangeChange,
  placeholder = "Pick a date",
  className,
  mode = "range",
  showAsFilter = false,
  filterIcon: FilterIcon,
  filterTitle = "Publication date",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const quickSelections = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 14 days', days: 14 },
    { label: 'Last 30 days', days: 30 },
  ]

  const handleQuickSelect = (days: number) => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - days)
    
    if (mode === "range" && onDateRangeChange) {
      onDateRangeChange({ from, to })
    } else if (mode === "single" && onDateChange) {
      onDateChange(from)
    }
  }

  const displayText = React.useMemo(() => {
    if (mode === "range" && dateRange) {
      if (dateRange.from) {
        if (dateRange.to) {
          return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
        }
        return format(dateRange.from, "MMM dd, yyyy")
      }
    } else if (mode === "single" && date) {
      return format(date, "PPP")
    }
    return placeholder
  }, [date, dateRange, mode, placeholder])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {showAsFilter && FilterIcon ? (
          <button
            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <FilterIcon size={16} className="text-gray-500 group-hover:text-gray-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {filterTitle}
              </span>
            </div>
          </button>
        ) : (
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-start text-left font-normal px-2 hover:bg-transparent",
              (!date && !dateRange) && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">{displayText}</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" side="right" sideOffset={8}>
        <div className="p-4">
          {/* Suggestions */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightning className="text-gray-600" />
              <span className="text-sm font-semibold text-gray-900">Suggestions</span>
            </div>
            <div className="flex gap-2">
              {quickSelections.map((selection) => (
                <button
                  key={selection.label}
                  onClick={() => handleQuickSelect(selection.days)}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  {selection.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          {mode === "range" ? (
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              initialFocus
            />
          ) : (
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              numberOfMonths={2}
              initialFocus
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
