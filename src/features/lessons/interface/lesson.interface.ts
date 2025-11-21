import { lessons } from "../../../db/schema";

export type ILesson = typeof lessons.$inferInsert;
