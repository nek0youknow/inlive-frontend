import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    UpdateStatusFormData,
    updateStatusSchema
} from "@/features/manager/bookings/current-reservation-modal/model/schema";
import {
    usePutReservationFinalStatus
} from "@/features/manager/bookings/current-reservation-modal/model/api/usePutReservationFinalStatus";

interface ChangeReservationStatusProps {
    reservationId: number;
}

export function ChangeReservationStatus({reservationId}:ChangeReservationStatusProps) {

    const {mutate} = usePutReservationFinalStatus();


    const form = useForm({
        resolver: zodResolver(updateStatusSchema),
        defaultValues: {
            status: undefined
        }
    })

    const onSubmit = (data: UpdateStatusFormData) => {
        try{
            mutate({
                reservationId: reservationId,
                status: data.status
            })
        }catch (err){
            console.log(err);
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className={"w-full"}>
                    Изменить статус
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Обновите статус</DialogTitle>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
                    <Controller name="status" control={form.control} render={({field}) => (
                        <>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className={"w-full"}>
                                    <SelectValue  placeholder="Выберите статус" className={`w-full ${form.formState.errors.status ? "border-red-500 focus-visible:ring-red-500/30" : ""} `} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={"FINISHED_SUCCESSFUL"}>
                                            Успешно
                                        </SelectItem>
                                        <SelectItem value={"CLIENT_DIDNT_CAME"}>
                                            Клиент не пришел
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </>
                    )} />
                    <fieldset className={"flex max-md:flex-col flex-row justify-center gap-2 mt-4"}>
                        <Button type={"submit"} size={"sm"} className={" max-md:w-full"}>Сохранить</Button>
                        <Button variant={"outline"} size={"sm"} className={"max-md:w-full"}>Отмена</Button>
                    </fieldset>
                </form>
            </DialogContent>
        </Dialog>
    )
}