import { lessons } from "../../../db/schema";

export type ILesson = typeof lessons.$inferInsert;
export type ICreateLessonInput = Omit<ILesson, "id" | "created">;
