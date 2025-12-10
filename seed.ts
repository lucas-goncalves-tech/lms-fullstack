import { drizzle } from "drizzle-orm/better-sqlite3";
import DatabaseDriver from "better-sqlite3";
import * as schema from "./src/db/schema";
import { envCheck } from "./src/shared/helper/env-check.helper";

const sqlite = new DatabaseDriver(envCheck().DB_FILE_NAME);
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

const coursesData = [
  {
    slug: "html-e-css",
    title: "HTML e CSS",
    description: "Curso de HTML e CSS para Iniciantes",
  },
  {
    slug: "javascript-completo",
    title: "JavaScript Completo",
    description: "Curso completo de JavaScript",
  },
];

const lessonsData = [
  // HTML e CSS
  {
    courseSlug: "html-e-css",
    slug: "tags-basicas",
    title: "Tags Básicas",
    seconds: 200,
    video: "/html/tags-basicas.mp4",
    description: "Aula sobre as Tags Básicas",
    order: 1,
    free: 1,
  },
  {
    courseSlug: "html-e-css",
    slug: "estrutura-do-documento",
    title: "Estrutura do Documento",
    seconds: 420,
    video: "/html/estrutura-do-documento.mp4",
    description: "Estrutura básica: <!DOCTYPE>, <html>, <head> e <body>.",
    order: 2,
    free: 1,
  },
  {
    courseSlug: "html-e-css",
    slug: "links-e-imagens",
    title: "Links e Imagens",
    seconds: 540,
    video: "/html/links-e-imagens.mp4",
    description: "Como usar <a> e <img>, caminhos relativos e absolutos.",
    order: 3,
    free: 0,
  },
  {
    courseSlug: "html-e-css",
    slug: "listas-e-tabelas",
    title: "Listas e Tabelas",
    seconds: 600,
    video: "/html/listas-e-tabelas.mp4",
    description: "Listas ordenadas/não ordenadas e estrutura básica de tabelas.",
    order: 4,
    free: 0,
  },
  {
    courseSlug: "html-e-css",
    slug: "formularios-basicos",
    title: "Formulários Básicos",
    seconds: 780,
    video: "/html/formularios-basicos.mp4",
    description: "Inputs, labels, selects e boas práticas de acessibilidade.",
    order: 5,
    free: 0,
  },
  {
    courseSlug: "html-e-css",
    slug: "semantica-e-acessibilidade",
    title: "Semântica e Acessibilidade",
    seconds: 660,
    video: "/html/semantica-e-acessibilidade.mp4",
    description: "Tags semânticas e acessibilidade para iniciantes.",
    order: 6,
    free: 0,
  },
  // JavaScript
  {
    courseSlug: "javascript-completo",
    slug: "introducao-e-variaveis",
    title: "Introdução e Variáveis",
    seconds: 480,
    video: "/javascript/introducao-e-variaveis.mp4",
    description: "Como o JS funciona, let/const e escopo.",
    order: 1,
    free: 1,
  },
  {
    courseSlug: "javascript-completo",
    slug: "tipos-e-operadores",
    title: "Tipos e Operadores",
    seconds: 540,
    video: "/javascript/tipos-e-operadores.mp4",
    description: "Tipos primitivos, objetos e operadores comuns.",
    order: 2,
    free: 1,
  },
  {
    courseSlug: "javascript-completo",
    slug: "funcoes-basico",
    title: "Funções (Básico)",
    seconds: 600,
    video: "/javascript/funcoes-basico.mp4",
    description: "Declaração, expressão, parâmetros e retorno.",
    order: 3,
    free: 0,
  },
  {
    courseSlug: "javascript-completo",
    slug: "manipulando-o-dom",
    title: "Manipulando o DOM",
    seconds: 660,
    video: "/javascript/manipulando-o-dom.mp4",
    description: "Selecionar, criar e alterar elementos com JS.",
    order: 4,
    free: 0,
  },
  {
    courseSlug: "javascript-completo",
    slug: "eventos-no-navegador",
    title: "Eventos no Navegador",
    seconds: 600,
    video: "/javascript/eventos-no-navegador.mp4",
    description: "addEventListener, propagação e preventDefault.",
    order: 5,
    free: 0,
  },
  {
    courseSlug: "javascript-completo",
    slug: "fetch-e-async-await",
    title: "Fetch e Async/Await",
    seconds: 720,
    video: "/javascript/fetch-e-async-await.mp4",
    description: "Requisições HTTP, Promises e fluxo assíncrono.",
    order: 6,
    free: 0,
  },
];

async function seed() {
  console.log("🌱 Iniciando seed do banco de dados...\n");

  // Insert courses
  console.log("📚 Inserindo cursos...");
  const insertedCourses: Record<string, string> = {};

  for (const course of coursesData) {
    const [inserted] = await db
      .insert(schema.courses)
      .values(course)
      .returning({ id: schema.courses.id, slug: schema.courses.slug });

    insertedCourses[inserted.slug] = inserted.id;
    console.log(`  ✅ ${course.title} (${inserted.id})`);
  }

  // Insert lessons
  console.log("\n📖 Inserindo lições...");
  for (const lesson of lessonsData) {
    const courseId = insertedCourses[lesson.courseSlug];

    if (!courseId) {
      console.log(`  ❌ Curso não encontrado: ${lesson.courseSlug}`);
      continue;
    }
    //eslint-disable-next-line
    const { courseSlug, ...lessonData } = lesson;
    await db.insert(schema.lessons).values({
      ...lessonData,
      courseId,
    });

    console.log(`  ✅ ${lesson.title} (${lesson.courseSlug})`);
  }

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log(`   - ${coursesData.length} cursos inseridos`);
  console.log(`   - ${lessonsData.length} lições inseridas`);

  sqlite.close();
}

seed().catch((error) => {
  console.error("❌ Erro no seed:", error);
  process.exit(1);
});
