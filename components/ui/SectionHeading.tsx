import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  icon: Icon,
  index,
  title,
}: {
  icon: LucideIcon;
  index: string;
  title: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-sm text-brand-gold">
        <Icon size={16} />
        <span>{index}</span>
      </div>
      <h2 className="mt-2 text-3xl font-bold text-brand-text">{title}</h2>
    </div>
  );
}
