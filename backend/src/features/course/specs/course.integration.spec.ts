import { describe, expect, it } from "vitest";
import { req } from "../../../tests/setup";
import { loginWithUser } from "../../../tests/helpers/auth.helper";
import { FindCourseResponse } from "../dto/course.dto";
import { createCourse } from "../../../tests/factory/course.factory";

function expectedCourseShape(): FindCourseResponse {
  return {
    id: expect.any(String),
    slug: expect.any(String),
    title: expect.any(String),
    description: expect.any(String),
    created: expect.any(String),
    totalSeconds: expect.any(Number),
    totalLessons: expect.any(Number),
  };
}

describe("Course Integration Tests", () => {
  const BASE_URL = "/api/v1/courses";
  describe("GET /api/v1/courses", () => {
    it("should return list of courses with progress", async () => {
      const { reqAgent } = await loginWithUser();
      createCourse();

      const { body } = await reqAgent.get(BASE_URL).expect(200);

      expect(body).toHaveLength(1);
      expect(body[0]).toMatchObject(expectedCourseShape());
    });

    it("should return empty array when no courses", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent.get(BASE_URL).expect(200);

      expect(body).toHaveLength(0);
      expect(body).toEqual([]);
    });

    it("should return 401 when not authenticated", async () => {
      const { body } = await req.get(BASE_URL).expect(401);

      expect(body).toHaveProperty("message");
    });
  });

  describe("GET /api/v1/courses/:courseSlug", () => {
    it("should return course details by slug", async () => {
      const { reqAgent } = await loginWithUser();
      const course = createCourse();

      const { body } = await reqAgent.get(`${BASE_URL}/${course.slug}`).expect(200);

      expect(body).toMatchObject(expectedCourseShape());
    });

    it("should return 404 when course not found", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent.get(`${BASE_URL}/not-found`).expect(404);

      expect(body).toHaveProperty("message");
    });

    it("should return 401 when not authenticated", async () => {
      const { body } = await req.get(`${BASE_URL}/not-found`).expect(401);

      expect(body).toHaveProperty("message");
    });
  });
});
