import { agent } from "supertest";
import { createUser } from "../factory/user.factory";
import { app_tests } from "../setup";

export const loginWithUser = async (role: "USER" | "ADMIN" = "USER") => {
  const email = role === "USER" ? "user@test.com" : "admin@test.com";
  const user = await createUser({ email, role });
  const reqAgent = agent(app_tests);
  const { body } = await reqAgent.post("/api/v1/auth/login").send({
    email,
    password: "password123",
  });
  return { reqAgent, body, user };
};
