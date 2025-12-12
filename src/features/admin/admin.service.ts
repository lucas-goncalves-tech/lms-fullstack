import { ConflictError } from "../../shared/errors/conflict.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { CourseRepository } from "../course/course.repository";
import { ICreateCourseInput } from "../course/interface/course.interface";
import { CreateLessonDTO } from "./dto/create-lesson.dto";
import { LessonRepository } from "../lessons/lesson.repository";
import { UpdateCourseDTO } from "./dto/update-course.dto";
import { UserRepository } from "../user/user.repository";
import { ForbiddenError } from "../../shared/errors/forbidden.error";
import { IAdminCreateUserInput, IUpdateUserInput } from "../user/interface/user.interface";
import { AdminCreateUserDTO } from "./dto/admin-create-user.dto";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { UnprocessableEntityError } from "../../shared/errors/unprocessable-entity.error";

export class AdminService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService
  ) {}

  async createCourse(courseData: ICreateCourseInput) {
    const result = await this.courseRepository.createCourse(courseData);
    if (!result) {
      throw new ConflictError("Este curso já existe");
    }
  }

  async findManyCourses() {
    const result = await this.courseRepository.findMany();
    return result;
  }

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

  async updateCourse(courseSlug: string, courseData: UpdateCourseDTO) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }
    await this.courseRepository.updateCourse(courseSlug, courseData);
  }

  async deleteCourse(courseSlug: string) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }
    await this.courseRepository.deleteCourse(courseSlug);
  }

  async findManyUsers() {
    const result = await this.userRepository.findMany();
    return result;
  }

  async updateUser(adminId: string, userId: string, userData: Partial<IUpdateUserInput>) {
    const user = await this.userRepository.findUserByKey("id", userId);
    if (!user) {
      throw new NotfoundError("Usuário não encontrado");
    }

    if (userData.role && adminId === user.id) {
      throw new UnprocessableEntityError("Você não pode alterar o seu próprio role");
    }
    await this.userRepository.updateUser(userId, userData);
  }

  async createUser(userData: AdminCreateUserDTO) {
    const userExist = await this.userRepository.findUserByKey("email", userData.email);
    if (userExist) throw new ConflictError("Email já cadastrado");
    const passwordhase = await this.cryptoService.hash(userData.password);
    const newUser: IAdminCreateUserInput = {
      name: userData.name,
      email: userData.email,
      password_hash: passwordhase,
      role: userData.role,
    };
    await this.userRepository.createUser(newUser);
  }

  async toggleUserStatus(adminId: string, userId: string) {
    const user = await this.userRepository.findUserByKey("id", userId);
    if (!user) {
      throw new NotfoundError("Usuário não encontrado");
    }
    if (adminId === user.id) {
      throw new UnprocessableEntityError("Você não pode alterar o seu próprio status");
    }
    const result = await this.userRepository.toggleUserStatus(userId);
    if (!result) {
      throw new Error("Problemas em atualizar status do usuário");
    }
    return result;
  }
}
