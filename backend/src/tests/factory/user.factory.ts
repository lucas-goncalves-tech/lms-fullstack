import { users } from "../../db/schema";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { db_tests } from "../setup";

export const createUser = async (override?: Partial<typeof users.$inferSelect>) => {
  const password_hash = await new CryptoService().hash("password123");
  const defaultUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    password_hash,
    ...override,
  };
  return db_tests.connection.insert(users).values(defaultUser).returning().get();
};
