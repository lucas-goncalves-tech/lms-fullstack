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
    const result = await this.lessonRepository.findManyByCourseSlug(courseSlug);
    return result;
  }

  async findBySlug(courseSlug: string, lessonSlug: string) {
    const lesson = await this.lessonRepository.findBySlug(courseSlug, lessonSlug);
    if (!lesson) {
      throw new NotfoundError("Aula não encontrada");
    }
    const lessonNav = await this.lessonRepository.lessonNav(courseSlug, lessonSlug);
    const i = lessonNav.findIndex((l) => l.slug === lesson.slug);
    const prevLesson = lessonNav[i - 1]?.slug ?? null;
    const nextLesson = lessonNav[i + 1]?.slug ?? null;

    return { ...lesson, prevLesson, nextLesson };
  }
}
