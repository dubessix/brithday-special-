import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";

export const Route = createFileRoute("/journey/envelope")({ component: EnvelopeScene });

function EnvelopeScene() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <SceneShell>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-2xl text-rose-900 dark:text-rose-100">a letter for you</h2>

        <button onClick={() => setOpen(true)} disabled={open} className="relative h-56 w-80 sm:h-64 sm:w-96" aria-label="Open envelope">
          {/* letter that slides out */}
          <motion.div
            className="absolute inset-x-6 top-4 rounded-md bg-cream p-4 text-left font-hand text-rose-900 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={open ? { y: -110, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg leading-snug">Dear Hena,</p>
            <p className="text-sm leading-snug opacity-70">a little something inside…</p>
          </motion.div>

          {/* envelope body */}
          <div className="absolute inset-0 overflow-hidden rounded-md bg-gradient-to-br from-rose-200 to-rose-300 shadow-[0_20px_60px_-20px_rgba(200,80,110,0.5)]">
            {/* back triangle */}
            <div className="absolute inset-x-0 bottom-0 h-full" style={{ clipPath: "polygon(0 100%, 50% 40%, 100% 100%)", background: "linear-gradient(to top, #f3b8c2, #f5c9d2)" }} />
            {/* flap */}
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{ height: "60%", clipPath: "polygon(0 0, 100% 0, 50% 100%)", background: "linear-gradient(to bottom, #f0a8b5, #eb95a4)" }}
              initial={{ rotateX: 0 }}
              animate={open ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* wax seal */}
            {!open && (
              <motion.div
                className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-700 text-amber-100 shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                style={{ width: 56, height: 56 }}
                animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity }}
              >
                <span className="grid h-full w-full place-items-center font-display text-xl">H</span>
              </motion.div>
            )}
          </div>
        </button>

        {!open ? (
          <p className="text-sm text-muted-foreground">tap the seal</p>
        ) : (
          <button onClick={() => nav({ to: "/journey/letter" })}
            className="rounded-full bg-rose-500/90 px-5 py-2 text-sm text-white shadow-lg backdrop-blur">
            Read the letter →
          </button>
        )}
      </div>
    </SceneShell>
  );
}
