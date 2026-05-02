import { LoginForm } from "@/features/auth/login/ui/LoginForm";

export default function LoginPage() {
    return (
        <section className="flex flex-col h-[100dvh] gap-3 max-md:gap-5 justify-center items-center">
            <h2 className="text-4xl font-bold">Sign in</h2>
            <p className="sm:w-md text-center opacity-70">
                Sign in for administrators
            </p>
            <LoginForm />
        </section>
    );
}
