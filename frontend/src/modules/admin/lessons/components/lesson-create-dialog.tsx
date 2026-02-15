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
import { ChangeEvent, useState } from "react";
import { generateSlug } from "@/lib/utils/generate-slug-from-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/ui/form-error";
import { useUploadVideo } from "../hooks/use-upload-video";
import { useCreateLesson } from "../hooks/use-create-lesson";
import { InputFile } from "@/components/ui/input-file";
import { CreateLesson, createLessonSchema } from "../schemas/lesson-create";

type Props = {
  courseSlug: string;
};

export function CreateLessonDialog({ courseSlug }: Props) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: uploadVideo, isPending } = useUploadVideo();
  const { mutateAsync: createLesson, isPending: isCreateLessonPeding } =
    useCreateLesson(courseSlug);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateLesson>({
    resolver: zodResolver(createLessonSchema),
  });

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title) {
      const slug = generateSlug(title);
      setValue("slug", slug, { shouldValidate: true });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: CreateLesson) => {
    const { video, ...lessonData } = data;
    const { path, seconds } = await uploadVideo(video);
    await createLesson({
      ...lessonData,
      video: path,
      seconds,
    });
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nova Aula</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Aula</DialogTitle>
          <DialogDescription>Preencha as informações da aula</DialogDescription>
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
              {...register("title", { onBlur: handleTitleBlur })}
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
              label="Arquivo do video"
              icon={Video}
              isLoading={isPending}
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
              {...register("slug")}
            />
            <FormError error={errors.slug} />
            <p className="text-xs text-muted-foreground mt-1">
              URL amigável (apenas letras minúsculas, números e hífens)
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending || isCreateLessonPeding}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || isCreateLessonPeding}>
              Criar Aula
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
