import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { CreateLessonDTO } from "./dto/create-lesson.dto";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  createCourse = async (req: Request, res: Response) => {
    const courseData = req.body as CreateCourseDTO;
    await this.adminService.createCourse(courseData);

    res.status(201).json({
      message: "Curso criado com sucesso!",
    });
  };

  createLesson = async (req: Request, res: Response) => {
    const lessonData = req.body as CreateLessonDTO;
    const { courseSlug } = req.params;
    const result = await this.adminService.createLesson(courseSlug, lessonData);

    res.status(201).json(result);
  };
}
