import { Request, Response } from "express";
import { CreateLessonDTO } from "./dto/create-lesson.dto";
import { LessonService } from "./lesson.service";

export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  createLesson = async (req: Request, res: Response) => {
    const lessonData = req.body as CreateLessonDTO;
    const { courseSlug } = req.params;
    const result = await this.lessonService.createLesson(courseSlug, lessonData);

    res.status(201).json(result);
  };

  findManyByCourseSlug = async (req: Request, res: Response) => {
    const { courseSlug } = req.params;
    const result = await this.lessonService.findManyByCourseSlug(courseSlug);

    res.status(200).json(result);
  };

  findBySlug = async (req: Request, res: Response) => {
    const userId = req.session!.userId;
    const { courseSlug, lessonSlug } = req.params;
    const result = await this.lessonService.findBySlug(userId, courseSlug, lessonSlug);

    res.status(200).json(result);
  };

  completeLesson = async (req: Request, res: Response) => {
    const userId = req.session!.userId;
    const { courseSlug, lessonSlug } = req.params;
    const result = await this.lessonService.completeLesson(userId, courseSlug, lessonSlug);

    res.status(200).json(result);
  };

  resetCourseCompleted = async (req: Request, res: Response) => {
    const userId = req.session!.userId;
    const { courseSlug } = req.params;
    await this.lessonService.resetCourseCompleted(userId, courseSlug);

    res.status(204).end();
  };
}
