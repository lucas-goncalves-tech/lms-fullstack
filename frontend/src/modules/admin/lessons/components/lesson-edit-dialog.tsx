"use client";

import { BookOpen, Hash, Video, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { InputFile } from "@/components/ui/input-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/ui/form-error";
import { useUploadVideo } from "../hooks/use-upload-video";
import { useUpdateLesson } from "../hooks/use-update-lesson";
import { UpdateLesson, updateLessonSchema } from "../schemas/lesson-update";
import { LessonTable } from "../schemas/lessons-table";

type Props = {
  lesson: LessonTable;
  courseSlug: string;
  onDropdownClose?: () => void;
};

export function EditLessonDialog({
  lesson,
  courseSlug,
  onDropdownClose,
}: Props) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: uploadVideo, isPending: isUploadPending } =
    useUploadVideo();
  const { mutateAsync: updateLesson, isPending: isUpdatePending } =
    useUpdateLesson(courseSlug);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateLesson>({
    resolver: zodResolver(updateLessonSchema),
    defaultValues: {
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      order: lesson.order,
    },
  });

  const handleCancel = () => {
    setOpen(false);
    onDropdownClose?.();
    reset();
  };

  const onSubmit = async (data: UpdateLesson) => {
    const { video, ...lessonData } = data;

    let videoPath = lesson.video;
    let seconds = lesson.seconds;

    // Se um novo vídeo foi selecionado, faz o upload
    if (video) {
      const uploadResult = await uploadVideo(video);
      videoPath = uploadResult.path;
      seconds = uploadResult.seconds;
    }

    await updateLesson({
      lessonSlug: lesson.slug,
      ...lessonData,
      video: videoPath,
      seconds,
    });

    setOpen(false);
    onDropdownClose?.();
    reset();
  };

  const isPending = isUploadPending || isUpdatePending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Aula</DialogTitle>
          <DialogDescription>Atualize as informações da aula</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <Input
              id="title"
              type="text"
              label="Título"
              placeholder="Introdução ao JavaScript"
              icon={BookOpen}
              {...register("title")}
            />
            <FormError error={errors.title} />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Descrição
            </label>
            <Textarea
              id="description"
              placeholder="Descrição da aula..."
              rows={3}
              {...register("description")}
            />
            <FormError error={errors.description} />
          </div>

          {/* Video Field */}
          <div>
            <InputFile
              id="video"
              label="Novo arquivo de vídeo (opcional)"
              icon={Video}
              isLoading={isUploadPending}
              {...(register("video"),
              {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files;
                  if (file && file.length !== 0) {
                    setValue("video", file[0], {
                      shouldValidate: true,
                    });
                  }
                },
              })}
            />
            <FormError error={errors.video} />
            <p className="text-xs text-muted-foreground mt-1">
              Vídeo atual: {lesson.video}
            </p>
          </div>

          {/* Order Field */}
          <div>
            <Input
              id="order"
              type="number"
              label="Ordem"
              placeholder="1"
              icon={FileText}
              {...register("order", { valueAsNumber: true })}
            />
            <FormError error={errors.order} />
          </div>

          {/* Slug Field */}
          <div>
            <Input
              id="slug"
              type="text"
              label="Slug"
              placeholder="introducao-ao-javascript"
              icon={Hash}
              disabled
              {...register("slug")}
            />
            <FormError error={errors.slug} />
            <p className="text-xs text-muted-foreground mt-1">
              O slug não pode ser alterado
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
