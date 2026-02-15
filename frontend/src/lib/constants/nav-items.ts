import { Award, BookOpen, BookA, Users, User } from "lucide-react";

export const navItems = [
  {
    title: "Meus cursos",
    href: "/",
    icon: BookOpen,
  },
  {
    title: "Meus Certificados",
    href: "/certificates",
    icon: Award,
  },
  {
    title: "Perfil",
    href: "/profile",
    icon: User,
  },
];

export const adminNavItems = [
  {
    title: "Cursos",
    href: "/admin/courses",
    icon: BookA,
  },
  {
    title: "Usuários",
    href: "/admin/users",
    icon: Users,
  },
];
