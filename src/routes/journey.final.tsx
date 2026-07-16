import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/final")({ component: Final });

function Final() {
  const nav = useNavigate();
  const [phase, setPhase] = useState<"gather" | "text">("gather");
  useEffect(() => {
    const id = setTimeout(() => setPhase("text"), 2200);
    return () => clearTimeout(id);
  }, []);

  return (
    <SceneShell>
      <div className="relative w-full max-w-2xl text-center">
        <div className="relative mx-auto h-40 w-full">
          {Array.from({ length: 40 }).map((_, i) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = 20 + (i * 60 / 40);
            return (
              <motion.span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_10px_2px_rgba(255,220,150,0.8)]"
                initial={{ left: `${startX}%`, top: `${startY}%` }}
                animate={{ left: `${endX}%`, top: "50%" }}
                transition={{ duration: 2, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }} />
            );
          })}
        </div>

        <motion.h1 className="mt-4 font-display text-4xl leading-tight text-rose-900 sm:text-6xl dark:text-rose-100"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: phase === "text" ? 1 : 0, y: 0 }} transition={{ duration: 1.2 }}>
          Happy Birthday
          <br />
          <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-lilac bg-clip-text text-transparent">{content.recipient.name}</span>
        </motion.h1>

        <motion.p className="mx-auto mt-8 max-w-lg whitespace-pre-line text-base leading-relaxed text-muted-foreground"
          initial={{ opacity: 0 }} animate={{ opacity: phase === "text" ? 1 : 0 }} transition={{ delay: 1, duration: 1 }}>
          {content.finalMessage}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: phase === "text" ? 1 : 0 }} transition={{ delay: 2, duration: 1 }}
          onClick={() => nav({ to: "/journey/credits" })}
          className="mt-10 rounded-full bg-rose-500/90 px-6 py-2.5 text-sm text-white shadow-lg">
          Continue →
        </motion.button>
      </div>
    </SceneShell>
  );
}
