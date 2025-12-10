import { ConflictError } from "../../shared/errors/conflict.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { LessonRepository } from "../lessons/lesson.repository";
import { CourseRepository } from "./course.repository";
import { ICreateCourseInput } from "./interface/course.interface";

export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly lessonRepository: LessonRepository
  ) {}

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
    return result;
  }

  async findBySlug(userId: string, slug: string) {
    const result = await this.courseRepository.findBySlug(slug);
    if (!result) {
      throw new NotfoundError("Curso não encontrado");
    }
    const completed = await this.lessonRepository.findManyLessonsCompleted(userId, result.id);
    return { ...result, completed };
  }
}
