import { Request, Response } from "express";
import { CourseService } from "./course.service";
import { CreateCourseDTO } from "./dto/create-course.dto";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  createCourse = async (req: Request, res: Response) => {
    const courseData = req.body as CreateCourseDTO;
    const result = await this.courseService.createCourse(courseData);

    res.status(201).json(result);
  };

  findManyWithProgress = async (_req: Request, res: Response) => {
    const userId = _req.session!.userId;
    const result = await this.courseService.findManyWithProgress(userId);
    res.json(result);
  };
}
