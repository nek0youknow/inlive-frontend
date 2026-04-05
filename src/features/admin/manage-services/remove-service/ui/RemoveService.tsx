import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {useState} from "react";
import { Trash, TriangleAlert} from "lucide-react";
import {Button} from "@/shared/ui/button";
import {useRemoveService} from "@/features/admin/manage-services/remove-service/model/api/useRemoveService";

interface RemoveServiceProps {
    serviceId: number;
}

export function RemoveService({ serviceId }: RemoveServiceProps) {
    const [open, setOpen] = useState(false);
    const {mutate} = useRemoveService()
    ;


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
                            Вы уверены что хотите удалить эту услугу?
                        </p>
                    </div>
                    <div className={"flex self-end flex-row gap-3"}>
                        <Button onClick={() => onSubmit(serviceId)} variant={"destructive"}>
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