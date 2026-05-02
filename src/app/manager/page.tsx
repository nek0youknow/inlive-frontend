import { BreadcrumbLayout } from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import { ShieldCheck } from "lucide-react";

export default function SuperManagerPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[{ label: "Manager", href: "/manager" }]}
            />
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <ShieldCheck className="h-24 w-24 text-primary mb-6" />
                <h1 className="text-3xl font-bold mb-4">Manager dashboard</h1>
                <p className="text-muted-foreground max-w-md">
                    Welcome to the manager dashboard. Use the sidebar to manage
                    sections and tasks.
                </p>
            </div>
        </>
    );
}
