import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { CreateLessonDTO } from "./dto/create-lesson.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { AdminCreateUserDTO } from "./dto/admin-create-user.dto";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  findManyCourses = async (_req: Request, res: Response) => {
    const result = await this.adminService.findManyCourses();
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

  findManyUsers = async (_req: Request, res: Response) => {
    const result = await this.adminService.findManyUsers();
    res.status(200).json(result);
  };

  updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const adminId = req.session!.userId;
    const userData = req.body as UpdateUserDTO;
    await this.adminService.updateUser(adminId, userId, userData);

    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
    });
  };

  createUser = async (req: Request, res: Response) => {
    const userData = req.body as AdminCreateUserDTO;
    await this.adminService.createUser(userData);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
    });
  };
}
