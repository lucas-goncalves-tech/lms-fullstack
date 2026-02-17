import { describe, expect, it } from "vitest";
import { req } from "../../../tests/setup";
import { loginWithUser } from "../../../tests/helpers/auth.helper";
import { createCourse } from "../../../tests/factory/course.factory";
import { createCertificate } from "../../../tests/factory/certificate.factory";

function expectCertificateShape() {
  return {
    id: expect.any(String),
    name: expect.any(String),
    courseId: expect.any(String),
    title: expect.any(String),
    totalSeconds: expect.any(Number),
    totalLessons: expect.any(Number),
    completed: expect.any(String),
  };
}

describe("Certificate Integration Tests", () => {
  const BASE_URL = "/api/v1/certificates";

  describe("GET /api/v1/certificates", () => {
    it("should return list of user certificates", async () => {
      const { reqAgent, user } = await loginWithUser();
      const course = createCourse();

      createCertificate(user.id, course.id);

      const { body } = await reqAgent.get(BASE_URL).expect(200);

      expect(body).toHaveLength(1);
      expect(body[0]).toMatchObject(expectCertificateShape());
    });

    it("should return empty array when no certificates", async () => {
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

  describe("GET /api/v1/certificates/:certificateId", () => {
    it("should return certificate PDF", async () => {
      const { reqAgent, user } = await loginWithUser();
      const course = createCourse();

      const certificate = createCertificate(user.id, course.id);

      const { body, headers } = await reqAgent.get(`${BASE_URL}/${certificate.id}`).expect(200);

      expect(body).toBeDefined();
      expect(headers["content-type"]).toBe("application/pdf");
    });

    it("should return 404 when certificate not found", async () => {
      const { reqAgent } = await loginWithUser();
      const uuid = crypto.randomUUID();

      const { body } = await reqAgent.get(`${BASE_URL}/${uuid}`).expect(404);

      expect(body).toHaveProperty("message");
    });
  });
});
