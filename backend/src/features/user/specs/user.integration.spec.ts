import { describe, expect, it } from "vitest";
import { loginWithUser } from "../../../tests/helpers/auth.helper";
import { req } from "../../../tests/setup";

describe("User Integration Tests", () => {
  const BASE_URL = "/api/v1/user";
  describe("PUT /api/v1/user/password/update", () => {
    it("should update password with valid current password", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent
        .put(`${BASE_URL}/password/update`)
        .send({
          currentPassword: "password123",
          newPassword: "newPassword123",
          confirmPassword: "newPassword123",
        })
        .expect(204);

      expect(body).toEqual({});
    });

    it("should return 422 when current password is incorrect", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent
        .put(`${BASE_URL}/password/update`)
        .send({
          currentPassword: "wrongPassword",
          newPassword: "newPassword123",
          confirmPassword: "newPassword123",
        })
        .expect(422);

      expect(body).toHaveProperty("message");
    });

    it("should return 400 when new password is too short", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent
        .put(`${BASE_URL}/password/update`)
        .send({
          currentPassword: "password123",
          newPassword: "short",
          confirmPassword: "short",
        })
        .expect(400);
      const errors = body.errors.map((e: object) => Object.keys(e)[0]);

      expect(body).toHaveProperty("message");
      expect(errors).toContain("newPassword");
      expect(errors).toContain("confirmPassword");
    });

    it("should return 401 when not authenticated", async () => {
      const { body } = await req.put(`${BASE_URL}/password/update`).send().expect(401);

      expect(body).toHaveProperty("message");
    });
  });

  describe("PUT /api/v1/user/email/update", () => {
    it("should update email with valid data", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent
        .put(`${BASE_URL}/email/update`)
        .send({
          email: "newEmail@test.com",
        })
        .expect(204);

      expect(body).toEqual({});
    });

    it("should return 400 when email format is invalid", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent
        .put(`${BASE_URL}/email/update`)
        .send({
          email: "invalidEmail",
        })
        .expect(400);
      const errors = body.errors.map((e: object) => Object.keys(e)[0]);

      expect(body).toHaveProperty("message");
      expect(errors).toContain("email");
    });

    it("should return 409 when email already exists", async () => {
      const { reqAgent } = await loginWithUser();

      const { body } = await reqAgent
        .put(`${BASE_URL}/email/update`)
        .send({
          email: "user@test.com",
        })
        .expect(409);

      expect(body).toHaveProperty("message");
    });

    it("should return 401 when not authenticated", async () => {
      const { body } = await req.put(`${BASE_URL}/email/update`).send().expect(401);

      expect(body).toHaveProperty("message");
    });
  });
});
