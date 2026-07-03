export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-dashed border-brand-border text-center text-xs text-brand-muted ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer" />
      <span className="relative">{label}</span>
    </div>
  );
}
