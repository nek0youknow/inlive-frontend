import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debounced = useCallback(
        (...args: Parameters<T>) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => callback(...args), delay);
        },
        [callback, delay]
    );

    return debounced;
}
