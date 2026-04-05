import {
    CreateAccommodationFormFields
} from "@/features/manager/accommodations/create-accommodation/ui/CreateAccommodationFormFields";

export function CreateAccommodation() {
    return (
        <section className={"max-w-2xl mx-auto mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6"}>
            <h3 className={"text-xl sm:text-2xl text-center font-medium"}>Введите данные</h3>
            <CreateAccommodationFormFields />
        </section>
    )
}