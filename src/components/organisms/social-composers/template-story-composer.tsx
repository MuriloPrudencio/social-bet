"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import {
  ACCENT_COLORS,
  CAPTION_MAX_STORY,
  STORY_STICKERS,
  STORY_TEMPLATES,
  clampCaption
} from "@/lib/templates";
import { cn, money } from "@/lib/utils";
import type { CreateStoryPayload, StoryTemplateType } from "@/types/betsocial";

type TemplateStoryComposerProps = {
  open: boolean;
  pending?: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateStoryPayload) => void;
};

export function TemplateStoryComposer({ open, pending, onClose, onSubmit }: TemplateStoryComposerProps) {
  const [templateType, setTemplateType] = useState<StoryTemplateType>("big_win");
  const [caption, setCaption] = useState("");
  const [sticker, setSticker] = useState("🚀");
  const [accentColor, setAccentColor] = useState("#32f253");
  const template = STORY_TEMPLATES[templateType];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSubmit({
      templateType,
      game: String(form.get("game") || "Fortune Tiger"),
      amount: Number(form.get("amount") || 4200),
      multiplier: Number(form.get("multiplier") || 230),
      caption: clampCaption(caption, CAPTION_MAX_STORY),
      sticker,
      accentColor
    });
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-md sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#071018] p-5 shadow-violet"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black">Highlight controlado</h3>
                <p className="text-sm text-zinc-400">Template automático · sem upload livre</p>
              </div>
              <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full bg-white/5">
                <X className="size-5" />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(STORY_TEMPLATES) as StoryTemplateType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTemplateType(key)}
                  className={cn(
                    "rounded-xl border px-2 py-2 text-left text-xs font-bold transition",
                    templateType === key ? "border-primary/50 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.03] text-zinc-400"
                  )}
                >
                  {STORY_TEMPLATES[key].emoji} {STORY_TEMPLATES[key].label}
                </button>
              ))}
            </div>

            <div
              className="mb-4 rounded-2xl border p-4 text-center shadow-neon"
              style={{ borderColor: `${accentColor}55`, background: `linear-gradient(160deg, ${accentColor}22, transparent 55%)` }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Preview</p>
              <p className="mt-2 text-2xl font-black">{template.emoji} {template.label}</p>
              <p className="text-sm text-zinc-300">Fortune Tiger</p>
              <p className="mt-2 text-4xl font-black" style={{ color: accentColor }}>
                230x
              </p>
              <p className="font-bold text-primary">{money(4200)}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold text-zinc-300">
                Jogo
                <input name="game" defaultValue="Fortune Tiger" className="field-input" />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-zinc-300">
                Valor
                <input name="amount" type="number" defaultValue={4200} className="field-input" />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-zinc-300 sm:col-span-2">
                Multiplicador
                <input name="multiplier" type="number" defaultValue={230} className="field-input" />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-zinc-300 sm:col-span-2">
                Frase curta ({caption.length}/{CAPTION_MAX_STORY})
                <input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value.slice(0, CAPTION_MAX_STORY))}
                  placeholder="Hoje foi absurdo"
                  className="field-input"
                />
              </label>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {STORY_STICKERS.map((s) => (
                <button key={s} type="button" onClick={() => setSticker(s)} className={cn("rounded-full border px-3 py-1", sticker === s && "border-primary bg-primary/10")}>
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              {ACCENT_COLORS.map((c) => (
                <button key={c} type="button" onClick={() => setAccentColor(c)} className="size-8 rounded-full border-2 border-white/20" style={{ background: c }} />
              ))}
            </div>

            <Button className="mt-5 w-full" type="submit" disabled={pending}>
              <Send className="size-4" />
              {pending ? "Gerando..." : "Publicar highlight"}
            </Button>
          </motion.form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
