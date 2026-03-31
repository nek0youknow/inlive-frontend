import {usePostSearchRequests} from "@/features/client/send-request/client-search-input/model/api/usePostSearchRequests";
import {SubmitHandler, useForm} from "react-hook-form";
import {SearchFormData, searchFormSchema} from "@/features/client/send-request/client-search-input/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useCallback} from "react";

export function useSearchForm() {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    
    const handleSuccess = useCallback(() => {
        setIsSuccessModalOpen(true);
    }, []);

    const {mutate} = usePostSearchRequests(handleSuccess);

    const form = useForm<SearchFormData>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            unitType: "",
            checkInDate: "",
            checkOutDate: "",
            oneNight: false,
            price: undefined,
            cityId: "",
            countOfPeople: 1,
            fromRating: 0,
            toRating: 5,
            districtIds: [],
            serviceDictionaryIds: [],
            conditionDictionaryIds: []
        }
    })

    const onSubmit: SubmitHandler<SearchFormData> = (data: SearchFormData) => {
        try {
            const requestData = {
                checkInDate: data.checkInDate,
                checkOutDate: data.oneNight ? undefined : data.checkOutDate,
                oneNight: data.oneNight,
                price: data.price || 0,
                countOfPeople: data.countOfPeople || 0,
                fromRating: data.fromRating || 0,
                toRating: data.toRating || 5,
                unitTypes: data.unitType ? [data.unitType] : ["HOTEL_ROOM", "APARTMENT"],
                districtIds: data.districtIds,
                serviceDictionaryIds: data.serviceDictionaryIds,
                conditionDictionaryIds: data.conditionDictionaryIds,
            }

            mutate(requestData);


        } catch (error) {
            console.error("Form submission error:", error)
        }
    }

    const handleReset = () => {
        form.reset()
    }

    const handleCloseSuccessModal = useCallback(() => {
        setIsSuccessModalOpen(false);
    }, []);

    return {
        form, 
        onSubmit, 
        handleReset,
        isSuccessModalOpen,
        handleCloseSuccessModal,
    }
}