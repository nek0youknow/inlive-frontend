import { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    label: string;
    value?: string | number;
}

export function LabelTextInfo({ icon, label, value }: Props) {
    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"flex font-medium text-gray-500 items-center gap-2"}>
                {icon}
                <span>{label}</span>
            </div>
            {value && <span>{value}</span>}
        </div>
    );
}
