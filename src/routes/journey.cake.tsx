import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SceneShell } from "@/components/layout/SceneShell";
import { GoldButton } from "@/components/ui/GoldButton";

export const Route = createFileRoute("/journey/cake")({ component: Cake });

function fireConfetti() {
  const end = Date.now() + 1500;
  const colors = ["#e8a6b6", "#e8c07a", "#d9c7f2", "#fadadd"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function Candle({ blown, delay }: { blown: boolean; delay: number }) {
  return (
    <div className="relative mx-1 flex flex-col items-center">
      {!blown && (
        <motion.div
          className="absolute -top-4 left-1/2 h-4 w-2 -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_20px_6px_rgba(255,200,120,0.75)]"
          style={{ animation: `flicker ${1 + delay}s ease-in-out infinite` }}
        />
      )}
      {blown && <div className="absolute -top-4 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-400/60" />}
      <div className="h-8 w-2 rounded-sm bg-gradient-to-b from-rose-300 to-rose-400" />
    </div>
  );
}

function Cake() {
  const nav = useNavigate();
  const [built, setBuilt] = useState(false);
  const [dim, setDim] = useState(false);
  const [blown, setBlown] = useState(false);

  return (
    <SceneShell>
      <motion.div className="fixed inset-0 z-0 bg-black" animate={{ opacity: dim && !blown ? 0.55 : 0 }} transition={{ duration: 1 }} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <h2 className="font-display text-3xl text-rose-900 dark:text-rose-100">happy birthday 🎂</h2>

        <motion.div className="relative mt-10 h-64 w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onAnimationComplete={() => setBuilt(true)}
          transition={{ duration: 0.6 }}>
          {/* plate */}
          <motion.div className="absolute bottom-2 left-1/2 h-3 w-56 -translate-x-1/2 rounded-full bg-white/80 shadow"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6 }} />
          {/* tier 1 */}
          <motion.div className="absolute bottom-5 left-1/2 h-20 w-48 -translate-x-1/2 rounded-t-md bg-gradient-to-b from-rose-300 to-rose-400 shadow-lg"
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }} />
          {/* cream drips */}
          <motion.div className="absolute bottom-[92px] left-1/2 h-4 w-48 -translate-x-1/2 bg-cream"
            style={{ clipPath: "polygon(0 0,100% 0,95% 100%,88% 30%,80% 100%,72% 40%,64% 100%,56% 30%,48% 100%,40% 40%,32% 100%,24% 30%,16% 100%,8% 40%,0 100%)" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.5 }} />
          {/* tier 2 */}
          <motion.div className="absolute bottom-[100px] left-1/2 h-14 w-32 -translate-x-1/2 rounded-t-md bg-gradient-to-b from-amber-200 to-rose-200 shadow-lg"
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} />
          {/* candles */}
          {built && (
            <div className="absolute bottom-[152px] left-1/2 flex -translate-x-1/2">
              {[0,1,2,3,4].map((i) => <Candle key={i} blown={blown} delay={i * 0.1} />)}
            </div>
          )}
        </motion.div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.div key="blow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GoldButton onClick={() => {
                  setDim(true);
                  setTimeout(() => { setBlown(true); fireConfetti(); }, 900);
                }}>Blow the candles</GoldButton>
                <p className="mt-2 text-center text-xs text-muted-foreground">tap — the lights will dim</p>
              </motion.div>
            ) : (
              <motion.button key="next" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => nav({ to: "/journey/music" })}
                className="rounded-full bg-rose-500/90 px-6 py-2.5 text-sm text-white shadow-lg">
                Make a wish → play our song
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SceneShell>
  );
}
