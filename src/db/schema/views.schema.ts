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
 * VIEW: certificates_full
 * Retorna informações completas sobre certificados com dados de usuário e curso
 *
 * Esta view já existe no banco (criada via migration SQL)
 */
export const certificatesFull = sqliteView("certificates_full", {
  id: text("id"),
  userId: text("user_id"),
  name: text("name"),
  courseId: text("course_id"),
  title: text("title"),
  hours: integer("hours"),
  lessons: integer("lessons"),
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
