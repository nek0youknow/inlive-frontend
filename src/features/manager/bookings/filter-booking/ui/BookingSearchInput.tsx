import {Input} from "@/shared/ui/input";
import {Search, ArrowDownUp} from "lucide-react";

export function BookingSearchInput() {

    return (
        <section className="my-5 flex items-center gap-[14.75px]">
            <form role="search" className="max-w-md">
                <fieldset className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00000080] w-4 h-4 pointer-events-none" />
                    <Input
                        id="request-search"
                        placeholder="Искать номер"
                        className="pl-9 w-[209px] border border-[#00000033] bg-[#5757570D] shadow-[0_1px_2px_0_#0000000D] text-[#00000080]"
                    />
                </fieldset>
            </form>
            <ArrowDownUp className="w-[16px] text-[#818181] h-[16px]" strokeWidth={2} />
        </section>
    )
}
