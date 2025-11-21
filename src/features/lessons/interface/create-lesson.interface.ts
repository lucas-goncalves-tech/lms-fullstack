import { ILesson } from "./lesson.interface";

export type CreateLessonInput = Omit<ILesson, "id" | "created">;
