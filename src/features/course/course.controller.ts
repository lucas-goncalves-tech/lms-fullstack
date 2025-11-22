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

  findAll = async (_req: Request, res: Response) => {
    const result = await this.courseService.findAll();
    res.status(200).json(result);
  };

  findBySlug = async (req: Request, res: Response) => {
    const { courseSlug } = req.params;
    const result = await this.courseService.findBySlug(courseSlug);
    res.status(200).json(result);
  };
}
