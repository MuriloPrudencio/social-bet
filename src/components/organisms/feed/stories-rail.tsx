"use client";

import { motion } from "framer-motion";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { Surface } from "@/components/atoms/surface";
import { SectionHeading } from "@/components/molecules/section-heading";
import { STORY_TEMPLATES } from "@/lib/templates";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import type { Story } from "@/types/betsocial";

export function StoriesRail({ stories = [], currentUserId }: { stories?: Story[]; currentUserId?: string }) {
  const openStory = useFeedInteractionStore((s) => s.openStory);
  const openStoryComposer = useFeedInteractionStore((s) => s.openStoryComposer);
  const myStories = stories.filter((story) => story.user.id === currentUserId);
  const visibleStories = stories.filter((story) => story.user.id !== currentUserId);

  return (
    <Surface className="premium-card overflow-hidden p-4">
      <SectionHeading title="Highlights" subtitle="Conquistas · 24h" />
      <div className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain pb-1">
        <div className="grid min-w-[4.5rem] place-items-center gap-2 text-center text-xs text-zinc-300">
          <button
            type="button"
            onClick={openStoryComposer}
            className={`grid size-16 place-items-center rounded-full border-2 text-2xl text-primary transition hover:bg-primary/20 ${
              myStories.length
                ? "border-primary bg-[conic-gradient(#32f253,#a855f7,#facc15,#32f253)] p-[3px]"
                : "border-dashed border-primary/50 bg-primary/10"
            }`}
          >
            <span className="grid size-full place-items-center rounded-full bg-[#071018]">
              <Plus className="size-5" />
            </span>
          </button>
          <span className="font-semibold">Seu highlight</span>
          {myStories.length ? <span className="text-[10px] font-black text-primary">{myStories.length} ativo(s)</span> : null}
        </div>
        {myStories.map((story, index) => (
          <StoryButton key={story.id} story={story} index={index} owned onOpen={openStory} />
        ))}
        {visibleStories.map((story, index) => {
          const template = STORY_TEMPLATES[story.templateType];
          return (
            <motion.button
              key={story.id}
              type="button"
              onClick={() => openStory(story)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="min-w-[4.5rem] text-center"
            >
              <div
                className="mx-auto rounded-full border-[3px] border-primary p-[3px]"
                style={{ background: `linear-gradient(135deg, ${story.accentColor}, ${template.accent})` }}
              >
                <div className="rounded-full bg-[#071018] p-[2px]">
                  <Avatar label={story.user.avatar} verified={story.user.verified} size="lg" />
                </div>
              </div>
              <p className="mt-2 truncate text-xs font-bold">{story.user.name}</p>
              <p className="text-[10px] font-black uppercase text-primary">{story.templateLabel}</p>
            </motion.button>
          );
        })}
      </div>
    </Surface>
  );
}

function StoryButton({ story, index, owned, onOpen }: { story: Story; index: number; owned?: boolean; onOpen: (story: Story) => void }) {
  const template = STORY_TEMPLATES[story.templateType];
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(story)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative min-w-[4.5rem] text-center"
    >
      <div
        className="mx-auto rounded-full border-[3px] border-primary p-[3px]"
        style={{ background: `linear-gradient(135deg, ${story.accentColor}, ${template.accent})` }}
      >
        <div className="rounded-full bg-[#071018] p-[2px]">
          <Avatar label={story.user.avatar} verified={story.user.verified} size="lg" />
        </div>
      </div>
      {owned ? (
        <div className="absolute right-0 top-0 flex gap-1 opacity-0 transition group-hover:opacity-100">
          <span className="grid size-5 place-items-center rounded-full bg-black/80 text-primary"><Edit3 className="size-3" /></span>
          <span className="grid size-5 place-items-center rounded-full bg-black/80 text-red-400"><Trash2 className="size-3" /></span>
        </div>
      ) : null}
      <p className="mt-2 truncate text-xs font-bold">{owned ? "Seu highlight" : story.user.name}</p>
      <p className="text-[10px] font-black uppercase text-primary">{story.templateLabel}</p>
    </motion.button>
  );
}
