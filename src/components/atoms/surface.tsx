import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,.05)]", className)} {...props} />;
}
