"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { BetSocialView } from "@/stores/ui-store";

type ViewTransitionTemplateProps = {
  activeView: BetSocialView;
  children: ReactNode;
};

export function ViewTransitionTemplate({ activeView, children }: ViewTransitionTemplateProps) {
  return (
    <motion.div
      key={activeView}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {children}
    </motion.div>
  );
}
