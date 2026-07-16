import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SceneShell } from "@/components/layout/SceneShell";

export const Route = createFileRoute("/journey/night")({ component: Night });

function Night() {
  const nav = useNavigate();
  return (
    <SceneShell>
      <div className="relative w-full max-w-2xl text-center">
        {/* moon */}
        <motion.div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-[0_0_120px_40px_rgba(255,220,150,0.4)]"
          animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-50 to-amber-200" />
        </motion.div>

        <h2 className="mt-8 font-display text-3xl text-rose-900 dark:text-rose-100">a magical night</h2>
        <p className="mt-2 text-sm text-muted-foreground">move your finger — the sky notices you</p>

        {/* butterflies */}
        {["🦋","🦋","🌸","🌷","🦋","✨"].map((e, i) => (
          <motion.span key={i} className="absolute text-2xl"
            style={{ left: `${(i * 27) % 90}%`, top: `${20 + (i * 13) % 60}%` }}
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], rotate: [0, 8, -6, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}>{e}</motion.span>
        ))}

        <button onClick={() => nav({ to: "/journey/gift" })}
          className="mt-14 rounded-full bg-rose-500/90 px-6 py-2.5 text-sm text-white shadow-lg">
          Open your gift →
        </button>
      </div>
    </SceneShell>
  );
}
