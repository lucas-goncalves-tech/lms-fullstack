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
}
