-- Views SQL para o sistema LMS
-- NOTA: O Drizzle ORM não suporta views de forma declarativa.
-- Estas views devem ser criadas manualmente via migration SQL ou script de inicialização.

-- lessons_completed with all information
CREATE VIEW IF NOT EXISTS "lessons_completed_full" AS
SELECT "u"."id", "u"."email", "c"."title" AS "course", "l"."title" AS "lesson", "lc"."completed"
FROM "lessons_completed" AS "lc"
JOIN "users" AS "u" ON "u"."id" = "lc"."user_id"
JOIN "lessons" AS "l" ON "l"."id" = "lc"."lesson_id"
JOIN "courses" AS "c" ON "c"."id" = "lc"."course_id";

-- certificates with all information
CREATE VIEW IF NOT EXISTS "certificates_full" AS
SELECT "cert"."id", "cert"."user_id", "u"."name",
       "cert"."course_id", "c"."title", "c"."hours",
       "c"."lessons", "cert"."completed"
FROM "certificates" as "cert"
JOIN "users" AS "u" ON "u"."id" = "cert"."user_id"
JOIN "courses" AS "c" on "c"."id" = "cert"."course_id";

-- lessons prev/next
CREATE VIEW IF NOT EXISTS "lesson_nav" AS
SELECT "cl"."slug" AS "current_slug", "l".*
FROM "lessons" AS "cl"
JOIN "lessons" AS "l" ON "l"."course_id" = "cl"."course_id" AND "l"."order"
BETWEEN "cl"."order" - 1 AND "cl"."order" + 1
ORDER BY "l"."order";
