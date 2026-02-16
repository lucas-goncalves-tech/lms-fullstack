import { describe, expect, it } from "vitest";
import { req } from "../../../tests/setup";
import { loginWithUser } from "../../../tests/helpers/auth.helper";
import { createCourse } from "../../../tests/factory/course.factory";
import { createLesson } from "../../../tests/factory/lesson.factory";
import { LessonResponse, FindLessonBySlugResponse } from "../dto/lesson.dto";

function expectFindManyByCourseSlugShape(overrides?: Partial<LessonResponse>) {
  return {
    id: expect.any(String),
    courseId: expect.any(String),
    title: expect.any(String),
    slug: expect.any(String),
    description: expect.any(String),
    seconds: expect.any(Number),
    order: expect.any(Number),
    created: expect.any(String),
    ...overrides,
  };
}

function expectFindLessonBySlugShape(
  overrides?: Partial<FindLessonBySlugResponse>
): FindLessonBySlugResponse {
  return {
    id: expect.any(String),
    courseId: expect.any(String),
    title: expect.any(String),
    slug: expect.any(String),
    description: expect.any(String),
    seconds: expect.any(Number),
    order: expect.any(Number),
    created: expect.any(String),
    completed: null,
    prevLesson: null,
    nextLesson: null,
    videoUrl: expect.any(String),
    ...overrides,
  };
}

describe("Lesson Integration Tests", () => {
  const BASE_URL = "/api/v1/lessons";

  describe("GET /api/v1/lessons/:courseSlug", () => {
    it("should return lessons for course", async () => {
      const course = createCourse();
      createLesson(course.id);
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent.get(`${BASE_URL}/${course.slug}`).expect(200);

      expect(body).toHaveLength(1);
      expect(body[0]).toMatchObject(expectFindManyByCourseSlugShape({ completed: null }));
    });

    it("should return 401 when is nonauthenticated", async () => {
      const { body } = await req.get(`${BASE_URL}/non-existent-course`).expect(401);

      expect(body).toHaveProperty("message");
    });

    it("should return 404 when course not found", async () => {
      const { reqAgent } = await loginWithUser();

      await reqAgent.get(`${BASE_URL}/non-existent-course`).expect(404);
    });

    it("should return lessons ordered by order field", async () => {
      const course = createCourse();
      createLesson(course.id, { order: 2, title: "Lesson 2", slug: "lesson-2" });
      createLesson(course.id, { order: 1, title: "Lesson 1", slug: "lesson-1" });
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent.get(`${BASE_URL}/${course.slug}`).expect(200);

      expect(body).toHaveLength(2);
      expect(body[0].order).toBeLessThan(body[1].order);
    });
  });

  describe("GET /api/v1/lessons/:courseSlug/:lessonSlug", () => {
    it("should return lesson details", async () => {
      const course = createCourse();
      const lesson = createLesson(course.id);
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent.get(`${BASE_URL}/${course.slug}/${lesson.slug}`).expect(200);

      expect(body).toMatchObject(expectFindLessonBySlugShape());
    });

    it("should return 401 when is nonauthenticated", async () => {
      const { body } = await req
        .get(`${BASE_URL}/non-existent-course/non-existent-lesson`)
        .expect(401);

      expect(body).toHaveProperty("message");
    });

    it("should return 404 when lesson not found", async () => {
      const course = createCourse();
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent
        .get(`${BASE_URL}/${course.slug}/non-existent-lesson`)
        .expect(404);

      expect(body).toHaveProperty("message");
    });

    it("should return 404 when course not found", async () => {
      const { reqAgent } = await loginWithUser();

      await reqAgent.get(`${BASE_URL}/non-existent-course/lesson-1`).expect(404);
    });
  });

  describe.todo("GET /api/v1/lessons/:courseSlug/:lessonSlug/video", () => {
    it("should stream video file", async () => {
      // TODO: Implement test
    });

    it("should support range requests (206 Partial Content)", async () => {
      // TODO: Implement test
    });

    it("should return 404 when video file not found", async () => {
      // TODO: Implement test
    });

    it("should set correct content-type header", async () => {
      // TODO: Implement test
    });
  });

  describe.todo("GET /api/v1/lessons/:courseSlug/:lessonSlug/complete", () => {
    it("should mark lesson as completed", async () => {
      // TODO: Implement test
    });

    it("should update course progress", async () => {
      // TODO: Implement test
    });

    it("should generate certificate when course 100% completed", async () => {
      // TODO: Implement test
    });

    it("should not duplicate completion record", async () => {
      // TODO: Implement test
    });
  });

  describe.todo("DELETE /api/v1/lessons/:courseSlug/reset", () => {
    it("should reset all lessons progress", async () => {
      // TODO: Implement test
    });

    it("should delete all completion records", async () => {
      // TODO: Implement test
    });

    it("should return 204 on success", async () => {
      // TODO: Implement test
    });

    it("should return 404 when course not found", async () => {
      // TODO: Implement test
    });
  });
});
