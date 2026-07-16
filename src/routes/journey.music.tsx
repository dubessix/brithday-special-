import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { content } from "@/lib/content";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/journey/music")({ component: MusicScene });

function MusicScene() {
  const nav = useNavigate();
  const { musicOn, toggleMusic, playMusic } = useJourney();
  const track = content.music[0];

  return (
    <SceneShell hideAudio>
      <GlassCard className="w-full max-w-sm text-center">
        <h2 className="font-display text-2xl text-rose-900 dark:text-rose-100">for your ears</h2>

        <div className="mx-auto mt-6 grid h-56 w-56 place-items-center">
          <motion.div
            className="relative h-56 w-56 rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-lilac shadow-2xl"
            animate={{ rotate: musicOn ? 360 : 0 }}
            transition={{ repeat: musicOn ? Infinity : 0, duration: 8, ease: "linear" }}
          >
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-600" />
            <div className="absolute inset-16 rounded-full bg-white/90 shadow-inner" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-950" />
          </motion.div>
        </div>

        <p className="mt-6 font-display text-xl">{track?.title}</p>
        <p className="text-xs text-muted-foreground">{track?.artist}</p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={musicOn ? toggleMusic : playMusic}
            aria-label={musicOn ? "Pause" : "Play"}
            className="grid h-14 w-14 place-items-center rounded-full bg-rose-500 text-white shadow-xl transition hover:scale-105">
            {musicOn ? <HiOutlinePause className="h-6 w-6" /> : <HiOutlinePlay className="h-6 w-6" />}
          </button>
        </div>

        <button onClick={() => nav({ to: "/journey/wishes" })}
          className="mt-8 rounded-full bg-white/60 px-5 py-2 text-sm text-rose-900 backdrop-blur dark:bg-white/10 dark:text-rose-100">
          Continue →
        </button>
      </GlassCard>
    </SceneShell>
  );
}
