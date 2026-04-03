import { UserProfile } from "@/widgets/user-profile/ui/UserProfile";
import { BreadcrumbLayout } from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";

export default function UsersMePage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Админ", href: "/admin" },
                    { label: "Мой профиль", href: `/admin/profile` }
                ]}
             />
            <h1 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                Мой профиль
            </h1>
            <p className="text-sm text-center sm:text-base md:text-lg text-gray-600 px-2">
                Управляйте своей учетной записью и личной информацией
            </p>
            <UserProfile />
        </>
    )
} 