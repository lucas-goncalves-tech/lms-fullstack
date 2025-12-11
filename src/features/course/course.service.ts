import { ConflictError } from "../../shared/errors/conflict.error";
import { CourseRepository } from "./course.repository";
import { ICreateCourseInput } from "./interface/course.interface";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async findManyWithProgress(userId: string) {
    const courses = await this.courseRepository.findManyWithProgress(userId);
    //eslint-disable-next-line
    return courses.map(({ userId, ...course }) => course);
  }

  async createCourse(courseData: ICreateCourseInput) {
    const result = await this.courseRepository.createCourse(courseData);
    if (!result) {
      throw new ConflictError("Este curso já existe");
    }
  }
}
