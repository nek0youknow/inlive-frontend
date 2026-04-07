import {
    CreateAccommodationUnitFormFields
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/ui/CreateAccommodationUnitFormFields";

interface CreateAccommodationUnitFormFields {
    accommodationId: string;
}

export function CreateAccommodationUnit({accommodationId}:CreateAccommodationUnitFormFields) {
    return (
        <section className={"max-w-lg mx-auto mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6"}>
            <h3 className={"text-xl sm:text-2xl text-center font-medium"}>Введите данные юнита</h3>
            <CreateAccommodationUnitFormFields accommodationId={accommodationId} />
        </section>
    )
}