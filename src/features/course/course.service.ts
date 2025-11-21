import { ConflictError } from "../../shared/errors/conflict.error";
import { ICourseRepository } from "./interface/course.repo.interface";
import { CreateCourseInput } from "./interface/create-course.interface";

export class CourseService {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async findAll() {
    return this.courseRepository.findAll();
  }

  async createCourse(courseData: CreateCourseInput) {
    const result = await this.courseRepository.createCourse(courseData);
    if (!result) {
      throw new ConflictError("Este curso já existe");
    }
    return result;
  }
}
