import {RequestsList} from "@/features/client/requests/client-my-list-requests/ui/RequestsList";
import {Container} from "@/shared/ui/container";


export default function RequestPage() {
    return (
        <Container>
            <section className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                <h1 className="text-2xl sm:text-3xl my-6 sm:my-8 md:my-10 text-center font-bold px-4">Мои заявки</h1>
                <RequestsList />
            </section>
        </Container>
    )
}