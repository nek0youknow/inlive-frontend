interface TagListProps {
    title: string;
    items: string[];
    color?: string; // rose | blue | purple
}

export function TagList({ title, items, color = "rose" }: TagListProps) {
    const colors: Record<string, string> = {
        green: "bg-rose-500/40 border-rose-500",
        rose: "bg-rose-500/40 border-rose-500",
        blue: "bg-rose-500/50 border-blue-500",
        purple: "bg-purple-500/50 border-purple-500",
    };

    return (
        <section className={"flex flex-col gap-2"}>
            <h2 className={"text-muted-foreground font-medium text-sm sm:text-base"}>{title}</h2>

            <ul className={"flex flex-wrap gap-2"}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`${colors[color]} text-xs sm:text-sm font-medium rounded-full px-2 sm:px-3 py-1 border`}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
}
