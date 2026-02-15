import { describe, it, expect } from "vitest";
import { req } from "../../../tests/setup";
import { CreateUserDto } from "../dto/create-user.dto";
import { createUser } from "../../../tests/factory/user.factory";
import { loginWithUser } from "../../../tests/helpers/auth.helper";

describe("Auth Integration Tests", () => {
  const BASE_URL = "/api/v1/auth";
  describe("POST /api/v1/auth/register", () => {
    it("should create user with valid data", async () => {
      const newUser: CreateUserDto = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const { body } = await req.post(`${BASE_URL}/register`).send(newUser).expect(201);

      expect(body).toHaveProperty("message");
    });

    it("should return 400 when body data is invalid", async () => {
      const invalidUser: CreateUserDto = {
        name: "Jo",
        email: "john.doeexamplecom",
        password: "pass",
        confirmPassword: "pass",
      };

      const { body } = await req.post(`${BASE_URL}/register`).send(invalidUser).expect(400);
      const errors = body.errors.map((e: object) => Object.keys(e)[0]);

      expect(body).toHaveProperty("message");
      expect(errors).toContain("name");
      expect(errors).toContain("email");
      expect(errors).toContain("password");
      expect(errors).toContain("confirmPassword");
    });

    it("should return 409 when email already exists", async () => {
      const newUser: CreateUserDto = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      await req.post(`${BASE_URL}/register`).send(newUser).expect(201);

      const { body } = await req.post(`${BASE_URL}/register`).send(newUser).expect(409);

      expect(body).toHaveProperty("message");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should authenticate with valid credentials", async () => {
      const user = await createUser();
      const { body } = await req
        .post(`${BASE_URL}/login`)
        .send({
          email: user.email,
          password: "password123",
        })
        .expect(204);
      expect(body).toEqual({});
    });

    it("should return 401 when email not found", async () => {
      const invalidUser = {
        email: "invalid@example.com",
        password: "password123",
      };

      const { body } = await req.post(`${BASE_URL}/login`).send(invalidUser).expect(401);

      expect(body).toHaveProperty("message");
    });

    it("should return 401 when password is incorrect", async () => {
      const user = await createUser();
      const { body } = await req
        .post(`${BASE_URL}/login`)
        .send({
          email: user.email,
          password: "wrong-password",
        })
        .expect(401);
      expect(body).toHaveProperty("message");
    });

    it("should return 400 when body data is invalid", async () => {
      const invalidUser = {
        email: "invalidexamplecom",
        password: "pass",
      };

      const { body } = await req.post(`${BASE_URL}/login`).send(invalidUser).expect(400);
      const errors = body.errors.map((e: object) => Object.keys(e)[0]);

      expect(body).toHaveProperty("message");
      expect(errors).toContain("email");
      expect(errors).toContain("password");
    });

    it("should set session cookie on success", async () => {
      const user = await createUser();
      const { body, headers } = await req
        .post(`${BASE_URL}/login`)
        .send({
          email: user.email,
          password: "password123",
        })
        .expect(204);

      const cookies = headers["set-cookie"][0];
      expect(body).toEqual({});
      expect(cookies).toContain("sid");
    });
  });

  describe("GET /api/v1/auth/me", () => {
    it("should return user data when authenticated", async () => {
      const { reqAgent } = await loginWithUser();
      const { body } = await reqAgent.get(`${BASE_URL}/me`).expect(200);
      expect(body).not.toHaveProperty("id");
      expect(body).not.toHaveProperty("password_hash");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("email");
      expect(body).toHaveProperty("role");
    });

    it("should return 401 when not authenticated", async () => {
      const { body } = await req.get(`${BASE_URL}/me`).expect(401);
      expect(body).toHaveProperty("message");
    });
  });

  describe("DELETE /api/v1/auth/logout", () => {
    it("should clear session cookie on logout and unauthorized on /me", async () => {
      const { reqAgent } = await loginWithUser();

      await reqAgent.delete(`${BASE_URL}/logout`).expect(204);
      await reqAgent.get(`${BASE_URL}/me`).expect(401);
    });
  });
});
