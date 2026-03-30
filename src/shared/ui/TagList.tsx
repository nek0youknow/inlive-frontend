interface TagListProps {
    title: string;
    items: string[];
    color?: string; // green | blue | purple
}

export function TagList({ title, items, color = "green" }: TagListProps) {
    const colors: Record<string, string> = {
        green: "bg-green-500/50 border-green-500",
        blue: "bg-blue-500/50 border-blue-500",
        purple: "bg-purple-500/50 border-purple-500",
    };

    return (
        <section className={"flex flex-col gap-2"}>
            <h2 className={"text-gray-500 font-medium text-sm sm:text-base"}>{title}</h2>

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
