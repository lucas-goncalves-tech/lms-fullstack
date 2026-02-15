import { RegisterForm } from "@/modules/auth";

export default function RegisterPage() {
  return (
    <>
      {/* Header text */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Crie sua conta
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Preencha os dados para começar
        </p>
      </div>

      <RegisterForm />
    </>
  );
}
