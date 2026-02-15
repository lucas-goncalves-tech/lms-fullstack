"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { Card, CardContent } from "@/components/ui/card";
import { loginSchema, LoginSchema } from "../schemas/login";
import { getErrorMessage } from "@/lib/api/errors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/use-login";

export function LoginForm() {
  const router = useRouter();
  const { mutateAsync: login } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data);
      reset();
      toast.success("Login realizado com sucesso!");
      router.replace("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <Input
                id="email"
                type="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
                icon={Mail}
                {...register("email")}
              />
              <FormError error={errors.email} />
            </div>

            {/* Password Field */}
            <div>
              <Input
                id="password"
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
                icon={Lock}
                {...register("password")}
              />
              <FormError error={errors.password} />
            </div>

            {/* Submit Button */}
            <Button className="w-full" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <Link
          href="/auth/register"
          className="text-primary font-medium hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
