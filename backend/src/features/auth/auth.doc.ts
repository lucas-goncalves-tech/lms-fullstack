import {
  badRequestResponse,
  conflictResponse,
  forbiddenResponse,
  unauthorizedResponse,
} from "../../doc/errors/errors";
import { registry } from "../../doc/openapi.registry";
import { createUserResponseSchema } from "./dto/auth.dto";
import { createUserDto } from "./dto/create-user.dto";
import { loginUserDto } from "./dto/login-user.dto";

registry.registerPath({
  method: "post",
  tags: ["Auth"],
  path: "/auth/register",
  summary: "Cria um novo usuário",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserDto,
          example: {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            confirmPassword: "password123",
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Usuário criado com sucesso!",
      content: {
        "application/json": {
          schema: createUserResponseSchema,
        },
      },
    },
    ...badRequestResponse,
    ...forbiddenResponse,
    ...conflictResponse,
  },
});

registry.registerPath({
  method: "post",
  tags: ["Auth"],
  path: "/auth/login",
  summary: "Realiza login de um usuário",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginUserDto,
          example: {
            email: "john.doe@example.com",
            password: "password123",
          },
        },
      },
    },
  },
  responses: {
    204: {
      description: "Login realizado com sucesso!",
    },
    ...badRequestResponse,
    ...unauthorizedResponse,
  },
});

registry.registerPath({
  method: "get",
  tags: ["Auth"],
  path: "/auth/me",
  summary: "Retorna as informações do usuário autenticado",
  security: [{ cookieAuth: [] }],
  responses: {
    200: {
      description: "Usuário autenticado!",
      content: {
        "application/json": {
          schema: createUserResponseSchema,
        },
      },
    },
    ...unauthorizedResponse,
  },
});

registry.registerPath({
  method: "delete",
  tags: ["Auth"],
  path: "/auth/logout",
  summary: "Realiza logout de um usuário",
  security: [{ cookieAuth: [] }],
  responses: {
    204: {
      description: "Logout realizado com sucesso!",
    },
    ...unauthorizedResponse,
  },
});
