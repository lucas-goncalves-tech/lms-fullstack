"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getErrorMessage } from "@/lib/api/errors";
import { toast } from "sonner";
import { InputFile } from "@/components/ui/input-file";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateAvatar } from "../hooks/use-update-avatar";
import { useAvatar } from "@/lib/hooks/use-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function UpdateAvatarForm() {
  const { mutateAsync: updateAvatar, isPending } = useUpdateAvatar();
  const { data: avatarUrl, isLoading } = useAvatar();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      try {
        await updateAvatar(image);
        setImage(null);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const objectBlob = URL.createObjectURL(file);
        setImageUrl(objectBlob);
        setImage(file);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
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
              <CardTitle>Alterar Avatar</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Avatar className="size-36 sm:size-42">
              {isLoading ? (
                <Skeleton className="size-full rounded-full" />
              ) : (
                <>
                  <AvatarImage src={imageUrl || avatarUrl} alt="Avatar" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </>
              )}
            </Avatar>
            <form onSubmit={onSubmit} className="w-full space-y-5">
              <div>
                <InputFile
                  id="avatar"
                  label="Arquivos permitidos: .png, .jpg, .jpeg | Tamanho máximo: 3MB"
                  placeholder="Selecione um avatar"
                  accept="image/png, image/jpeg, image/jpg"
                  multiple={false}
                  isLoading={isPending}
                  onChange={handleAvatarChange}
                />
              </div>

              <Button className="w-full" disabled={!image || isPending}>
                {isPending ? "Atualizando..." : "Atualizar Avatar"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
