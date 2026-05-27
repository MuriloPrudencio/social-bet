import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {subtitle ? <p className="text-xs text-zinc-500">{subtitle}</p> : null}
      </div>
      {action ? <div className="text-xs font-semibold text-primary">{action}</div> : null}
    </div>
  );
}
