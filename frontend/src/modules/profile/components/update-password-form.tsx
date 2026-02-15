"use client";

import { Lock, KeyRound, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/ui/form-error";
import { getErrorMessage } from "@/lib/api/errors";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import {
  UpdatePassword,
  updatePasswordSchema,
} from "../schemas/update-password";

export function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    reset,
  } = useForm<UpdatePassword>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UpdatePassword) => {
    try {
      await apiClient.put("/user/password/update", data);
      toast.success("Senha atualizada com sucesso!");
      reset();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 items-center justify-center rounded-full bg-primary/20  hidden md:flex">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Atualize sua senha regularmente para manter sua conta segura
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <div>
              <Input
                id="currentPassword"
                type="password"
                label="Senha Atual"
                placeholder="Digite sua senha atual"
                icon={Lock}
                {...register("currentPassword")}
              />
              <FormError error={errors.currentPassword} />
            </div>

            {/* New Password */}
            <div>
              <Input
                id="newPassword"
                type="password"
                label="Nova Senha"
                placeholder="Digite sua nova senha"
                icon={KeyRound}
                {...register("newPassword")}
              />
              <FormError error={errors.newPassword} />
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                id="confirmPassword"
                type="password"
                label="Confirmar Nova Senha"
                placeholder="Confirme sua nova senha"
                icon={KeyRound}
                {...register("confirmPassword")}
              />
              <FormError error={errors.confirmPassword} />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full"
              disabled={!isDirty || isSubmitting || !isValid}
            >
              {isSubmitting ? "Atualizando..." : "Atualizar Senha"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card>
        <CardContent>
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Dicas de Segurança
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Use uma senha única para esta conta</li>
            <li>• Combine letras maiúsculas, minúsculas, números e símbolos</li>
            <li>• Nunca compartilhe sua senha com terceiros</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
