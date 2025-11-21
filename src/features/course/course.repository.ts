import { DataBase } from "../../db";
import { courses } from "../../db/schema";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { ICourseRepository } from "./interface/course.repo.interface";

export class CourseRepository implements ICourseRepository {
  constructor(private readonly db: DataBase) {}

  async createCourse(courseData: CreateCourseDTO) {
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
