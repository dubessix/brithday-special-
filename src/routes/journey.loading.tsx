import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlinePlay } from "react-icons/hi2";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { content } from "@/lib/content";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/journey/loading")({ component: Loading });

function Loading() {
  const nav = useNavigate();
  const { playMusic, musicOn } = useJourney();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 2)), 90);
    return () => clearInterval(id);
  }, []);

  return (
    <SceneShell>
      <GlassCard className="w-full max-w-md text-center">
        <TypeWriter text={content.recipient.greeting} className="font-display text-3xl sm:text-4xl" />
        <p className="mt-3 text-sm text-muted-foreground">Preparing something for you…</p>

        <div className="relative mt-8 h-2 overflow-hidden rounded-full bg-rose-100/60 dark:bg-white/10">
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-300 via-amber-200 to-lilac"
            style={{ width: `${progress}%` }} />
        </div>

        <div className="relative mt-4 h-10">
          {["💗","✨","🌸","💫","🌷","💖"].map((e, i) => (
            <motion.span key={i} className="absolute text-lg" style={{ left: `${(i * 17) % 90}%` }}
              animate={{ y: [10, -30], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}>{e}</motion.span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          {!musicOn && (
            <GoldButton onClick={playMusic} className="gap-2">
              <HiOutlinePlay className="mr-2 inline h-4 w-4" /> Play soft piano
            </GoldButton>
          )}
          <button onClick={() => nav({ to: "/journey/envelope" })}
            className="text-sm text-rose-700 underline-offset-4 hover:underline dark:text-rose-200"
            disabled={progress < 100}
            style={{ opacity: progress < 100 ? 0.4 : 1 }}>
            Continue →
          </button>
        </div>
      </GlassCard>
    </SceneShell>
  );
}
