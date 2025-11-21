import { eq } from "drizzle-orm";
import { DataBase } from "../../db";
import { courses } from "../../db/schema";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { ICourseRepository } from "./interface/course.repo.interface";
import { CreateCourseInput } from "./interface/create-course.interface";

export class CourseRepository implements ICourseRepository {
  constructor(private readonly db: DataBase) {}

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
