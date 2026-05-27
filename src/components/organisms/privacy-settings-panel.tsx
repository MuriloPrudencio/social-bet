"use client";

import { Surface } from "@/components/atoms/surface";
import { SectionHeading } from "@/components/molecules/section-heading";
import { usePrivacy, usePrivacyMutation } from "@/hooks/use-privacy";
import { cn } from "@/lib/utils";
import type { PrivacyLevel, PrivacySettings } from "@/types/betsocial";

const visibilityOptions: { id: PrivacyLevel; label: string; desc: string }[] = [
  { id: "public", label: "Público", desc: "Conquistas visíveis na comunidade" },
  { id: "followers", label: "Apenas seguidores", desc: "Somente quem te segue" },
  { id: "private", label: "Privado", desc: "Oculto do feed social" }
];

export function PrivacySettingsPanel() {
  const { data: privacy } = usePrivacy();
  const mutation = usePrivacyMutation();

  if (!privacy) return null;

  function patch(partial: Partial<PrivacySettings>) {
    mutation.mutate(partial);
  }

  return (
    <Surface className="premium-card p-5">
      <SectionHeading title="Privacidade" subtitle="Compliance · segurança" />
      <div className="mt-4 space-y-4">
        <div>
          <p className="mb-2 text-sm font-bold text-zinc-300">Visibilidade do perfil</p>
          <div className="grid gap-2">
            {visibilityOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => patch({ profileVisibility: opt.id })}
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  privacy.profileVisibility === opt.id ? "border-primary/40 bg-primary/10" : "border-white/10 bg-white/[0.03]"
                )}
              >
                <p className="font-bold">{opt.label}</p>
                <p className="text-xs text-zinc-500">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
        <Toggle label="Ocultar valores ganhos" checked={privacy.hideAmounts} onChange={(v) => patch({ hideAmounts: v })} />
        <Toggle label="Ocultar estatísticas" checked={privacy.hideStats} onChange={(v) => patch({ hideStats: v })} />
        <Toggle label="Ocultar multiplicadores" checked={privacy.hideMultipliers} onChange={(v) => patch({ hideMultipliers: v })} />
      </div>
    </Surface>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="text-sm font-semibold text-zinc-300">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 accent-primary" />
    </label>
  );
}
