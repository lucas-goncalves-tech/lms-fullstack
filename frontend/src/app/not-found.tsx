import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-background text-foreground">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-xl font-semibold">Página não encontrada</h2>
      <p className="text-muted-foreground">
        Não foi possível encontrar o recurso solicitado
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
