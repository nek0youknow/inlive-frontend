
import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {AccommodationProfile} from "@/features/manager/accommodations/accommodation-profile/ui/AccommodationProfile";

interface AccommodationProfilePageProps {
    params: {
        id: string;
    }
}

export default async function AccommodationProfilePage({params}: AccommodationProfilePageProps){
    const {id} = await params;

    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Accommodations", href: "/manager/accommodations" },
                    { label: id, href: `/manager/accommodations/${id}`},
                    { label: "Профиль", href: `/manager/accommodations/${id}/profile`}
                ]}
            />
            <AccommodationProfile accommodationId={id} />
        </>
    )
}