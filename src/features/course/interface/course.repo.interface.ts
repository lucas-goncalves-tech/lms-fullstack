import { CreateCourseDTO } from "../dto/create-course.dto";
import { ICourses } from "./course.interface";

export interface ICourseRepository {
  createCourse(courseData: CreateCourseDTO): Promise<ICourses | null>;
}
