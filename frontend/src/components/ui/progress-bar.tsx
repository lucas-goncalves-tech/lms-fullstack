type Props = {
  progress: number;
  showNotStarted?: boolean;
  showCompleted?: boolean;
};

export function ProgressBar({
  progress,
  showNotStarted = false,
  showCompleted = false,
}: Props) {
  const isCompleted = progress === 100;
  const isNotStarted = progress === 0;

  const getText = () => {
    if (showNotStarted && isNotStarted) return "Não iniciado";
    if (showCompleted && isCompleted) return "Concluído";
    return `${progress}% concluído`;
  };

  return (
    <div className="space-y-1.5">
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div
          className={`h-1.5 rounded-full transition-all ${
            showCompleted && isCompleted ? "bg-green-500" : "bg-primary"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{getText()}</p>
    </div>
  );
}
