import { CourseHeader, LessonsList } from "@/modules/course";

type Props = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params;

  return (
    <div className="w-full max-w-5xl">
      <CourseHeader courseSlug={courseSlug} />
      <LessonsList courseSlug={courseSlug} />
    </div>
  );
}
