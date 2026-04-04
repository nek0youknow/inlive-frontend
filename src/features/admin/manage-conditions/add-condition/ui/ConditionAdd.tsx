"use client"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {PlusIcon} from "lucide-react";
import {useState} from "react";
import {ConditionAddFormFields} from "@/features/admin/manage-conditions/add-condition/ui/ConditionAddFormFields";


export function ConditionAdd() {
        const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusIcon />
                        Добавить условие
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <ConditionAddFormFields setOpen={setOpen} />
                </DialogContent>
        </Dialog>

    )
}
