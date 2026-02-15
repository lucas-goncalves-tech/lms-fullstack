"use client";

import { Lock, ShieldCheck } from "lucide-react";
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
import { UpdateEmail, updateEmailSchema } from "../schemas/update-email";
import { useAuth } from "@/shared/context/auth";

export function UpdateEmailForm() {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    reset,
  } = useForm<UpdateEmail>({
    resolver: zodResolver(updateEmailSchema),
    mode: "onChange",
    defaultValues: {
      email: user?.email,
    },
  });

  const onSubmit = async (data: UpdateEmail) => {
    try {
      await apiClient.put("/user/email/update", data);
      toast.success("Email atualizado com sucesso!");
      if (user) {
        setUser({ ...user, email: data.email });
      }
      reset({ email: data.email });
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
              <CardTitle>Alterar Email</CardTitle>
              <CardDescription>
                Atualize seu email em caso de necessidade
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <div>
              <Input
                id="email"
                type="text"
                label="Email"
                placeholder="Digite seu email"
                icon={Lock}
                {...register("email")}
              />
              <FormError error={errors.email} />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full"
              disabled={!isDirty || isSubmitting || !isValid}
            >
              {isSubmitting ? "Atualizando..." : "Atualizar Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
