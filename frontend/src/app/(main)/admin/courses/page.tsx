import { CourseTable } from "@/modules/admin/courses/components/course-table";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminCoursesPage() {
  return (
    <div className="w-full max-w-7xl">
      <PageHeader title="Cursos" subtitle="Administração de cursos" />
      <CourseTable />
    </div>
  );
}
