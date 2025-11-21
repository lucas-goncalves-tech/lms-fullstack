import { eq } from "drizzle-orm";
import { DataBase } from "../../db";
import { courses } from "../../db/schema";
import { CreateCourseInput } from "./interface/create-course.interface";

export class CourseRepository {
  constructor(private readonly db: DataBase) {}

  async findAll() {
    try {
      const result = this.db.connection.select().from(courses).all();
      if (result.length === 0) return [];
      return result;
    } catch (error) {
      console.error("Error ao encontrar cursos", error);
      throw error;
    }
  }

  async findBySlug(courseSlug: string) {
    try {
      const result = this.db.connection
        .select()
        .from(courses)
        .where(eq(courses.slug, courseSlug))
        .get();
      if (!result) return null;
      return result;
    } catch (error) {
      console.error("Error ao encontrar curso pelo slug", error);
      throw error;
    }
  }

  async createCourse(courseData: CreateCourseInput) {
    try {
      const result = this.db.connection
        .insert(courses)
        .values(courseData)
        .onConflictDoNothing()
        .returning()
        .get();
      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.error("Não foi possivel inserir um novo curso", error);
      throw error;
    }
  }
}
