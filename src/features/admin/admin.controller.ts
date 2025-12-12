import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { CreateLessonDTO } from "./dto/create-lesson.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  findMany = async (_req: Request, res: Response) => {
    const result = await this.adminService.findMany();
    res.status(200).json(result);
  };

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

  updateCourse = async (req: Request, res: Response) => {
    const { courseSlug } = req.params;
    const courseData = req.body as UpdateCourseDTO;
    await this.adminService.updateCourse(courseSlug, courseData);

    res.status(200).json({
      message: "Curso atualizado com sucesso!",
    });
  };

  deleteCourse = async (req: Request, res: Response) => {
    const { courseSlug } = req.params;
    await this.adminService.deleteCourse(courseSlug);

    res.status(204).json();
  };
}
