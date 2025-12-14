import { ConflictError } from "../../shared/errors/conflict.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { CourseRepository } from "../course/course.repository";
import { ICreateCourseInput } from "../course/interface/course.interface";
import { CreateLessonDTO } from "./dto/create-lesson.dto";
import { LessonRepository } from "../lessons/lesson.repository";
import { UpdateCourseDTO } from "./dto/update-course.dto";
import { UserRepository } from "../user/user.repository";
import { IAdminCreateUserInput, IUpdateUserInput } from "../user/interface/user.interface";
import { AdminCreateUserDTO } from "./dto/admin-create-user.dto";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { UnprocessableEntityError } from "../../shared/errors/unprocessable-entity.error";
import { VideoService } from "../video/video.service";
import { BadRequestError } from "../../shared/errors/bad-request.error";
import { UpdateLessonDTO } from "./dto/update-lesson.dto";
import { UserQueryDTO } from "./dto/users-query.dto";

export class AdminService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly videoService: VideoService
  ) {}

  // Courses
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

  // Lessons
  async createLesson(courseSlug: string, lessonData: CreateLessonDTO) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }

    const videoExist = await this.videoService.fileExist(lessonData.video);
    if (!videoExist) {
      throw new BadRequestError("Caminho do video inválido");
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

  async updateLesson(courseSlug: string, lessonSlug: string, lessonData: UpdateLessonDTO) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }

    const lesson = await this.lessonRepository.findBySlug(courseSlug, lessonSlug);
    if (!lesson) {
      throw new NotfoundError("Aula não encontrado");
    }

    const result = await this.lessonRepository.updateLesson(lesson.id, {
      ...lessonData,
      courseId: course.id,
    });
    if (!result) {
      throw new Error(`Não foi possivel atualizar a aula ${lessonSlug}`);
    }
    if (lesson.video !== lessonData.video) {
      await this.videoService.rm(lesson.video);
    }
    return {
      title: lesson.title,
    };
  }

  async deleteLesson(courseSlug: string, lessonSlug: string) {
    const course = await this.courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotfoundError("Curso não encontrado");
    }
    const lesson = await this.lessonRepository.findBySlug(courseSlug, lessonSlug);
    if (!lesson) {
      throw new NotfoundError("Aula não encontrada");
    }

    await this.lessonRepository.deleteLesson(course.id, lesson.id);
    await this.videoService.rm(lesson.video);
  }

  async findManyLessons(courseSlug: string) {
    const result = await this.lessonRepository.findManyByCourseSlug(courseSlug);
    if (!result) {
      throw new NotfoundError("Nenhuma aula encontrada");
    }
    return result;
  }

  // Users
  async findManyUsers(query: UserQueryDTO) {
    const result = await this.userRepository.findMany(query.search, query.limit, query.page);
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

  async deleteUser(adminId: string, userId: string) {
    const user = await this.userRepository.findUserByKey("id", userId);
    if (!user) {
      throw new NotfoundError("Usuário não encontrado");
    }
    if (adminId === user.id) {
      throw new UnprocessableEntityError("Não é possível deletar você mesmo");
    }
    await this.userRepository.deleteUser(userId);
  }
}
