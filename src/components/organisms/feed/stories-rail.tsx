"use client";

import { motion } from "framer-motion";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { STORY_TEMPLATES } from "@/lib/templates";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import type { Story } from "@/types/betsocial";

export function StoriesRail({ stories = [], currentUserId }: { stories?: Story[]; currentUserId?: string }) {
  const openStory = useFeedInteractionStore((s) => s.openStory);
  const openStoryComposer = useFeedInteractionStore((s) => s.openStoryComposer);
  const myStories = stories.filter((story) => story.user.id === currentUserId);
  const visibleStories = stories.filter((story) => story.user.id !== currentUserId);

  return (
    <section className="-mx-3 overflow-hidden border-y border-primary/10 bg-[#050b10]/72 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:bg-panel/70 sm:px-1">
      <div className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain px-3 pb-1 sm:px-4">
        <div className="grid w-[4.75rem] shrink-0 justify-items-center gap-1.5 text-center text-xs text-zinc-200">
          <button
            type="button"
            onClick={openStoryComposer}
            className={`relative grid size-[4.25rem] place-items-center rounded-full border-2 text-2xl text-primary transition hover:bg-primary/20 ${
              myStories.length
                ? "border-primary bg-[conic-gradient(#32f253,#a855f7,#ffc83d,#32f253)] p-[3px]"
                : "border-dashed border-primary/50 bg-primary/10"
            }`}
          >
            <span className="grid size-full place-items-center rounded-full bg-[#071018]">
              <Plus className="size-5" />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full border-2 border-[#050b10] bg-primary text-black">
              <Plus className="size-3.5" />
            </span>
          </button>
          <span className="w-full truncate font-semibold">Seu story</span>
        </div>

        {myStories.map((story, index) => (
          <StoryButton key={story.id} story={story} index={index} owned onOpen={openStory} />
        ))}

        {visibleStories.map((story, index) => (
          <StoryButton key={story.id} story={story} index={index} onOpen={openStory} />
        ))}
      </div>
    </section>
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
      className="group relative w-[4.75rem] shrink-0 text-center"
    >
      <div
        className="story-ring mx-auto rounded-full p-[3px]"
        style={{ background: `conic-gradient(from 220deg, ${story.accentColor}, ${template.accent}, #ffc83d, ${story.accentColor})` }}
      >
        <div className="rounded-full bg-[#071018] p-[2px]">
          <Avatar label={story.user.avatar} verified={story.user.verified} size="lg" />
        </div>
      </div>
      {owned ? (
        <div className="absolute right-0 top-0 flex gap-1 opacity-0 transition group-hover:opacity-100">
          <span className="grid size-5 place-items-center rounded-full bg-black/80 text-primary">
            <Edit3 className="size-3" />
          </span>
          <span className="grid size-5 place-items-center rounded-full bg-black/80 text-red-400">
            <Trash2 className="size-3" />
          </span>
        </div>
      ) : null}
      <p className="mt-1.5 truncate text-xs font-semibold text-zinc-100">{owned ? "Seu story" : story.user.name}</p>
    </motion.button>
  );
}
