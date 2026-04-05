import {useState} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {SquarePen} from "lucide-react";
import {ServiceChangeFormFields} from "@/features/admin/manage-services/change-service/ui/ServiceChangeFormFields";

interface ServiceChangeProps {
    serviceId: number
}

export function ServiceChange({serviceId}: ServiceChangeProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <SquarePen className={"w-4 text-blue-500"} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogTitle>Изменить Услуги</DialogTitle>
                <ServiceChangeFormFields serviceId={serviceId} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}