import {CurrentRequestInfo} from "@/features/client/requests/client-by-request/request-by-id/ui/CurrentRequestInfo";
import {Suspense} from "react";
import {Spinner} from "@/shared/ui/spinner";

interface CurrentRequestPageProps {
    params: Promise<{id: string}>
}

export default async function CurrentRequestPage({params}:CurrentRequestPageProps) {
    const {id} = await params;

    return (
        <Suspense fallback={<Spinner className={"w-full mx-auto size-7 my-10"} />}>
            <CurrentRequestInfo requestId={Number(id)} />
        </Suspense>
    )
}