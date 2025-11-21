import { CreateLessonInput } from "./create-lesson.interface";
import { ILesson } from "./lesson.interface";

export interface ILessonRepository {
  createLesson(lessonData: CreateLessonInput): Promise<ILesson | null>;
}
