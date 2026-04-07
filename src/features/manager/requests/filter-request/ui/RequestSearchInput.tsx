import {Input} from "@/shared/ui/input";
import {Search} from "lucide-react";

export function RequestSearchInput() {

    return (
        <section className="my-5 flex items-center gap-[14.75px]">
            <form role="search" className="md:max-w-md w-full">
                <fieldset className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00000080] w-4 h-4 pointer-events-none" />
                    <Input
                        id="request-search"
                        placeholder="Искать номер"
                        className="pl-9 w-full border border-[#00000033] shadow-[0_1px_2px_0_#0000000D] "
                    />
                </fieldset>
            </form>
        </section>
    )
}
