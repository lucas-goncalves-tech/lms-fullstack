import { LessonHeader, LessonPlayer } from "@/modules/lesson";

type Props = {
  params: Promise<{
    courseSlug: string;
    lessonSlug: string;
  }>;
};

export default async function LessonPage({ params }: Props) {
  const { courseSlug, lessonSlug } = await params;
  return (
    <div className="w-full max-w-7xl">
      <LessonHeader courseSlug={courseSlug} lessonSlug={lessonSlug} />
      <LessonPlayer courseSlug={courseSlug} lessonSlug={lessonSlug} />
    </div>
  );
}
