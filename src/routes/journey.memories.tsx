import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/memories")({ component: Memories });

const PALETTES = [
  "from-rose-300 via-amber-200 to-rose-200",
  "from-amber-200 via-rose-200 to-lilac",
  "from-lilac via-rose-200 to-amber-100",
  "from-rose-200 via-amber-100 to-lilac",
  "from-amber-100 via-lilac to-rose-200",
  "from-rose-300 via-lilac to-amber-100",
];

function Polaroid({ i, caption, secret }: { i: number; caption: string; secret: string }) {
  const [flipped, setFlipped] = useState(false);
  const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 4));

  return (
    <motion.button
      onClick={() => setFlipped((f) => !f)}
      className="[perspective:1200px]"
      initial={{ y: -400, opacity: 0, rotate: 0 }}
      animate={{ y: 0, opacity: 1, rotate: rot }}
      transition={{ type: "spring", stiffness: 60, damping: 12, delay: i * 0.15 }}
    >
      <div className="relative h-56 w-44 rounded-md bg-white p-2 pb-8 shadow-xl transition [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transitionDuration: "700ms" }}>
        <div className="absolute inset-2 bottom-8 [backface-visibility:hidden]">
          <div className={`h-full w-full rounded-sm bg-gradient-to-br ${PALETTES[i % PALETTES.length]}`} />
        </div>
        <p className="absolute inset-x-0 bottom-2 text-center font-hand text-sm text-rose-900 [backface-visibility:hidden]">{caption}</p>
        <div className="absolute inset-2 grid place-items-center rounded-sm bg-rose-50 p-3 text-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}>
          <p className="font-hand text-base leading-snug text-rose-900">{secret}</p>
        </div>
      </div>
    </motion.button>
  );
}

function Memories() {
  const nav = useNavigate();
  return (
    <SceneShell>
      <div className="w-full max-w-4xl">
        <h2 className="text-center font-display text-3xl text-rose-900 dark:text-rose-100">{content.memories.title}</h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">{content.memories.subtitle}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {content.photos.map((p, i) => (
            <Polaroid key={i} i={i} caption={p.caption} secret={p.secret} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={() => nav({ to: "/journey/cake" })}
            className="rounded-full bg-rose-500/90 px-6 py-2.5 text-sm text-white shadow-lg">
            {content.memories.nextLabel}
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
