import { Skeleton } from "./skeleton";

type Props = {
  title?: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center flex flex-col items-center mb-6">
      <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
        {title ? title : <Skeleton className="w-46 h-6" />}
      </h1>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
