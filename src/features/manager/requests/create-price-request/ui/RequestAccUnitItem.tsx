import {Building, HouseIcon, Scan, Users} from "lucide-react";
import {Badge} from "@/shared/ui/badge";

interface RequestAccUnitItemProps {
    unitId: string;
    name: string;
    capacity: number;
    description: string;
    area: number;
    floor: number;
    isAvailable: boolean;
    isSelected?: boolean;
}

export function RequestAccUnitItem({
                                       isSelected,
                                       name,
                                       capacity,
                                       description,
                                       area,
                                       floor,
                                       isAvailable,
                                   }: RequestAccUnitItemProps) {

    function isAvailableBadge(isAvailable: boolean) {
        if(isAvailable) return <Badge>Доступен</Badge>
        if(!isAvailable) return <Badge variant={"destructive"}>Не доступен</Badge>
        return null
    }

    return (
        <article className={`group bg-card w-full hover:shadow-lg transition-all duration-300 border-2 rounded-xl p-3 ${
            isSelected
                ? "border-primary shadow-lg"
                : "border-border hover:border-primary/30"
        }`}>
            <div className={"flex flex-col gap-3"}>
                <header className={"flex items-start gap-2 min-w-0"}>
                    <div className={"flex-shrink-0 p-1.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg group-hover:from-primary/20 group-hover:to-primary/10 transition-colors"}>
                        <HouseIcon width={18} height={18} className={"text-primary"} />
                    </div>
                    <div className={"min-w-0 flex-1"}>
                        <h3 className={"font-semibold text-foreground text-sm truncate"}>{name}</h3>
                        <p className={"text-xs text-muted-foreground break-all mt-0.5 line-clamp-1"}>{description}</p>
                    </div>
                    <div className={"flex-shrink-0"}>
                        {isAvailableBadge(isAvailable)}
                    </div>
                </header>

                <div className={"h-px bg-gradient-to-r from-border via-border to-transparent"}></div>

                <dl className={"grid grid-cols-3 gap-2"}>
                    <div className={"flex flex-col gap-1 p-2 bg-muted rounded-lg hover:bg-muted transition-colors"}>
                        <dt className={"flex items-center gap-1 text-muted-foreground text-xs font-medium uppercase tracking-wide"}>
                            <Users width={14} height={14} className={"flex-shrink-0 text-primary/70"} />
                            <span>Емкость</span>
                        </dt>
                        <dd className={"text-sm font-bold text-foreground"}>{capacity}</dd>
                        <span className={"text-xs text-muted-foreground"}>чел</span>
                    </div>

                    <div className={"flex flex-col gap-1 p-2 bg-muted rounded-lg hover:bg-muted transition-colors"}>
                        <dt className={"flex items-center gap-1 text-muted-foreground text-xs font-medium uppercase tracking-wide"}>
                            <Scan width={14} height={14} className={"flex-shrink-0 text-primary/70"} />
                            <span>Площадь</span>
                        </dt>
                        <dd className={"text-sm font-bold text-foreground"}>{area}</dd>
                        <span className={"text-xs text-muted-foreground"}>м²</span>
                    </div>

                    <div className={"flex flex-col gap-1 p-2 bg-muted rounded-lg hover:bg-muted transition-colors"}>
                        <dt className={"flex items-center gap-1 text-muted-foreground text-xs font-medium uppercase tracking-wide"}>
                            <Building width={14} height={14} className={"flex-shrink-0 text-primary/70"} />
                            <span>Этаж</span>
                        </dt>
                        <dd className={"text-sm font-bold text-foreground"}>{floor}</dd>
                    </div>
                </dl>
            </div>
        </article>
    )
}