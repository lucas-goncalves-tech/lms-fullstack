import { DataBase } from "../../db";
import { lessons } from "../../db/schema";
import { CreateLessonInput } from "./interface/create-lesson.interface";
import { ILessonRepository } from "./interface/lesson-repo.interface";
import { ILesson } from "./interface/lesson.interface";

export class LessonRepository implements ILessonRepository {
  constructor(private readonly db: DataBase) {}

  async createLesson(lessonData: CreateLessonInput): Promise<ILesson | null> {
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
}
