import {Container} from "@/shared/ui/container";
import {Suspense} from "react";
import {Spinner} from "@/shared/ui/spinner";
import type { Metadata } from 'next'
import { UserProfile } from "@/widgets/user-profile/ui/UserProfile";

export const metadata: Metadata = {
    title: 'Профиль пользователя',
    description: 'Просмотр и управление профилем пользователя',
    robots: {
        index: false,
        follow: true,
    },
}

export default function UserProfilePage() {
    return (
        <Container className={"py-8 sm:py-10 md:py-12"}>
            <Suspense fallback={
                <div className="flex justify-center items-center py-20">
                    <Spinner className={"w-10 h-10"} />
                </div>
            }>

                <UserProfile />
            </Suspense>
        </Container>
    );
}

