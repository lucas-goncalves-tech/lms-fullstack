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

-- courses with calculated stats (total_seconds and total_lessons)
CREATE VIEW IF NOT EXISTS "courses_stats" AS
SELECT 
    c.id,
    c.slug,
    c.title,
    c.description,
    c.created,
    COALESCE(SUM(l.seconds), 0) as total_seconds,
    COUNT(l.id) as total_lessons
FROM courses c
LEFT JOIN lessons l ON l.course_id = c.id
GROUP BY c.id;

-- courses with user progress (combines courses_stats with user's completed lessons)
CREATE VIEW IF NOT EXISTS "courses_user_progress" AS
SELECT 
    cs.id,
    cs.slug,
    cs.title,
    cs.description,
    cs.created,
    cs.total_seconds,
    cs.total_lessons,
    u.id as user_id,
    COALESCE(lc.completed_count, 0) as completed_lessons
FROM courses_stats cs
CROSS JOIN users u
LEFT JOIN (
    SELECT course_id, user_id, COUNT(*) as completed_count
    FROM lessons_completed
    GROUP BY course_id, user_id
) lc ON lc.course_id = cs.id AND lc.user_id = u.id;

-- certificates with all information (uses courses_stats for calculated values)
CREATE VIEW IF NOT EXISTS "certificates_full" AS
SELECT 
    cert.id, 
    cert.user_id, 
    u.name,
    cert.course_id, 
    cs.title, 
    cs.total_seconds,
    cs.total_lessons,
    cert.completed
FROM certificates cert
JOIN users u ON u.id = cert.user_id
JOIN courses_stats cs ON cs.id = cert.course_id;

-- lessons prev/next
CREATE VIEW IF NOT EXISTS "lesson_nav" AS
SELECT "cl"."slug" AS "current_slug", "l".*
FROM "lessons" AS "cl"
JOIN "lessons" AS "l" ON "l"."course_id" = "cl"."course_id" AND "l"."order"
BETWEEN "cl"."order" - 1 AND "cl"."order" + 1
ORDER BY "l"."order";
