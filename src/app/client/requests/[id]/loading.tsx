import {Spinner} from "@/shared/ui/spinner";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Spinner className={"w-full mx-auto size-7"} />
        </div>
    )
}

