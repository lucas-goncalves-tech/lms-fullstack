"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
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
import { CreateCourse, createCourseSchema } from "../schemas/create-course";
import { CourseForm } from "../schemas/course-form";
import { useState } from "react";
import { generateSlug } from "@/lib/utils/generate-slug-from-title";
import { useCreateCourse } from "../hooks/use-create-course";
import { useUpdateCourse } from "../hooks/use-update-course";

type Props = {
  course?: CourseForm;
  onDropdownClose?: () => void;
};

export function CourseFormDialog({ course, onDropdownClose }: Props) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!course;

  const { mutateAsync: createCourse } = useCreateCourse();
  const { mutateAsync: updateCourse } = useUpdateCourse();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    setValue,
  } = useForm<CreateCourse>({
    resolver: zodResolver(createCourseSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: isEditMode
      ? {
          slug: course.slug,
          title: course.title,
          description: course.description,
        }
      : {
          slug: "",
          title: "",
          description: "",
        },
  });

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isEditMode) return; // Don't auto-generate slug in edit mode

    const title = e.target.value;
    if (title) {
      const slug = generateSlug(title);
      setValue("slug", slug, { shouldValidate: true });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    onDropdownClose?.();
    reset();
  };

  const onSubmit = async (data: CreateCourse) => {
    try {
      if (isEditMode) {
        await updateCourse({
          courseSlug: course.slug,
          data: {
            title: data.title,
            description: data.description,
          },
        });
      } else {
        await createCourse(data);
      }
      setOpen(false);
      onDropdownClose?.();
      reset();
    } catch (error) {
      // Error handling is done in the hooks
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Pencil className="size-4" />
            Editar
          </DropdownMenuItem>
        ) : (
          <Button>Novo Curso</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Curso" : "Criar Novo Curso"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Atualize as informações do curso"
              : "Preencha as informações básicas do curso"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <Input
              id="title"
              type="text"
              label="Título"
              placeholder="JavaScript Completo"
              icon={BookOpen}
              {...register("title", {
                onBlur: handleTitleBlur,
              })}
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
              placeholder="Descrição completa do curso..."
              rows={4}
              {...register("description")}
            />
            <FormError error={errors.description} />
          </div>

          {/* Slug Field */}
          <div>
            <Input
              id="slug"
              type="text"
              label="Slug"
              placeholder="javascript-completo"
              icon={Hash}
              disabled={isEditMode}
              {...register("slug")}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {isEditMode
                ? "O slug não pode ser alterado"
                : "URL amigável (apenas letras minúsculas, números e hífens)"}
            </p>
            <FormError error={errors.slug} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || (isEditMode ? !isDirty : !isValid)}
            >
              {isSubmitting
                ? isEditMode
                  ? "Salvando..."
                  : "Criando..."
                : isEditMode
                ? "Salvar"
                : "Criar Curso"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
