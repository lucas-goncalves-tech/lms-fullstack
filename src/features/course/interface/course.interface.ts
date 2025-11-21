import { courses } from "../../../db/schema";

export type ICourses = typeof courses.$inferSelect;
