import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/letter")({ component: Letter });

function Letter() {
  const nav = useNavigate();
  const words = useMemo(() => content.letter.body.split(/(\s+)/), []);
  const [done, setDone] = useState(false);

  return (
    <SceneShell>
      <div className="w-full max-w-2xl">
        <div className="relative rounded-2xl bg-[color:var(--cream)] p-6 shadow-2xl sm:p-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(180,130,90,0.05) 0 1px, transparent 1px 28px), radial-gradient(circle at 20% 10%, rgba(200,150,100,0.08), transparent 60%)",
          }}>
          <h1 className="font-display text-2xl text-rose-900 sm:text-3xl">{content.letter.title}</h1>
          <p className="mt-5 whitespace-pre-wrap font-hand text-xl leading-relaxed text-rose-950 sm:text-2xl">
            {words.map((w, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.045 }}
                onAnimationComplete={() => { if (i === words.length - 1) setDone(true); }}>
                {w}
              </motion.span>
            ))}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button onClick={() => nav({ to: "/journey/memories" })}
            disabled={!done}
            className="rounded-full bg-rose-500/90 px-6 py-2.5 text-sm text-white shadow-lg backdrop-blur disabled:opacity-40">
            {content.letter.nextLabel}
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
