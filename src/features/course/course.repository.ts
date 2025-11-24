import { asc, eq } from "drizzle-orm";
import { DataBase } from "../../db";
import { certificates, courses } from "../../db/schema";
import { ICreateCourseInput } from "./interface/course.interface";

export class CourseRepository {
  constructor(private readonly db: DataBase) {}

  async findAll() {
    try {
      return this.db.connection
        .select()
        .from(courses)
        .limit(100)
        .orderBy(asc(courses.created))
        .all();
    } catch (error) {
      console.error("Error ao encontrar cursos", error);
      throw error;
    }
  }

  async findBySlug(courseSlug: string) {
    try {
      return this.db.connection.select().from(courses).where(eq(courses.slug, courseSlug)).get();
    } catch (error) {
      console.error("Error ao encontrar curso pelo slug", error);
      throw error;
    }
  }

  async createCourse(courseData: ICreateCourseInput) {
    try {
      return this.db.connection
        .insert(courses)
        .values(courseData)
        .onConflictDoNothing()
        .returning()
        .get();
    } catch (error) {
      console.error("Não foi possivel inserir um novo curso", error);
      throw error;
    }
  }

  async completeCourse(userId: string, courseId: string) {
    try {
      return this.db.connection
        .insert(certificates)
        .values({ userId, courseId })
        .onConflictDoNothing()
        .returning({ id: certificates.id })
        .get();
    } catch (error) {
      console.error("Error ao completar curso", error);
      throw error;
    }
  }
}
