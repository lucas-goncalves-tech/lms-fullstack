import { sqliteView, text, integer } from "drizzle-orm/sqlite-core";

/**
 * VIEW: lessons_completed_full
 * Retorna informações completas sobre aulas completadas com dados de usuário, curso e aula
 *
 * Esta view já existe no banco (criada via migration SQL)
 */
export const lessonsCompletedFull = sqliteView("lessons_completed_full", {
  id: text("id"),
  email: text("email"),
  course: text("course"),
  lesson: text("lesson"),
  completed: text("completed"),
}).existing();

/**
 * VIEW: courses_stats
 * Retorna cursos com total_seconds e total_lessons calculados a partir da tabela lessons
 *
 * Esta view já existe no banco (criada via migration SQL)
 */
export const coursesStats = sqliteView("courses_stats", {
  id: text("id"),
  slug: text("slug"),
  title: text("title"),
  description: text("description"),
  created: text("created"),
  totalSeconds: integer("total_seconds"),
  totalLessons: integer("total_lessons"),
}).existing();

/**
 * VIEW: courses_user_progress
 * Retorna cursos com progresso por usuário (completedLessons)
 * Permite queries simples como: SELECT * FROM courses_user_progress WHERE user_id = ?
 *
 * Esta view já existe no banco (criada via migration SQL)
 */
export const coursesUserProgress = sqliteView("courses_user_progress", {
  id: text("id"),
  slug: text("slug"),
  title: text("title"),
  description: text("description"),
  created: text("created"),
  totalSeconds: integer("total_seconds"),
  totalLessons: integer("total_lessons"),
  userId: text("user_id"),
  completedLessons: integer("completed_lessons"),
}).existing();

/**
 * VIEW: certificates_full
 * Retorna informações completas sobre certificados com dados de usuário e curso
 * Usa courses_stats para obter total_seconds e total_lessons calculados
 *
 * Esta view já existe no banco (criada via migration SQL)
 */
export const certificatesFull = sqliteView("certificates_full", {
  id: text("id"),
  userId: text("user_id"),
  name: text("name"),
  courseId: text("course_id"),
  title: text("title"),
  totalSeconds: integer("total_seconds"),
  totalLessons: integer("total_lessons"),
  completed: text("completed"),
}).existing();

/**
 * VIEW: lesson_nav
 * Retorna aulas anterior e próxima para navegação (prev/next)
 *
 * Esta view já existe no banco (criada via migration SQL)
 */
export const lessonNav = sqliteView("lesson_nav", {
  currentSlug: text("current_slug"),
  id: text("id"),
  courseId: text("course_id"),
  slug: text("slug"),
  title: text("title"),
  seconds: integer("seconds"),
  video: text("video"),
  description: text("description"),
  order: integer("order"),
  free: integer("free"),
  created: text("created"),
}).existing();
