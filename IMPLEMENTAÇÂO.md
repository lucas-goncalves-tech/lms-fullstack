# Plano de Implementação - LMS Backend

**Estratégia**: Documentação OpenAPI (Scalar) primeiro, depois Testes de Integração.

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

## Fase 2: Auth & User - Testes de Integração

### 2.1 Auth Tests

#### `POST /api/auth/register`

- [ ] **TEST**: should create user with valid data
- [ ] **TEST**: should return 400 when email is invalid
- [ ] **TEST**: should return 400 when password is too short
- [ ] **TEST**: should return 400 when name is empty
- [ ] **TEST**: should return 409 when email already exists
- [ ] **TEST**: should hash password before saving

#### `POST /api/auth/login`

- [ ] **TEST**: should authenticate with valid credentials
- [ ] **TEST**: should return 401 when email not found
- [ ] **TEST**: should return 401 when password is incorrect
- [ ] **TEST**: should return 400 when email format is invalid
- [ ] **TEST**: should set session cookie on success

#### `GET /api/auth/me`

- [ ] **TEST**: should return user data when authenticated
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should return 401 when session is expired

#### `DELETE /api/auth/logout`

- [ ] **TEST**: should clear session cookie on logout
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should return 204 on success

---

### 2.2 User Tests

#### `PUT /api/user/password/update`

- [ ] **TEST**: should update password with valid current password
- [ ] **TEST**: should return 400 when current password is incorrect
- [ ] **TEST**: should return 400 when new password is too short
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should hash new password before saving

#### `PUT /api/user/email/update`

- [ ] **TEST**: should update email with valid data
- [ ] **TEST**: should return 400 when email format is invalid
- [ ] **TEST**: should return 409 when email already exists
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should require password confirmation

---

## Fase 3: Course & Lessons - Documentação OpenAPI

### 3.1 Course Endpoints - Documentação

#### `GET /api/courses`

- [ ] **3.1.1** Documentar schema de response (lista de cursos com progresso)
- [ ] **3.1.2** Documentar schema de Course (campos: id, title, slug, description, thumbnail, totalLessons, completedLessons, progress)
- [ ] **3.1.3** Adicionar exemplos de response

#### `GET /api/courses/:courseSlug`

- [ ] **3.1.4** Documentar parâmetro de path (`courseSlug`)
- [ ] **3.1.5** Documentar schema de response (200, 404)
- [ ] **3.1.6** Documentar schema de CourseDetail (com lessons)

---

### 3.2 Lessons Endpoints - Documentação

#### `GET /api/courses/:courseSlug/lessons`

- [ ] **3.2.1** Documentar parâmetro de path (`courseSlug`)
- [ ] **3.2.2** Documentar schema de response (lista de lessons)
- [ ] **3.2.3** Documentar schema de Lesson (id, title, slug, description, duration, isCompleted, order)

#### `GET /api/courses/:courseSlug/lessons/:lessonSlug`

- [ ] **3.2.4** Documentar parâmetros de path (`courseSlug`, `lessonSlug`)
- [ ] **3.2.5** Documentar schema de response (200, 404)
- [ ] **3.2.6** Documentar schema de LessonDetail (com videoUrl, resources)

#### `GET /api/courses/:courseSlug/lessons/:lessonSlug/video`

- [ ] **3.2.7** Documentar parâmetros de path
- [ ] **3.2.8** Documentar header `Range` para streaming
- [ ] **3.2.9** Documentar response 206 (Partial Content) e 200
- [ ] **3.2.10** Documentar content-type `video/mp4`

#### `GET /api/courses/:courseSlug/lessons/:lessonSlug/complete`

- [ ] **3.2.11** Documentar parâmetros de path
- [ ] **3.2.12** Documentar schema de response (200 com progresso atualizado)
- [ ] **3.2.13** Documentar geração automática de certificado quando 100%

#### `DELETE /api/courses/:courseSlug/lessons`

- [ ] **3.2.14** Documentar parâmetro de path (`courseSlug`)
- [ ] **3.2.15** Documentar schema de response (204)
- [ ] **3.2.16** Documentar que reseta todo o progresso do curso

---

## Fase 4: Course & Lessons - Testes de Integração

### 4.1 Course Tests

#### `GET /api/courses`

- [ ] **TEST**: should return list of courses with progress
- [ ] **TEST**: should return empty array when no courses
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should calculate progress correctly (completed/total lessons)
- [ ] **TEST**: should return courses ordered by createdAt

#### `GET /api/courses/:courseSlug`

- [ ] **TEST**: should return course details by slug
- [ ] **TEST**: should return 404 when course not found
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should include lessons array in response

---

### 4.2 Lessons Tests

#### `GET /api/courses/:courseSlug/lessons`

- [ ] **TEST**: should return lessons for course
- [ ] **TEST**: should return 404 when course not found
- [ ] **TEST**: should return lessons ordered by order field
- [ ] **TEST**: should mark completed lessons correctly

#### `GET /api/courses/:courseSlug/lessons/:lessonSlug`

- [ ] **TEST**: should return lesson details
- [ ] **TEST**: should return 404 when lesson not found
- [ ] **TEST**: should return 404 when course not found
- [ ] **TEST**: should include videoUrl in response

#### `GET /api/courses/:courseSlug/lessons/:lessonSlug/video`

- [ ] **TEST**: should stream video file
- [ ] **TEST**: should support range requests (206 Partial Content)
- [ ] **TEST**: should return 404 when video file not found
- [ ] **TEST**: should set correct content-type header

#### `GET /api/courses/:courseSlug/lessons/:lessonSlug/complete`

- [ ] **TEST**: should mark lesson as completed
- [ ] **TEST**: should update course progress
- [ ] **TEST**: should generate certificate when course 100% completed
- [ ] **TEST**: should not duplicate completion record

#### `DELETE /api/courses/:courseSlug/lessons`

- [ ] **TEST**: should reset all lessons progress
- [ ] **TEST**: should delete all completion records
- [ ] **TEST**: should return 204 on success
- [ ] **TEST**: should return 404 when course not found

---

## Fase 5: Certificates - Documentação OpenAPI

### 5.1 Certificates Endpoints - Documentação

#### `GET /api/certificates`

- [ ] **5.1.1** Documentar schema de response (lista de certificados)
- [ ] **5.1.2** Documentar schema de Certificate (id, courseName, issuedAt, pdfUrl)
- [ ] **5.1.3** Adicionar exemplos de response

#### `GET /api/certificates/:certificateId`

- [ ] **5.1.4** Documentar parâmetro de path (`certificateId`)
- [ ] **5.1.5** Documentar schema de response (200, 404)
- [ ] **5.1.6** Documentar que retorna PDF do certificado
- [ ] **5.1.7** Documentar content-type `application/pdf`

---

## Fase 6: Certificates - Testes de Integração

### 6.1 Certificates Tests

#### `GET /api/certificates`

- [ ] **TEST**: should return list of user certificates
- [ ] **TEST**: should return empty array when no certificates
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should return certificates ordered by issuedAt desc

#### `GET /api/certificates/:certificateId`

- [ ] **TEST**: should return certificate PDF
- [ ] **TEST**: should return 404 when certificate not found
- [ ] **TEST**: should return 401 when not authenticated
- [ ] **TEST**: should return 403 when accessing other user's certificate
- [ ] **TEST**: should set content-type to application/pdf

---

## Fase 7: Admin - Documentação OpenAPI

### 7.1 Admin Courses - Documentação

#### `GET /api/admin/courses`

- [ ] **7.1.1** Documentar schema de response (lista completa de cursos)
- [ ] **7.1.2** Documentar schema AdminCourse (com stats: totalStudents, completionRate)

#### `POST /api/admin/courses/new`

- [ ] **7.1.3** Documentar schema de request (`createCourseSchema`)
- [ ] **7.1.4** Documentar schema de response (201, 409, 400)
- [ ] **7.1.5** Documentar requisito de role ADMIN

#### `PUT /api/admin/courses/:courseSlug/update`

- [ ] **7.1.6** Documentar schema de request (`updateCourseSchema`)
- [ ] **7.1.7** Documentar schema de response (200, 404)

#### `DELETE /api/admin/courses/:courseSlug/delete`

- [ ] **7.1.8** Documentar schema de response (204, 404)
- [ ] **7.1.9** Documentar que deleta em cascata (lessons, videos, progressos)

---

### 7.2 Admin Lessons - Documentação

#### `GET /api/admin/lessons/:courseSlug`

- [ ] **7.2.1** Documentar parâmetro de path (`courseSlug`)
- [ ] **7.2.2** Documentar schema de response (lista de lessons)

#### `POST /api/admin/lessons/:courseSlug/new`

- [ ] **7.2.3** Documentar schema de request (`createLessonSchema`)
- [ ] **7.2.4** Documentar schema de response (201, 404, 409)

#### `POST /api/admin/lessons/upload-video`

- [ ] **7.2.5** Documentar header `x-filename`
- [ ] **7.2.6** Documentar content-type `multipart/form-data` ou stream
- [ ] **7.2.7** Documentar schema de response (200 com path e seconds)
- [ ] **7.2.8** Documentar limite de tamanho (500MB)
- [ ] **7.2.9** Documentar tipos permitidos (video/mp4, video/webm)

#### `PUT /api/admin/lessons/:courseSlug/:lessonSlug/update`

- [ ] **7.2.10** Documentar schema de request (`updateLessonSchema`)
- [ ] **7.2.11** Documentar schema de response (200, 404)

#### `DELETE /api/admin/lessons/:courseSlug/:lessonSlug/delete`

- [ ] **7.2.12** Documentar schema de response (204, 404)
- [ ] **7.2.13** Documentar que deleta arquivo de vídeo também

---

### 7.3 Admin Users - Documentação

#### `GET /api/admin/users`

- [ ] **7.3.1** Documentar query params (search, page, limit)
- [ ] **7.3.2** Documentar schema de response (paginação)
- [ ] **7.3.3** Documentar schema AdminUser (id, name, email, role, isActive, createdAt)

#### `POST /api/admin/users/new`

- [ ] **7.3.4** Documentar schema de request (`adminCreateUserSchema`)
- [ ] **7.3.5** Documentar schema de response (201, 409)
- [ ] **7.3.6** Documentar que cria user com role ADMIN ou USER

#### `PUT /api/admin/users/:userId/update`

- [ ] **7.3.7** Documentar schema de request (`updateUserSchema`)
- [ ] **7.3.8** Documentar schema de response (200, 404)
- [ ] **7.3.9** Documentar que admin não pode mudar próprio role

#### `PATCH /api/admin/users/:userId/toggle-active`

- [ ] **7.3.10** Documentar schema de response (200 com novo status)
- [ ] **7.3.11** Documentar que desativa/ativa usuário
- [ ] **7.3.12** Documentar que admin não pode desativar a si mesmo

#### `DELETE /api/admin/users/:userId/delete`

- [ ] **7.3.13** Documentar schema de response (204, 404)
- [ ] **7.3.14** Documentar que admin não pode deletar a si mesmo

---

## Fase 8: Admin - Testes de Integração

### 8.1 Admin Courses Tests

#### `GET /api/admin/courses`

- [ ] **TEST**: should return all courses for admin
- [ ] **TEST**: should return 403 when user is not admin
- [ ] **TEST**: should include statistics in response

#### `POST /api/admin/courses/new`

- [ ] **TEST**: should create course with valid data
- [ ] **TEST**: should return 409 when course slug already exists
- [ ] **TEST**: should return 403 when user is not admin
- [ ] **TEST**: should return 400 when required fields missing

#### `PUT /api/admin/courses/:courseSlug/update`

- [ ] **TEST**: should update course data
- [ ] **TEST**: should return 404 when course not found
- [ ] **TEST**: should return 403 when user is not admin

#### `DELETE /api/admin/courses/:courseSlug/delete`

- [ ] **TEST**: should delete course and related data
- [ ] **TEST**: should delete video files from disk
- [ ] **TEST**: should return 404 when course not found
- [ ] **TEST**: should return 403 when user is not admin

---

### 8.2 Admin Lessons Tests

#### `GET /api/admin/lessons/:courseSlug`

- [ ] **TEST**: should return lessons for course
- [ ] **TEST**: should return 404 when course not found
- [ ] **TEST**: should return 403 when user is not admin

#### `POST /api/admin/lessons/:courseSlug/new`

- [ ] **TEST**: should create lesson with valid data
- [ ] **TEST**: should return 409 when lesson slug already exists in course
- [ ] **TEST**: should validate video path exists
- [ ] **TEST**: should return 403 when user is not admin

#### `POST /api/admin/lessons/upload-video`

- [ ] **TEST**: should upload video file
- [ ] **TEST**: should return 400 when file exceeds 500MB
- [ ] **TEST**: should return 400 when file type is invalid
- [ ] **TEST**: should calculate video duration
- [ ] **TEST**: should return 403 when user is not admin

#### `PUT /api/admin/lessons/:courseSlug/:lessonSlug/update`

- [ ] **TEST**: should update lesson data
- [ ] **TEST**: should delete old video file when video path changes
- [ ] **TEST**: should return 404 when lesson not found
- [ ] **TEST**: should return 403 when user is not admin

#### `DELETE /api/admin/lessons/:courseSlug/:lessonSlug/delete`

- [ ] **TEST**: should delete lesson and video file
- [ ] **TEST**: should return 404 when lesson not found
- [ ] **TEST**: should return 403 when user is not admin

---

### 8.3 Admin Users Tests

#### `GET /api/admin/users`

- [ ] **TEST**: should return paginated users
- [ ] **TEST**: should filter users by search term
- [ ] **TEST**: should return 403 when user is not admin
- [ ] **TEST**: should paginate correctly with limit and page

#### `POST /api/admin/users/new`

- [ ] **TEST**: should create user with role USER
- [ ] **TEST**: should create user with role ADMIN
- [ ] **TEST**: should return 409 when email already exists
- [ ] **TEST**: should return 403 when user is not admin

#### `PUT /api/admin/users/:userId/update`

- [ ] **TEST**: should update user data
- [ ] **TEST**: should return 403 when admin tries to change own role
- [ ] **TEST**: should return 404 when user not found
- [ ] **TEST**: should return 403 when user is not admin

#### `PATCH /api/admin/users/:userId/toggle-active`

- [ ] **TEST**: should toggle user status
- [ ] **TEST**: should return 403 when admin tries to toggle own status
- [ ] **TEST**: should return 404 when user not found
- [ ] **TEST**: should return 403 when user is not admin

#### `DELETE /api/admin/users/:userId/delete`

- [ ] **TEST**: should delete user
- [ ] **TEST**: should return 403 when admin tries to delete self
- [ ] **TEST**: should return 404 when user not found
- [ ] **TEST**: should return 403 when user is not admin

---

## Checklist Geral

### Setup de Testes

- [ ] Configurar Vitest
- [ ] Configurar banco de dados de teste (SQLite in-memory)
- [ ] Criar helpers para setup/teardown de testes
- [ ] Criar factory para gerar dados de teste (users, courses, lessons)
- [ ] Configurar autenticação em testes (session/cookie mock)

### Documentação

- [ ] Gerar `openapi.json` completo
- [ ] Validar spec no Swagger Editor
- [ ] Revisar exemplos de request/response
- [ ] Documentar códigos de erro globais (500, 429 rate limit)

### Qualidade

- [ ] Rodar lint em todos os arquivos
- [ ] Verificar cobertura de testes > 80%
- [ ] Testar manualmente endpoints críticos no Scalar
- [ ] Revisar tratamento de erros em todos os endpoints

---

## GitHub Actions Workflow (CI/CD)

### Arquivo: `.github/workflows/ci.yml`

**Triggers:**

- [ ] `name: CI/CD Pipeline`
- [ ] `on: push` (branches: main, develop)
- [ ] `on: pull_request` (branches: main)

**Jobs:**

#### Job: `backend-lint-and-test`

- [ ] `name: Checkout repository`
- [ ] `name: Setup Node.js`
- [ ] `name: Install backend dependencies`
- [ ] `name: Run ESLint`
- [ ] `name: Run backend tests`
- [ ] `name: Upload test coverage`

#### Job: `frontend-lint-and-build`

- [ ] `name: Checkout repository`
- [ ] `name: Setup Node.js`
- [ ] `name: Install frontend dependencies`
- [ ] `name: Run ESLint`
- [ ] `name: Run TypeScript check`
- [ ] `name: Build frontend`

#### Job: `integration-tests` (opcional)

- [ ] `name: Checkout repository`
- [ ] `name: Setup Node.js`
- [ ] `name: Install dependencies`
- [ ] `name: Setup test database`
- [ ] `name: Run integration tests`

---

### Arquivo: `.github/workflows/deploy.yml` (Production)

**Triggers:**

- [ ] `name: Deploy to Production`
- [ ] `on: workflow_dispatch` (manual)
- [ ] `on: push` (tags: 'v\*')

**Jobs:**

#### Job: `deploy-backend`

- [ ] `name: Checkout repository`
- [ ] `name: Setup Node.js`
- [ ] `name: Install dependencies`
- [ ] `name: Run tests`
- [ ] `name: Build application`
- [ ] `name: Deploy to Railway/Render`
- [ ] `name: Verify deployment health`

#### Job: `deploy-frontend`

- [ ] `name: Checkout repository`
- [ ] `name: Setup Node.js`
- [ ] `name: Install dependencies`
- [ ] `name: Build for production`
- [ ] `name: Deploy to Vercel`
- [ ] `name: Purge CDN cache`

### Refactor:

- [ ] mudar de schema para dto em todos as pastas dtos
- [ ] colocar cada dto separado em um unico arquivo.
