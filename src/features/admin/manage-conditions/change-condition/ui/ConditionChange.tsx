import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {useState} from "react";
import {SquarePen} from "lucide-react";
import {
    ConditionChangeFormFields
} from "@/features/admin/manage-conditions/change-condition/ui/ConditionChangeFormFields";


interface ConditionChangeProps {
    conditionId: number
}

export function ConditionChange({conditionId}: ConditionChangeProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <SquarePen className={"w-4 text-blue-500"} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogTitle>Изменить Условие</DialogTitle>
                <ConditionChangeFormFields conditionId={conditionId} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}