import { notFoundResponse, unauthorizedResponse } from "../../doc/errors/errors";
import { registry } from "../../doc/openapi.registry";
import { findLessonParamsSchema } from "../lessons/dto/lesson-params.dto";
import { findCourseSchema } from "./dto/course.dto";

registry.registerPath({
  path: "/courses",
  method: "get",
  summary: "Lista de cursos com progresso",
  security: [{ cookieAuth: [] }],
  tags: ["Courses"],
  responses: {
    200: {
      description: "Lista de cursos",
      content: {
        "application/json": {
          schema: findLessonParamsSchema,
        },
      },
    },
    ...unauthorizedResponse,
  },
});

registry.registerPath({
  path: "/courses/{courseSlug}",
  method: "get",
  summary: "Detalhes de um curso pelo slug",
  security: [{ cookieAuth: [] }],
  tags: ["Courses"],
  parameters: [
    {
      name: "courseSlug",
      in: "path",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "Lista de cursos",
      content: {
        "application/json": {
          schema: findCourseSchema,
        },
      },
    },
    ...unauthorizedResponse,
    ...notFoundResponse,
  },
});
