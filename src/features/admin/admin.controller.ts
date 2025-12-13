import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { CreateLessonDTO } from "./dto/create-lesson.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { AdminCreateUserDTO } from "./dto/admin-create-user.dto";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Courses
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

  // Lessons
  createLesson = async (req: Request, res: Response) => {
    const lessonData = req.body as CreateLessonDTO;
    const { courseSlug } = req.params;
    const result = await this.adminService.createLesson(courseSlug, lessonData);

    res.status(201).json(result);
  };

  deleteLesson = async (req: Request, res: Response) => {
    const { courseSlug, lessonSlug } = req.params;
    await this.adminService.deleteLesson(courseSlug, lessonSlug);

    res.status(204).json();
  };

  findManyLessons = async (req: Request, res: Response) => {
    const { courseSlug } = req.params;
    const result = await this.adminService.findManyLessons(courseSlug);
    res.status(200).json(result);
  };

  // Users
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

  toggleUserStatus = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const adminId = req.session!.userId;

    const result = await this.adminService.toggleUserStatus(adminId, userId);

    res.status(200).json({
      message: result.isActive
        ? `Usuário ${result.name} ativado com sucesso!`
        : `Usuário ${result.name} desativado com sucesso!`,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const adminId = req.session!.userId;
    await this.adminService.deleteUser(adminId, userId);

    res.status(204).json();
  };
}
