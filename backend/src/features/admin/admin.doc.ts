import { badRequestResponse, forbiddenResponse, unauthorizedResponse } from "../../doc/errors/errors";
import { registry } from "../../doc/openapi.registry";
import { adminMessageResponse, findManyCoursesReponse } from "./dto/admin.dto";
import { createCourseSchema } from "./dto/create-course.dto";
import { updateCourseSchema } from "./dto/update-course.dto";


registry.registerPath({
    path: "/admin/courses",
    method: "get",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Lista todos os cursos",
    responses: {
        200: {
            description: "Lista de cursos",
            content: {
                "application/json": {
                    schema: findManyCoursesReponse
                }
            }
        },
        ...unauthorizedResponse,
        ...forbiddenResponse
    }
})

registry.registerPath({
    path: "/admin/courses/new",
    method: "post",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Cria um novo curso",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createCourseSchema,
                    example: {
                        slug: "curso-de-typescript",
                        title: "Curso de TypeScript",
                        description: "Curso de TypeScript"
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: "Curso criado com sucesso",
            content: {
                "application/json": {
                    schema: adminMessageResponse
                }
            }
        },
        ...badRequestResponse,
        ...unauthorizedResponse,
        ...forbiddenResponse
    }
})

registry.registerPath({
    path: "/admin/courses/{courseSlug}/update",
    method: "put",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Atualiza um curso",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: updateCourseSchema,
                    example: {
                        title: "Curso de TS",
                        description: "Curso de TS avançado"
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Curso atualizado com sucesso",
            content: {
                "application/json": {
                    schema: adminMessageResponse
                }
            }
        },
        ...badRequestResponse,
        ...unauthorizedResponse,
        ...forbiddenResponse
    }
})

registry.registerPath({
    path: "/admin/courses/{courseSlug}/delete",
    method: "delete",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Deleta um curso",
    responses: {
        204: {
            description: "Curso deletado com sucesso"
        },
        ...unauthorizedResponse,
        ...forbiddenResponse
    }
})
