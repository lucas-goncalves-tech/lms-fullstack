"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Lock, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { Card, CardContent } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/api/errors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { registerSchema, RegisterSchema } from "../schemas/register";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await apiClient.post("/auth/register", data);
      toast.success("Conta criada com sucesso!");
      router.push("/auth");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <Input
                id="name"
                type="text"
                label="Nome completo"
                placeholder="Digite seu nome"
                icon={User}
                {...form.register("name")}
              />
              <FormError error={form.formState.errors.name} />
            </div>

            {/* Email Field */}
            <div>
              <Input
                id="email"
                type="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
                icon={Mail}
                {...form.register("email")}
              />
              <FormError error={form.formState.errors.email} />
            </div>

            {/* Password Field */}
            <div>
              <Input
                id="password"
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
                icon={Lock}
                {...form.register("password")}
              />
              <FormError error={form.formState.errors.password} />
            </div>

            {/* Confirm Password Field */}
            <div>
              <Input
                id="confirmPassword"
                type="password"
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                icon={Lock}
                {...form.register("confirmPassword")}
              />
              <FormError error={form.formState.errors.confirmPassword} />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link href="/auth" className="text-primary font-medium hover:underline">
          Fazer login
        </Link>
      </p>
    </div>
  );
}
