import { LoginForm } from "@/modules/auth";

export default function LoginPage() {
  return (
    <>
      {/* Header text */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Bem-vindo de volta!
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Acesse sua conta para continuar
        </p>
      </div>

      <LoginForm />
    </>
  );
}
