import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AudioBar } from "./AudioBar";

/** Wraps every scene: page-level entrance/exit + shared audio bar. */
export function SceneShell({ children, hideAudio = false }: { children: ReactNode; hideAudio?: boolean }) {
  return (
    <motion.main
      className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-5 py-10 sm:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      {!hideAudio && <AudioBar />}
    </motion.main>
  );
}
