import {Label} from "@/shared/ui/label";
import {Building, DollarSignIcon} from "lucide-react";

interface RequestAccInfoProps {
    accommodationUnitName: string;
    accommodationName: string;
    price: number;
}

export function RequestAccInfo({accommodationName, accommodationUnitName, price}:RequestAccInfoProps) {
    return (
        <div className="flex flex-col gap-3">
            <Label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                Информация о предложении
            </Label>
            <div className="border border-border bg-card rounded-2xl p-6 max-sm:p-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/2 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center max-sm:flex-col max-sm:items-start gap-2">
                            <Building className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold  text-muted-foreground uppercase max-sm:text-[10px] tracking-wide">Помещение</span>
                        </div>
                        <p className="text-lg font-bold text-foreground">{accommodationName}</p>
                    </div>

                    <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/2 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center  max-sm:flex-col max-sm:items-start gap-2">
                            <Building className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-muted-foreground max-sm:text-[10px] uppercase tracking-wide">Юнит</span>
                        </div>
                        <p className="text-lg font-bold text-foreground">{accommodationUnitName}</p>
                    </div>

                    <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/2 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center  max-sm:flex-col max-sm:items-start gap-2">
                            <DollarSignIcon className="w-4 h-4 text-rose-400" />
                            <span className="text-xs font-semibold text-rose-300 max-sm:text-[10px] uppercase tracking-wide">Цена</span>
                        </div>
                        <p className="text-lg font-bold text-rose-100">{price} тг</p>
                    </div>
                </div>
            </div>
        </div>
    )
}