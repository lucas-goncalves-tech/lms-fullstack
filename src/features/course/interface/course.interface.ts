import { courses } from "../../../db/schema";

export type ICourses = typeof courses.$inferSelect;
export type ICreateCourseInput = Omit<ICourses, "id" | "created">;
