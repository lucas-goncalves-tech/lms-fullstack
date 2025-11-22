import { and, asc, eq, getTableColumns } from "drizzle-orm";
import { DataBase } from "../../db";
import { courses, lessons } from "../../db/schema";
import { ICreateLessonInput } from "./interface/lesson.interface";
import { lessonNav } from "../../db/schema/views.schema";

export class LessonRepository {
  constructor(private readonly db: DataBase) {}

  async createLesson(lessonData: ICreateLessonInput) {
    try {
      const result = this.db.connection
        .insert(lessons)
        .values(lessonData)
        .onConflictDoNothing()
        .returning()
        .get();
      return result ?? null;
    } catch (error) {
      console.error("Error ao criar nova aula", error);
      throw error;
    }
  }

  async findManyByCourseSlug(courseSlug: string) {
    try {
      const result = this.db.connection
        .select({ ...getTableColumns(lessons) })
        .from(lessons)
        .innerJoin(courses, eq(lessons.courseId, courses.id))
        .where(eq(courses.slug, courseSlug))
        .orderBy(asc(lessons.order))
        .all();
      return result.length === 0 ? [] : result;
    } catch (error) {
      console.error("Error ao buscar aulas por curso", error);
      throw error;
    }
  }

  async findBySlug(courseSlug: string, lessonSlug: string) {
    try {
      const result = this.db.connection
        .select({ ...getTableColumns(lessons) })
        .from(lessons)
        .innerJoin(courses, eq(lessons.courseId, courses.id))
        .where(and(eq(lessons.slug, lessonSlug), eq(courses.slug, courseSlug)))
        .get();
      return result ?? null;
    } catch (error) {
      console.error("Error ao buscar aula por slug", error);
      throw error;
    }
  }

  async lessonNav(courseSlug: string, lessonSlug: string) {
    try {
      const result = this.db.connection
        .select({ slug: lessonNav.slug })
        .from(lessonNav)
        .innerJoin(courses, eq(lessonNav.courseId, courses.id))
        .where(and(eq(lessonNav.currentSlug, lessonSlug), eq(courses.slug, courseSlug)))
        .all();
      return result.length === 0 ? [] : result;
    } catch (error) {
      console.error("Error ao buscar aula por slug", error);
      throw error;
    }
  }
}
