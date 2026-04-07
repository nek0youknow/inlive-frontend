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
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                Информация о предложении
            </Label>
            <div className="border border-gray-200 bg-white rounded-2xl p-6 max-sm:p-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/2 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center max-sm:flex-col max-sm:items-start gap-2">
                            <Building className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold  text-gray-600 uppercase max-sm:text-[10px] tracking-wide">Помещение</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{accommodationName}</p>
                    </div>

                    <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/2 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center  max-sm:flex-col max-sm:items-start gap-2">
                            <Building className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-gray-600 max-sm:text-[10px] uppercase tracking-wide">Юнит</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{accommodationUnitName}</p>
                    </div>

                    <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/2 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center  max-sm:flex-col max-sm:items-start gap-2">
                            <DollarSignIcon className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-semibold text-green-700 max-sm:text-[10px] uppercase tracking-wide">Цена</span>
                        </div>
                        <p className="text-lg font-bold text-green-900">{price} тг</p>
                    </div>
                </div>
            </div>
        </div>
    )
}