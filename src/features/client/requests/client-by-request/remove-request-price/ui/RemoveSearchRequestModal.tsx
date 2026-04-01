import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {TriangleAlert} from "lucide-react";
import {Button} from "@/shared/ui/button";
import {
    useCancelRequest,
} from "@/features/client/requests/client-by-request/remove-request-price/model/api/useCancelRequestPrice";

interface RemoveSearchRequestModalProps {
    id: number;
}

export function RemoveSearchRequestModal({id}:RemoveSearchRequestModalProps) {

    const {mutate} = useCancelRequest();

    const onSubmit = (id: number) => {
        try{
            mutate(id);
        }catch(error){
            console.error(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground w-full">
                <div className={"h-10 flex items-center justify-center "}>
                    Отменить заявку
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle  />
                <div className={"flex flex-col gap-10 mt-5 "}>
                    <div className="flex flex-row gap-2 items-center text-gray-500">
                        <TriangleAlert />

                        <p >
                            Вы уверены что хотите удалить это условие?
                        </p>
                    </div>
                    <div className={"flex self-end flex-row gap-3"}>
                        <Button onClick={() => onSubmit(id)} variant={"destructive"}>
                            Удалить
                        </Button>
                       <DialogClose asChild>
                           <Button  variant={"outline"}>
                               Отмена
                           </Button>
                       </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}