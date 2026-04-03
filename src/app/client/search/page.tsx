import {Container} from "@/shared/ui/container";
import {ClientSearchInputs} from "@/features/client/send-request/client-search-input/ui/ClientSearchInputs";
import {ClientSearchHeader} from "@/features/client/send-request/client-search-header/ui/ClientSearchHeader";

export default function ClientPage() {
    return (
        <>
            <Container className={"py-10"}>
                <ClientSearchHeader />
                <ClientSearchInputs />
            </Container>
        </>
    )
}