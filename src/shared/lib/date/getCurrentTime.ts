// shared/lib/date/getCurrentTime.ts

export type DatePart = "full" | "date" | "time" | "day" | "month" | "year";

export function getCurrentTime(part: DatePart = "full"): string {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const formatter = new Intl.DateTimeFormat("ru-RU", options);
    const formatted = formatter.format(date);

    if (part === "full") return formatted;
    if (part === "date")
        return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(date);
    if (part === "time")
        return new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(date);
    if (part === "day") return date.getDate().toString();
    if (part === "month")
        return new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(date);
    if (part === "year") return date.getFullYear().toString();

    return formatted;
}
