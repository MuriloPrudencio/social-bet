import { Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  label: string;
  verified?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-8 text-xs",
  md: "size-12 text-sm",
  lg: "size-16 text-lg"
};

export function Avatar({ label, verified, size = "md", className }: AvatarProps) {
  const isImage = label.startsWith("/");

  return (
    <div className={cn("relative shrink-0", className)}>
      <div className={cn("grid rounded-full border border-primary/40 bg-gradient-to-br from-zinc-700 via-zinc-900 to-primary/30 place-items-center font-black shadow-neon", sizes[size])}>
        {isImage ? <Image src={label} alt="" width={96} height={96} className="size-full rounded-full object-cover" /> : label}
      </div>
      {verified ? (
        <span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-primary text-black">
          <Check className="size-3" />
        </span>
      ) : null}
    </div>
  );
}
