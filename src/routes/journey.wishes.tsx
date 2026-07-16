import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/wishes")({ component: Wishes });

function Wishes() {
  const nav = useNavigate();
  return (
    <SceneShell>
      <div className="w-full max-w-2xl">
        <h2 className="text-center font-display text-3xl text-rose-900 dark:text-rose-100">wishes for you</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {content.wishes.map((w, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ animation: `float-y ${4 + (i % 3)}s ease-in-out ${i * 0.4}s infinite` }}>
              <GlassCard className="text-center">
                <p className="font-display text-xl text-rose-900 dark:text-rose-100">{w}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button onClick={() => nav({ to: "/journey/night" })}
            className="rounded-full bg-rose-500/90 px-6 py-2.5 text-sm text-white shadow-lg">
            Step into the night →
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
