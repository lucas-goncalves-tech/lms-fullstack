import { certificates } from "../../db/schema";
import { db_tests } from "../setup";

export function createCertificate(
  userId: string,
  courseId: string,
  overrides?: Partial<typeof certificates.$inferInsert>
) {
  return db_tests.connection
    .insert(certificates)
    .values({
      userId,
      courseId,
      ...overrides,
    })
    .returning()
    .get();
}
