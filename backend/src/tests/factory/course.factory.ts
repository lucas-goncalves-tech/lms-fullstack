import { db_tests } from "../setup";
import { courses } from "../../db/schema";

export const createCourse = (overrides?: Partial<typeof courses.$inferInsert>) => {
  return db_tests.connection
    .insert(courses)
    .values({
      title: "Test Course",
      description: "Test Description",
      slug: "test-course",
      ...overrides,
    })
    .returning()
    .get();
};
