import {ClientRegisterForm} from "@/features/auth/register/client/ui/ClientRegisterForm";

export default function RegisterPage() {
    return (
        <section className={"flex flex-col h-[100dvh] gap-3 max-md:gap-5 justify-center items-center"}>
            <h2 className={"text-4xl font-bold max-md:text-3xl"}>Регистрация в системе</h2>
            <p className={"w-fit md:w-md text-center max-md:text-sm opacity-70"}>
                Создайте аккаунт, чтобы получить доступ к системе
            </p>
            <ClientRegisterForm />
        </section>
    )
}