import { asc, eq } from "drizzle-orm";
import { DataBase } from "../../db";
import { lessons } from "../../db/schema";
import { ICreateLessonInput, ILesson } from "./interface/lesson.interface";

export class LessonRepository {
  constructor(private readonly db: DataBase) {}

  async createLesson(lessonData: ICreateLessonInput): Promise<ILesson | null> {
    try {
      const result = this.db.connection
        .insert(lessons)
        .values(lessonData)
        .onConflictDoNothing()
        .returning()
        .get();
      if (!result) return null;
      return result;
    } catch (error) {
      console.error("Error ao criar nova aula", error);
      throw error;
    }
  }

  async findManyByCourseId(courseId: string): Promise<ILesson[]> {
    try {
      const result = this.db.connection
        .select()
        .from(lessons)
        .where(eq(lessons.courseId, courseId))
        .orderBy(asc(lessons.order));
      if (!result) return [];
      return result;
    } catch (error) {
      console.error("Error ao buscar aulas por curso", error);
      throw error;
    }
  }
}
