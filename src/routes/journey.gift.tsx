import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SceneShell } from "@/components/layout/SceneShell";

export const Route = createFileRoute("/journey/gift")({ component: Gift });

function goldBurst() {
  confetti({ particleCount: 120, spread: 100, origin: { y: 0.55 }, colors: ["#e8c07a","#fadadd","#e8a6b6","#d9c7f2","#fff7ec"] });
}

function Gift() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <SceneShell>
      <div className="flex w-full max-w-md flex-col items-center">
        <h2 className="font-display text-3xl text-rose-900 dark:text-rose-100">a secret gift</h2>
        <p className="mt-1 text-sm text-muted-foreground">tap the box</p>

        <button onClick={() => { if (!open) { setOpen(true); goldBurst(); } }} className="relative mt-10 h-56 w-56" aria-label="Open gift">
          {/* box base */}
          <div className="absolute inset-x-2 bottom-0 h-32 rounded-md bg-gradient-to-br from-rose-400 to-rose-600 shadow-xl" />
          {/* vertical ribbon */}
          <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gradient-to-b from-amber-300 to-amber-500" />
          {/* lid */}
          <motion.div className="absolute inset-x-0 top-0 h-16 rounded-md bg-gradient-to-br from-rose-500 to-rose-700 shadow-xl"
            animate={open ? { y: -120, rotate: -12, opacity: 0 } : { y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
          {/* horizontal ribbon on lid */}
          <motion.div className="absolute inset-x-0 top-6 h-3 bg-gradient-to-r from-amber-300 to-amber-500"
            animate={open ? { y: -120, opacity: 0 } : {}} transition={{ duration: 0.9 }} />
          {/* bow */}
          <motion.div className="absolute left-1/2 top-0 h-8 w-16 -translate-x-1/2 rounded-full bg-amber-400 shadow"
            animate={open ? { y: -140, rotate: 30, opacity: 0 } : {}} transition={{ duration: 0.9 }} />

          <AnimatePresence>
            {open && (
              <>
                {["🦋","🌸","🌷","✨","💫","🦋","🌼"].map((e, i) => (
                  <motion.span key={i} className="absolute left-1/2 top-1/2 text-2xl"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{ x: (i - 3) * 60, y: -60 - (i % 3) * 40, opacity: [0,1,0], scale: 1.2 }}
                    transition={{ duration: 2.2, delay: i * 0.08 }}>{e}</motion.span>
                ))}
              </>
            )}
          </AnimatePresence>
        </button>

        {open && (
          <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            onClick={() => nav({ to: "/journey/final" })}
            className="mt-10 rounded-full bg-rose-500/90 px-6 py-2.5 text-sm text-white shadow-lg">
            Almost there →
          </motion.button>
        )}
      </div>
    </SceneShell>
  );
}
