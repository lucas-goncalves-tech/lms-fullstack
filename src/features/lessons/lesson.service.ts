import { ConflictError } from "../../shared/errors/conflict.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { CourseRepository } from "../course/course.repository";
import { CreateLessonDTO } from "./dto/create-lesson.dto";
import { LessonRepository } from "./lesson.repository";

export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly courseRepository: CourseRepository
  ) {}

  async createLesson(courseSlug: string, lessonData: CreateLessonDTO) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }

    const result = await this.lessonRepository.createLesson({
      ...lessonData,
      courseId: course.id,
    });
    if (!result) {
      throw new ConflictError("Esta aula já existe");
    }
    return result;
  }

  async findManyByCourseSlug(courseSlug: string) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }
    const result = await this.lessonRepository.findManyByCourseId(course.id);
    return result;
  }
}
