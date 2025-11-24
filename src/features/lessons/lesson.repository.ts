import { and, asc, eq, getTableColumns } from "drizzle-orm";
import { DataBase } from "../../db";
import { courses, lessons, lessonsCompleted } from "../../db/schema";
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
      return result;
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
      return result;
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
      return result;
    } catch (error) {
      console.error("Error ao buscar aula por slug", error);
      throw error;
    }
  }

  async findManyLessonsCompleted(userId: string, courseId: string) {
    try {
      const result = this.db.connection
        .select({ lessonId: lessonsCompleted.lessonId, completed: lessonsCompleted.completed })
        .from(lessonsCompleted)
        .where(and(eq(lessonsCompleted.userId, userId), eq(lessonsCompleted.courseId, courseId)))
        .all();
      return result;
    } catch (error) {
      console.error("Error ao buscar aulas completadas", error);
      throw error;
    }
  }

  async findWhenLessonCompleted(userId: string, courseId: string, lessonId: string) {
    try {
      const result = this.db.connection
        .select({ completed: lessonsCompleted.completed })
        .from(lessonsCompleted)
        .where(
          and(
            eq(lessonsCompleted.userId, userId),
            eq(lessonsCompleted.courseId, courseId),
            eq(lessonsCompleted.lessonId, lessonId)
          )
        )
        .get();
      return result?.completed;
    } catch (error) {
      console.error("Error ao buscar aulas completadas", error);
      throw error;
    }
  }

  async completeLesson(userId: string, courseId: string, lessonId: string) {
    try {
      const result = this.db.connection
        .insert(lessonsCompleted)
        .values({ userId, courseId, lessonId })
        .onConflictDoNothing()
        .returning()
        .get();
      return result;
    } catch (error) {
      console.error("Error ao completar aula", error);
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
      return result;
    } catch (error) {
      console.error("Error ao buscar aula por slug", error);
      throw error;
    }
  }

  async resetCourseCompleted(userId: string, courseId: string) {
    try {
      return this.db.connection
        .delete(lessonsCompleted)
        .where(and(eq(lessonsCompleted.userId, userId), eq(lessonsCompleted.courseId, courseId)))
        .returning()
        .get();
    } catch (error) {
      console.error("Error ao resetar curso", error);
      throw error;
    }
  }
}
