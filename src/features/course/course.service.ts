import { ConflictError } from "../../shared/errors/conflict.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { CourseRepository } from "./course.repository";
import { ICreateCourseInput } from "./interface/course.interface";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async findAll() {
    return this.courseRepository.findAll();
  }

  async createCourse(courseData: ICreateCourseInput) {
    const result = await this.courseRepository.createCourse(courseData);
    if (!result) {
      throw new ConflictError("Este curso já existe");
    }
    return result;
  }

  async findBySlug(slug: string) {
    const result = await this.courseRepository.findBySlug(slug);
    if (!result) {
      throw new NotfoundError("Curso não encontrado");
    }
    return result;
  }
}
