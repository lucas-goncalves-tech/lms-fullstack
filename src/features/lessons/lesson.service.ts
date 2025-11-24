import { BadRequestError } from "../../shared/errors/bad-request.error";
import { ConflictError } from "../../shared/errors/conflict.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { CourseRepository } from "../course/course.repository";
import { CertificateRepository } from "../certificates/certificate.repository";
import { LessonRepository } from "./lesson.repository";
import { CreateLessonDTO } from "./dto/create-lesson.dto";

export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly courseRepository: CourseRepository,
    private readonly certificateRepository: CertificateRepository
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
    return await this.lessonRepository.findManyByCourseSlug(courseSlug);
  }

  async findBySlug(userId: string, courseSlug: string, lessonSlug: string) {
    const lesson = await this.lessonRepository.findBySlug(courseSlug, lessonSlug);
    if (!lesson) {
      throw new NotfoundError("Aula não encontrada");
    }
    const lessonNav = await this.lessonRepository.lessonNav(courseSlug, lessonSlug);
    const i = lessonNav.findIndex((l) => l.slug === lesson.slug);
    const prevLesson = lessonNav[i - 1]?.slug ?? null;
    const nextLesson = lessonNav[i + 1]?.slug ?? null;

    let completed = "";
    const whenComplete = await this.lessonRepository.findWhenLessonCompleted(
      userId,
      lesson.courseId,
      lesson.id
    );
    if (whenComplete) {
      completed = whenComplete;
    }

    return { ...lesson, prevLesson, nextLesson, completed };
  }

  async completeLesson(userId: string, courseSlug: string, lessonSlug: string) {
    const lesson = await this.lessonRepository.findBySlug(courseSlug, lessonSlug);
    if (!lesson) {
      throw new NotfoundError("Curso ou aula não encontrada");
    }
    const result = await this.lessonRepository.completeLesson(userId, lesson.courseId, lesson.id);
    if (!result) {
      throw new BadRequestError("Aula já foi completada");
    }
    const progress = await this.lessonRepository.lessonsProgress(userId, lesson.courseId);
    const incompleteLessons = progress.filter((l) => !l.completed);
    let hasCertificate = "";
    if (progress.length > 0 && incompleteLessons.length === 0) {
      const certificate = await this.certificateRepository.create(userId, lesson.courseId);
      if (!certificate) {
        throw new BadRequestError("Não foi possível emitir o certificado");
      }
      hasCertificate = certificate.id;
    }
    return {
      completed: result.completed,
      hasCertificate,
    };
  }

  async resetCourseCompleted(userId: string, courseSlug: string) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }
    const result = await this.lessonRepository.resetCourseCompleted(userId, course.id);
    if (!result) {
      throw new BadRequestError("Aulas do curso já foram resetadas");
    }
  }
}
