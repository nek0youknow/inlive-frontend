import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {BreadcrumbItemData} from "@/entities/breadcrumbs/model/types";
import {SidebarTrigger} from "@/shared/ui/sidebar";

interface BreadcrumbsProps {
    items: BreadcrumbItemData[];
}

export function BreadcrumbLayout({ items }: BreadcrumbsProps) {
    return (
        <Breadcrumb className={"mt-2 mb-4 sm:mb-6 px-2 sm:px-0"}>
            <BreadcrumbList className="flex-wrap">
                <SidebarTrigger />
                {items.map((item, index) => {
                    const isLastItem = index === items.length - 1;

                    return (
                        <React.Fragment key={item.href || item.label}>
                            <BreadcrumbItem>
                                {isLastItem || !item.href ? (
                                    <BreadcrumbPage className="text-sm sm:text-base">{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href} className="text-sm sm:text-base">{item.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {!isLastItem && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}