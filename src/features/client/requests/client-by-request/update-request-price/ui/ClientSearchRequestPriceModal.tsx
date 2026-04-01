"use client"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {
    ClientSearchRequestPriceForm
} from "@/features/client/requests/client-by-request/update-request-price/ui/ClientSearchRequestPriceForm";
import {useState} from "react";

interface ClientSearchRequestPriceModalProps {
    id: number;
}

export function ClientSearchRequestPriceModal({id}: ClientSearchRequestPriceModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 w-full">
               <div className={"h-10 flex items-center justify-center "}>
                   Изменить цену
               </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Изменить цену
                    </DialogTitle>
                </DialogHeader>
                <ClientSearchRequestPriceForm id={id} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}