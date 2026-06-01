"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Edit3, Trash2, X } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { ReactionBar } from "@/components/molecules/reaction-bar";
import { STORY_TEMPLATES } from "@/lib/templates";
import { money } from "@/lib/utils";
import type { ReactionKey, Story } from "@/types/betsocial";

type StoryViewerProps = {
  story?: Story;
  onClose: () => void;
  onReact: (storyId: string, reaction: ReactionKey) => void;
  currentUserId?: string;
  onDelete?: (storyId: string) => void;
  onEdit?: (story: Story) => void;
};

export function StoryViewer({ story, onClose, onReact, currentUserId, onDelete, onEdit }: StoryViewerProps) {
  const template = story ? STORY_TEMPLATES[story.templateType] : null;
  const owned = Boolean(story && currentUserId && story.user.id === currentUserId);

  return (
    <AnimatePresence>
      {story && template ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-0 backdrop-blur-md sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ y: 24, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.96 }}
            className="relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden border p-4 shadow-neon sm:aspect-[9/16] sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-[380px] sm:rounded-3xl sm:p-5"
            style={{
              borderColor: `${story.accentColor}66`,
              background: `radial-gradient(circle at 20% 0%, ${story.accentColor}33, transparent 40%), linear-gradient(160deg, #06120b, #101524 50%, #2b1046)`
            }}
          >
            <div className="absolute right-4 top-4 z-10 flex gap-2">
              {owned ? (
                <>
                  <button type="button" onClick={() => story && onEdit?.(story)} className="grid size-9 place-items-center rounded-full bg-black/45 text-primary">
                    <Edit3 className="size-4" />
                  </button>
                  <button type="button" onClick={() => story && onDelete?.(story.id)} className="grid size-9 place-items-center rounded-full bg-black/45 text-red-400">
                    <Trash2 className="size-4" />
                  </button>
                </>
              ) : null}
              <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full bg-black/45 text-white">
                <X className="size-5" />
              </button>
            </div>
            <div className="mb-5 h-1 rounded-full bg-white/15">
              <motion.div className="h-full rounded-full bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6 }} onAnimationComplete={onClose} />
            </div>
            <div className="flex items-center gap-3">
              <Avatar label={story.user.avatar} verified={story.user.verified} size="md" />
              <div>
                <p className="font-black">{story.user.name}</p>
                <p className="text-xs text-zinc-300">{story.user.badge}</p>
              </div>
            </div>
            <div className="mt-10 text-center sm:mt-12">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">{template.label}</p>
              <p className="mt-2 text-5xl">{template.emoji}</p>
              <p className="mt-4 text-lg font-bold text-zinc-200">{story.game}</p>
              <p className="mt-6 text-5xl font-black sm:text-6xl" style={{ color: story.accentColor, textShadow: `0 0 40px ${story.accentColor}88` }}>
                {story.multiplier}x
              </p>
              <p className="mt-3 text-xl font-black text-primary">{money(story.amount)}</p>
              {story.caption ? (
                <p className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-2 text-sm">
                  {story.sticker} {story.caption}
                </p>
              ) : null}
            </div>
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur">
              <ReactionBar reactions={story.reactions} compact onReact={(r) => onReact(story.id, r)} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
