import { lessons } from "../../db/schema";
import { db_tests } from "../setup";

export function createLesson(courseId: string, overrides?: Partial<typeof lessons.$inferSelect>) {
  return db_tests.connection
    .insert(lessons)
    .values({
      courseId,
      title: "Lesson 1",
      slug: "lesson-1",
      description: "Lesson 1 description",
      seconds: 60,
      video: "/uploads/video.mp4",
      order: 1,
      ...overrides,
    })
    .returning()
    .get();
}
