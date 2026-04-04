import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {RequestTable} from "@/features/manager/requests/request-table/ui/RequestTable";
import {Suspense} from "react";
import {Spinner} from "@/shared/ui/spinner";

interface Props {
    params: Promise<{id: string}>
}

export default async function RequestsByAccommodationPage({params}:Props) {
    const {id} = await params;

    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Главная", href: "/manager" },
                    { label: "Заявки по Accommodation", href: "/manager/requests" },
                    { label: id, href: `/manager/requests/${id}` }
                ]}
            />
            <Suspense fallback={<Spinner className={"w-full mx-auto size-7 my-10"} />}>
                <RequestTable id={Number(id)} />
            </Suspense>
        </>
    )
}