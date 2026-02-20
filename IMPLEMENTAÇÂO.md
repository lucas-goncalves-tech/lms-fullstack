# Plano de Implementação - LMS Backend

**Estratégia**: Documentação OpenAPI (Scalar) primeiro, depois deploy.

---

## Fase 1: Auth & User - Documentação OpenAPI

### 1.1 Configuração Base do Scalar

- [x] **1.1.1** Criar arquivo `openapi.json` ou gerar via `@asteasolutions/zod-to-openapi`
- [x] **1.1.2** Configurar Scalar UI em rota `/docs`
- [x] **1.1.3** Ajustar CSP do Helmet para permitir Scalar

---

### 1.2 Auth Endpoints - Documentação

#### `POST /api/auth/register`

- [x] **1.2.1** Documentar schema de request (`createUserSchema`)
- [x] **1.2.2** Documentar schema de response (201, 409, 400)
- [x] **1.2.3** Adicionar exemplos de request/response

#### `POST /api/auth/login`

- [x] **1.2.4** Documentar schema de request (`loginUserSchema`)
- [x] **1.2.5** Documentar schema de response (200 com session, 401, 400)
- [x] **1.2.6** Adicionar exemplos de request/response

#### `GET /api/auth/me`

- [x] **1.2.7** Documentar header de autenticação (cookie/session)
- [x] **1.2.8** Documentar schema de response (200 com user, 401)

#### `DELETE /api/auth/logout`

- [x] **1.2.9** Documentar header de autenticação
- [x] **1.2.10** Documentar schema de response (204, 401)

---

### 1.3 User Endpoints - Documentação

#### `PUT /api/user/password/update`

- [x] **1.3.1** Documentar schema de request (`updatePasswordSchema`)
- [x] **1.3.2** Documentar schema de response (200, 400, 401)
- [x] **1.3.3** Adicionar exemplos de request/response

#### `PUT /api/user/email/update`

- [x] **1.3.4** Documentar schema de request (`updateEmailSchema`)
- [x] **1.3.5** Documentar schema de response (200, 400, 401, 409)
- [x] **1.3.6** Adicionar exemplos de request/response

---

## Fase 2: Course & Lessons - Documentação OpenAPI

### 2.1 Course Endpoints - Documentação

#### `GET /api/courses`

- [x] **2.1.1** Documentar schema de response (lista de cursos com progresso)
- [x] **2.1.2** Documentar schema de Course (campos: id, title, slug, description, thumbnail, totalLessons, completedLessons, progress)
- [x] **2.1.3** Adicionar exemplos de response

#### `GET /api/courses/:courseSlug`

- [x] **2.1.4** Documentar parâmetro de path (`courseSlug`)
- [x] **2.1.5** Documentar schema de response (200, 404)
- [x] **2.1.6** Documentar schema de CourseDetail (com lessons)

---

### 2.2 Lessons Endpoints - Documentação

#### `GET /api/lessons/:courseSlug`

- [x] **2.2.1** Documentar parâmetro de path (`courseSlug`)
- [x] **2.2.2** Documentar schema de response (lista de lessons)
- [x] **2.2.3** Documentar schema de Lesson (id, title, slug, description, duration, isCompleted, order)

#### `GET /api/lessons/:courseSlug/:lessonSlug`

- [x] **2.2.4** Documentar parâmetros de path (`courseSlug`, `lessonSlug`)
- [x] **2.2.5** Documentar schema de response (200, 404)
- [x] **2.2.6** Documentar schema de LessonDetail (com videoUrl, resources)

#### `GET /api/lessons/:courseSlug/:lessonSlug/video`

- [x] **2.2.7** Documentar parâmetros de path
- [x] **2.2.8** Documentar header `Range` para streaming
- [x] **2.2.9** Documentar response 206 (Partial Content) e 200
- [x] **2.2.10** Documentar content-type `video/mp4`

#### `GET /api/lessons/:courseSlug/:lessonSlug/complete`

- [x] **2.2.11** Documentar parâmetros de path
- [x] **2.2.12** Documentar schema de response (200 com progresso atualizado)
- [x] **2.2.13** Documentar geração automática de certificado quando 100%

#### `DELETE /api/lessons/:courseSlug`

- [x] **2.2.14** Documentar parâmetro de path (`courseSlug`)
- [x] **2.2.15** Documentar schema de response (204)
- [x] **2.2.16** Documentar que reseta todo o progresso do curso

---

## Fase 3: Certificates - Documentação OpenAPI

### 3.1 Certificates Endpoints - Documentação

#### `GET /api/certificates`

- [x] **3.1.1** Documentar schema de response (lista de certificados)
- [x] **3.1.2** Documentar schema de Certificate (id, courseName, issuedAt, pdfUrl)
- [x] **3.1.3** Adicionar exemplos de response

#### `GET /api/certificates/:certificateId`

- [x] **3.1.4** Documentar parâmetro de path (`certificateId`)
- [x] **3.1.5** Documentar schema de response (200, 404)
- [x] **3.1.6** Documentar que retorna PDF do certificado
- [x] **3.1.7** Documentar content-type `application/pdf`

---

## Fase 4: Admin - Documentação OpenAPI

### 4.1 Admin Courses - Documentação

[x] `GET /api/admin/courses`

[x] `POST /api/admin/courses/new`

[x] `PUT /api/admin/courses/:courseSlug/update`

[x] `DELETE /api/admin/courses/:courseSlug/delete`

---

### 4.2 Admin Lessons - Documentação

[x] `GET /api/admin/lessons/:courseSlug`

[x] `POST /api/admin/lessons/:courseSlug/new`

[x] `POST /api/admin/lessons/upload-video`

[x] `PUT /api/admin/lessons/:courseSlug/:lessonSlug/update`

[x] `DELETE /api/admin/lessons/:courseSlug/:lessonSlug/delete`

---

### 4.3 Admin Users - Documentação

[x] `GET /api/admin/users`

[x] `POST /api/admin/users/new`

[x] `PUT /api/admin/users/:userId/update`

[x] `DELETE /api/admin/users/:userId/delete`

[x] `PATCH /api/admin/users/:userId/toggle-active`

---

## Checklist Geral

### Qualidade

- [x] Rodar lint em todos os arquivos
- [x] Testar manualmente endpoints críticos no Scalar
- [x] Revisar tratamento de erros em todos os endpoints

---

## GitHub Actions Workflow (CI/CD)

### Arquivo: `.github/workflows/ci.yml`

**Triggers:**

- [x] `name: CI/CD Pipeline`
- [x] `on: push` (branches: main, develop)
- [x] `on: pull_request` (branches: main)

**Jobs:**

#### Job: `backend-lint`

- [x] `name: Checkout repository`
- [x] `name: Setup Node.js`
- [x] `name: Install backend dependencies`
- [x] `name: Run ESLint`

---

### Refactor:

- [ ] Mudar de schema para dto em todas as pastas dtos
- [ ] Colocar cada dto separado em um único arquivo
