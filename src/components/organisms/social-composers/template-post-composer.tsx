"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { buildPostContent, CAPTION_MAX_POST, POST_STICKERS, POST_TEMPLATES, clampCaption } from "@/lib/templates";
import { cn, money } from "@/lib/utils";
import type { CreatePostPayload, PostTemplateType } from "@/types/betsocial";

type TemplatePostComposerProps = {
  open: boolean;
  pending?: boolean;
  initial?: Partial<CreatePostPayload>;
  onClose: () => void;
  onSubmit: (payload: CreatePostPayload) => void;
};

export function TemplatePostComposer({ open, pending, initial, onClose, onSubmit }: TemplatePostComposerProps) {
  const [templateType, setTemplateType] = useState<PostTemplateType>(initial?.templateType ?? "big_win");
  const [caption, setCaption] = useState(initial?.caption ?? "");
  const [sticker, setSticker] = useState(initial?.sticker ?? "🚀");
  const [game, setGame] = useState(initial?.game ?? "Fortune Tiger");
  const [amount, setAmount] = useState(initial?.amount ?? 4200);
  const [multiplier, setMultiplier] = useState(initial?.multiplier ?? 230);

  const preview = buildPostContent(
    { templateType, game, amount, multiplier, caption, sticker },
    "Você"
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      templateType,
      game,
      amount,
      multiplier,
      caption: clampCaption(caption, CAPTION_MAX_POST),
      sticker
    });
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-md sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.form onSubmit={handleSubmit} initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#071018] p-5 shadow-violet">
            <div className="mb-4 flex justify-between">
              <div>
                <h3 className="text-xl font-black">Publicação controlada</h3>
                <p className="text-sm text-zinc-400">Layout automático · frase até {CAPTION_MAX_POST} caracteres</p>
              </div>
              <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full bg-white/5">
                <X className="size-5" />
              </button>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2">
              {(Object.keys(POST_TEMPLATES) as PostTemplateType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTemplateType(key)}
                  className={cn(
                    "rounded-xl border px-2 py-2 text-xs font-bold",
                    templateType === key ? "border-primary/50 bg-primary/10 text-primary" : "border-white/10 text-zinc-500"
                  )}
                >
                  {POST_TEMPLATES[key].emoji} {POST_TEMPLATES[key].label}
                </button>
              ))}
            </div>

            <div className="premium-card mb-4 rounded-2xl border border-gold/20 p-4">
              <p className="font-black">{preview.title}</p>
              <p className="text-sm text-zinc-300">{preview.description}</p>
              <p className="mt-2 text-2xl font-black text-primary">{money(amount)} · {multiplier}x</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm text-zinc-300">
                Jogo
                <input value={game} onChange={(e) => setGame(e.target.value)} className="field-input" />
              </label>
              <label className="grid gap-1 text-sm text-zinc-300">
                Valor
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="field-input" />
              </label>
              <label className="grid gap-1 text-sm text-zinc-300 sm:col-span-2">
                Multiplicador
                <input type="number" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} className="field-input" />
              </label>
              <label className="grid gap-1 text-sm text-zinc-300 sm:col-span-2">
                Frase ({caption.length}/{CAPTION_MAX_POST})
                <input value={caption} onChange={(e) => setCaption(e.target.value.slice(0, CAPTION_MAX_POST))} className="field-input" placeholder="Entrada limpa demais" />
              </label>
            </div>

            <div className="mt-2 flex gap-2">
              {POST_STICKERS.map((s) => (
                <button key={s} type="button" onClick={() => setSticker(s)} className={cn("rounded-full border px-3 py-1", sticker === s && "border-primary bg-primary/10")}>
                  {s}
                </button>
              ))}
            </div>

            <Button className="mt-5 w-full" type="submit" disabled={pending}>
              <Send className="size-4" />
              {pending ? "Publicando..." : "Compartilhar conquista"}
            </Button>
          </motion.form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
