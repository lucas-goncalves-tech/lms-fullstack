import { badRequestResponse, forbiddenResponse, unauthorizedResponse } from "../../doc/errors/errors";
import { registry } from "../../doc/openapi.registry";
import { adminMessageResponse, findManyCoursesReponse, findManylessonsResponse, uploadVideoHeaders, uploadVideoResponse } from "./dto/admin.dto";
import { createCourseSchema } from "./dto/create-course.dto";
import { createLessonSchema } from "./dto/create-lesson.dto";
import { updateCourseSchema } from "./dto/update-course.dto";
import { updateLessonSchema } from "./dto/update-lesson.dto";



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

registry.registerPath({
    path: "/admin/lessons/{courseSlug}",
    method: "get",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Lista todas as aulas de um curso",
    responses: {
        200: {
            description: "Lista de aulas",
            content: {
                "application/json": {
                    schema: findManylessonsResponse
                }
            }
        },
        ...unauthorizedResponse,
        ...forbiddenResponse
    }
})

registry.registerPath({
    path: "/admin/lessons/upload-video",
    method: "post",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Faz upload de um vídeo",
    description: "Devido a limitações de binary file no scalar, não é possivel fazer upload",
    request: {
        headers: uploadVideoHeaders,
        body: {
            content: {
                "application/octet-stream": {
                    schema: {
                        type: "string",
                        format: "binary"
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: "Vídeo enviado com sucesso",
            content: {
                "application/json": {
                    schema: uploadVideoResponse
                }
            }
        },
        ...badRequestResponse,
        ...unauthorizedResponse,
        ...forbiddenResponse
    }
})

registry.registerPath({
    path: "/admin/lessons/{courseSlug}/new",
    method: "post",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Cria uma nova aula",
    description: "Devido a limitações de binary file no scalar, não é possivel criar a aula com path falso",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createLessonSchema,
                    example: {
                        title: "Aula 1",
                        slug: "aula-1",
                        description: "Descrição da aula 1",
                        video: "video.mp4",
                        seconds: 100,
                        order: 1,
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: "Aula criada com sucesso",
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
    path: "/admin/lessons/{courseSlug}/{lessonSlug}/update",
    method: "put",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Atualiza uma aula",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: updateLessonSchema,
                    example: {
                        title: "Aula 1",
                        slug: "aula-1",
                        description: "Descrição da aula 1",
                        video: "video.mp4",
                        seconds: 100,
                        order: 1,
                    }
                }
            }
        },
    },
    responses: {
        200: {
            description: "Aula atualizada com sucesso",
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
    path: "/admin/lessons/{courseSlug}/{lessonSlug}/delete",
    method: "delete",
    security: [{ cookieAuth: [] }],
    tags: ["Admin"],
    summary: "Deleta uma aula",
    responses: {
        200: {
            description: "Aula deletada com sucesso",
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

