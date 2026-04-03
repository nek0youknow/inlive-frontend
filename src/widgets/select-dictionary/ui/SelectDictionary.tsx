import {useEffect, useState} from "react";
import {useDictionary} from "@/entities/dictionary/model/api/useDictionary";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/shared/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/ui/popover";
import {Button} from "@/shared/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/shared/lib/utils";
import {Dictionary} from "@/entities/dictionary/model/types";

interface SelectDictionaryProps {
    type: string;
    placeholder?: string;
    onChange?: (values: number[]) => void;
    value?: number[];
    multiple?: boolean;
    valueSize?: number;
    className?: string;
}

export function SelectDictionary({
                                     type,
                                     placeholder = "Выберите словарь",
                                     onChange,
                                     value: propValue = [],
                                     multiple = true,
                                     valueSize = 400,
                                     className
                                 }: SelectDictionaryProps) {
    const {data} = useDictionary(type ?? "", Number(valueSize));
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number[]>(propValue);

    // Синхронизация с внешним value
    useEffect(() => {
        setValue(propValue);
    }, []);

    const handleSetValue = (val: number) => {
        if(!val) return null;

        let newValue: number[];

        if (multiple) {
            // Множественный выбор
            if (value.includes(val)) {
                newValue = value.filter((item) => item !== val);
            } else {
                newValue = [...value, val];
            }
        } else {
            // Одиночный выбор
            newValue = value.includes(val) ? [] : [val];
            setOpen(false); // Закрываем после выбора
        }

        setValue(newValue);
        onChange?.(newValue);
    }

    return (
        <Popover open={open}  onOpenChange={setOpen}>
            <PopoverTrigger  asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full h-fit justify-between ${className}`}
                >
                    <div className="flex flex-wrap gap-2 justify-start">
                        {value?.length > 0
                            ? value.map((val) => {
                                const dictionary = data?.content.find((d: Dictionary) => Number(d.id) === val);
                                return dictionary ? (
                                    <div
                                        key={val}
                                        className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                                    >
                                        {dictionary.value}
                                    </div>
                                ) : null;
                            })
                            : <span className="text-muted-foreground">{placeholder}</span>
                        }
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder="Поиск..." />
                    <CommandEmpty>Ничего не найдено.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {data?.content.map((dictionary: Dictionary,) => (
                                <CommandItem
                                    key={dictionary.id}
                                    value={String(dictionary.id)}
                                    onSelect={() => handleSetValue(Number(dictionary.id))}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value.includes(Number(dictionary.id)) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {dictionary.value}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}