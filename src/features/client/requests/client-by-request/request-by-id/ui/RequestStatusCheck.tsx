import {LabelTextInfo} from "@/shared/ui/label-text-info";
import {ChartBar, Check} from "lucide-react";
import {SearchRequestStatus} from "@/entities/search-request/model/types";



interface Step {
    status: SearchRequestStatus;
    label: string;
}

const STEPS: Step[] = [
    { status: SearchRequestStatus.OPEN_TO_PRICE_REQUEST, label: "Открыта для предложений" },
    { status: SearchRequestStatus.PRICE_REQUEST_PENDING, label: "Ожидание цены" },
    { status: SearchRequestStatus.WAIT_TO_RESERVATION, label: "Ожидание бронирования" },
    { status: SearchRequestStatus.FINISHED, label: "Завершена" },
];

interface RequestStatusCheckProps {
    currentStatus: SearchRequestStatus;
}

export function RequestStatusCheck({ currentStatus }: RequestStatusCheckProps) {
    const getStepStatus = (stepStatus: SearchRequestStatus) => {
        const currentIndex = STEPS.findIndex(s => s.status === currentStatus);
        const stepIndex = STEPS.findIndex(s => s.status === stepStatus);

        if (stepIndex < currentIndex) return "completed";
        if (stepIndex === currentIndex) return "active";
        return "disabled";
    };

    return (
        <div className={"bg-white border w-full rounded-lg p-6"}>
            <LabelTextInfo
                icon={<ChartBar className={"text-green-500"} width={20} height={20} />}
                label={"Статус"}
            />
            <div className={"flex gap-2 my-10 flex-col"}>
                {STEPS.map((step, index) => {
                    const status = getStepStatus(step.status);

                    return (
                        <div key={step.status}>
                            {/* Step Item */}
                            <div className={"flex items-center gap-3"}>
                                <div
                                    className={`
                                        rounded-full relative h-10 w-10 flex-shrink-0 flex items-center justify-center
                                        ${status === "completed" ? "bg-green-500" : ""}
                                        ${status === "active" ? "bg-blue-500 ring-2 ring-blue-200" : ""}
                                        ${status === "disabled" ? "bg-gray-300" : ""}
                                        ${status === "disabled" ? "opacity-50" : ""}
                                    `}
                                >
                                    {status === "completed" ? (
                                        <Check className={"text-white"} width={20} height={20} />
                                    ) : (
                                        <span
                                            className={`
                                                font-bold
                                                ${status === "active" ? "text-white" : ""}
                                                ${status === "disabled" ? "text-gray-500" : ""}
                                            `}
                                        >
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <p
                                    className={`
                                        text-lg font-medium
                                        ${status === "active" ? "text-blue-600" : ""}
                                        ${status === "disabled" ? "text-gray-500" : ""}
                                    `}
                                >
                                    {step.label}
                                </p>
                            </div>

                            {/* Vertical Line */}
                            {index < STEPS.length - 1 && (
                                <div className={"flex items-center gap-3"}>
                                    <div className={"w-10 flex justify-center"}>
                                        <div className={"w-0.5 h-6 bg-gray-300"}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}