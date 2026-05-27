"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { POST_TEMPLATES } from "@/lib/templates";
import { money } from "@/lib/utils";
import type { PendingWinShare } from "@/types/betsocial";

type WinShareModalProps = {
  payload?: PendingWinShare;
  open: boolean;
  onDismiss: () => void;
  onShare: (payload: PendingWinShare) => void;
};

export function WinShareModal({ payload, open, onDismiss, onShare }: WinShareModalProps) {
  if (!payload) return null;
  const template = POST_TEMPLATES[payload.templateType];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 via-[#071018] to-[#071018] p-6 text-center shadow-gold"
          >
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl border border-gold/40 bg-gold/10">
              <Trophy className="size-8 text-gold" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-gold">Grande vitória</p>
            <h3 className="mt-2 text-2xl font-black">
              Você acabou de ganhar {money(payload.amount)}
            </h3>
            <p className="mt-2 text-zinc-400">
              {template.emoji} {payload.multiplier}x no {payload.game}
            </p>
            <p className="mt-4 text-sm text-zinc-500">Deseja compartilhar sua conquista com a comunidade?</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <Button className="w-full bg-gradient-to-r from-primary to-violetGlow" onClick={() => onShare(payload)}>
                Compartilhar
              </Button>
              <Button variant="glass" className="w-full" onClick={onDismiss}>
                Agora não
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
