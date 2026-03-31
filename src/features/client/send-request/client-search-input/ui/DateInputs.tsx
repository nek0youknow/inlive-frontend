
"use client"
import { Label } from "@/shared/ui/label"
import { Calendar } from "@/shared/ui/calendar"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Button } from "@/shared/ui/button"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

interface DateInputsProps {
    value?: {
        from?: string
        to?: string
    }
    onChange?: (dates: { from?: string; to?: string } | undefined) => void
    error?: string
    oneNight?: boolean
}

export function DateInputs({ value, onChange, error, oneNight = false }: DateInputsProps) {
    const [open, setOpen] = useState(false)

    const dateRange: DateRange | undefined = {
        from: value?.from ? new Date(value.from) : undefined,
        to: value?.to ? new Date(value.to) : undefined,
    }

    const singleDate: Date | undefined = value?.from ? new Date(value.from) : undefined

    const isDateDisabled = (date: Date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const dateToCheck = new Date(date)
        dateToCheck.setHours(0, 0, 0, 0)
        return dateToCheck < today
    }

    const formatDateRange = () => {
        if (!value?.from) return "Выберите даты"
        if (oneNight || !value?.to) {
            return format(new Date(value.from), "d MMM", { locale: ru })
        }
        return `${format(new Date(value.from), "d MMM", { locale: ru })} - ${format(new Date(value.to), "d MMM", { locale: ru })}`
    }

    const handleSelectDate = (selectedRange: DateRange | undefined) => {
        if (!selectedRange) {
            onChange?.(undefined)
            return
        }

        const formattedDates = {
            from: selectedRange.from ? format(selectedRange.from, "yyyy-MM-dd") : undefined,
            to: selectedRange.to ? format(selectedRange.to, "yyyy-MM-dd") : undefined,
        }

        onChange?.(formattedDates)
    }

    const handleSelectSingleDate = (selectedDate: Date | undefined) => {
        if (!selectedDate) {
            onChange?.(undefined)
            return
        }

        const formattedDate = {
            from: format(selectedDate, "yyyy-MM-dd"),
            to: undefined,
        }

        onChange?.(formattedDate)
    }

    return (
        <div className="flex w-full flex-col gap-3">
            <Label htmlFor="date" className="flex gap-2 items-center text-gray-700 font-medium">
                <CalendarIcon width={18} height={18} className="text-green-600" />
                Дата
            </Label>
            <Popover  open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={error ? "destructive" : "outline"}
                        className="w-full h-10 relative flex justify-start text-left font-normal"
                    >
                        {formatDateRange()}
                        <CalendarIcon
                            width={16}
                            height={16}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    {oneNight ? (
                        <Calendar
                            mode="single"
                            defaultMonth={singleDate}
                            selected={singleDate}
                            onSelect={handleSelectSingleDate}
                            numberOfMonths={1}
                            className="rounded-lg w-full"
                            disabled={isDateDisabled}
                        />
                    ) : (
                        <Calendar
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={handleSelectDate}
                            numberOfMonths={2}
                            className="rounded-lg w-full"
                            disabled={isDateDisabled}
                        />
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}