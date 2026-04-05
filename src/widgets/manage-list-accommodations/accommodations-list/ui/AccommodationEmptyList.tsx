import {HouseIcon} from "lucide-react";

export function AccommodationEmptyList() {
    return (
        <section className={"flex flex-col items-center justify-center mt-30 font-semibold gap-3 text-center"}>
            <HouseIcon className={"opacity-60"} width={50} height={50} />
            <h2 className={"text-xl"}>Список объектов пуст</h2>
        </section>
    )
}