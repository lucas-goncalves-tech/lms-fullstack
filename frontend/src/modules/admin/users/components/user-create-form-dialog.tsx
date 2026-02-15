"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/form-error";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Lock, Shield, UserIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useCreateUser } from "../hooks/use-create-user";
import { AdminCreateUser, adminCreateUserSchema } from "../schemas/user-create";

export function UserCreateFormDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createUser, isPending } = useCreateUser();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<AdminCreateUser>({
    resolver: zodResolver(adminCreateUserSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: AdminCreateUser) => {
    await createUser(data);
    reset();
    setOpen(false);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 z-50">Novo Usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Usuário</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo usuário
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <Input
              id="name"
              type="text"
              label="Nome"
              placeholder="John Doe"
              icon={User}
              {...register("name")}
            />
            <FormError error={errors.name} />
          </div>

          {/* Email Field */}
          <div>
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="john@example.com"
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
              placeholder="••••••••"
              icon={Lock}
              {...register("password")}
            />
            <FormError error={errors.password} />
          </div>

          {/* Confirm Password Field */}
          <div>
            <Input
              id="confirmPassword"
              type="password"
              label="Confirmar Senha"
              placeholder="••••••••"
              icon={Lock}
              {...register("confirmPassword")}
            />
            <FormError error={errors.confirmPassword} />
          </div>

          {/* Role Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Tipo de Usuário
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                  <div
                    className={`flex flex-1 items-center gap-2 ${
                      field.value === "USER"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <UserIcon className="size-4 transition-colors" />
                    <span className="text-sm font-medium transition-colors">
                      User
                    </span>
                  </div>

                  <Switch
                    checked={field.value === "ADMIN"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "ADMIN" : "USER")
                    }
                    className="mx-4 data-[state=checked]:bg-amber-500"
                  />

                  <div
                    className={`flex flex-1 items-center justify-end gap-2 ${
                      field.value === "ADMIN"
                        ? "text-amber-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm font-medium transition-colors">
                      Admin
                    </span>
                    <Shield className="size-4 transition-colors" />
                  </div>
                </div>
              )}
            />
            <FormError error={errors.role} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || !isValid}>
              {isPending ? "Criando..." : "Criar Usuário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
