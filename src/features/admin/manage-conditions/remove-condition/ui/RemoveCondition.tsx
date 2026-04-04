import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {useState} from "react";
import { Trash, TriangleAlert} from "lucide-react";
import {Button} from "@/shared/ui/button";
import {useRemoveCondition} from "@/features/admin/manage-conditions/remove-condition/model/api/useRemoveCondition";

interface RemoveCondtionProps {
    conditionId: number;
}

export function RemoveCondition({ conditionId }: RemoveCondtionProps) {
   const [open, setOpen] = useState(false);
   const {mutate} = useRemoveCondition();


   const onSubmit = (id: number) => {
       try{
           mutate(id);
       }catch(error){
           console.error(error);
       }
   }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Trash className={"w-4 text-red-500"} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogTitle />
                <div className={"flex flex-col gap-10 mt-5 "}>
                    <div className="flex flex-row gap-2 items-center text-gray-500">
                        <TriangleAlert />

                        <p >
                            Вы уверены что хотите удалить это условие?
                        </p>
                    </div>
                    <div className={"flex self-end flex-row gap-3"}>
                        <Button onClick={() => onSubmit(conditionId)} variant={"destructive"}>
                            Удалить
                        </Button>
                        <Button onClick={() => setOpen(false)} variant={"outline"}>
                            Отмена
                        </Button>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}