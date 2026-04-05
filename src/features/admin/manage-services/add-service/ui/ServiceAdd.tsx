"use client"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {PlusIcon} from "lucide-react";
import {ServiceAddFormFields} from "@/features/admin/manage-services/add-service/ui/ServiceAddFormFields";
import {useState} from "react";


export function ServiceAdd() {
        const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusIcon />
                        Добавить сервис
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <ServiceAddFormFields setOpen={setOpen} />
                </DialogContent>
        </Dialog>

    )
}
