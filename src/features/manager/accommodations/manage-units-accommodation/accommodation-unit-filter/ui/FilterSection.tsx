"use client";
import { ReactNode } from "react";

export function FilterSection({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-50 border my-3 sm:my-4 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
            <p className="opacity-60 mb-4 sm:mb-6 text-sm sm:text-base">Дополнительные параметры</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10">{children}</div>
        </div>
    );
}
