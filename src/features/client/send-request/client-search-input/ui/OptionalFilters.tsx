import { UseFormReturn } from "react-hook-form"
import { SearchFormData } from "../model/schema"
import { ServicesConditionsSection } from "./ServicesConditionsSection"
import { UnitTypeSelect } from "./UnitTypeSelect"
import { RatingRangeInput } from "./RatingRangeInput"
import { OneNightCheckbox } from "./OneNightCheckbox"

interface OptionalFiltersProps {
    form: UseFormReturn<SearchFormData>
}

export function OptionalFilters({ form }: OptionalFiltersProps) {
    return (
        <>
            <hr />
            <ServicesConditionsSection form={form} />
            <UnitTypeSelect form={form} />
            <RatingRangeInput form={form} />
            <OneNightCheckbox form={form} />
        </>
    )
}