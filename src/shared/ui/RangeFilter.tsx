"use client";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Slider } from "@/shared/ui/slider";

interface RangeFilterProps {
    label?: string;
    value: number[];
    onChange: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
}

export function RangeFilter({
                                label,
                                value,
                                onChange,
                                min = 0,
                                max = 100,
                                step = 1,
                            }: RangeFilterProps) {
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue <= value[1]) onChange([newValue, value[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue >= value[0]) onChange([value[0], newValue]);
    };

    return (
        <div className="flex gap-3 w-full items-center">
            {label && <Label className="w-fit">{label}:</Label>}

            <Input
                type="number"
                value={value[0]}
                onChange={handleMinChange}
                className="bg-white w-30 text-center"
            />

            <Slider
                className="w-full"
                value={value}
                onValueChange={onChange}
                min={min}
                max={max}
                step={step}
            />

            <Input
                type="number"
                value={value[1]}
                onChange={handleMaxChange}
                className="bg-white w-30 text-center"
            />
        </div>
    );
}
