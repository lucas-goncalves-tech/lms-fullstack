export function MinimalistProgress({ progress }: { progress: number }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/50 text-xs text-muted-foreground">
      <div className="w-8 h-1 rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${
            progress === 100 ? "bg-emerald-500" : "bg-primary"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {progress}%
    </div>
  );
}
