import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/night")({ component: Night });

/** A real crescent moon: pale silver disc with an offset shadow disc carving the crescent. */
function Moon() {
  return (
    <motion.div
      className="relative mx-auto h-32 w-32"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#e8ecf7_45%,#c9d2e6_100%)] shadow-[0_0_90px_28px_rgba(200,215,255,0.28)]" />
      {/* craters */}
      <div className="absolute left-[22%] top-[30%] h-4 w-4 rounded-full bg-slate-400/25" />
      <div className="absolute left-[46%] top-[58%] h-6 w-6 rounded-full bg-slate-400/20" />
      <div className="absolute left-[62%] top-[24%] h-3 w-3 rounded-full bg-slate-400/20" />
      {/* shadow disc that carves the crescent */}
      <div className="absolute -right-7 -top-3 h-32 w-32 rounded-full bg-[#0d0b18] shadow-[inset_6px_0_18px_rgba(255,255,255,0.06)]" />
    </motion.div>
  );
}

function Night() {
  const nav = useNavigate();
  const page = content.night;

  return (
    <SceneShell>
      <div className="relative w-full max-w-2xl text-center">
        <Moon />

        <h2 className="mt-10 font-display text-4xl text-rose-100">{page.title}</h2>
        <p className="mt-2 text-sm text-rose-200/60">{page.subtitle}</p>

        {["🦋", "🦋", "🌸", "🌷", "🦋", "✨"].map((e, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-2xl opacity-80"
            style={{ left: `${(i * 27) % 90}%`, top: `${20 + ((i * 13) % 60)}%` }}
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], rotate: [0, 8, -6, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {e}
          </motion.span>
        ))}

        <button
          onClick={() => nav({ to: "/journey/gift" })}
          className="mt-14 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-900/40 transition hover:scale-[1.03]"
        >
          {page.nextLabel}
        </button>
      </div>
    </SceneShell>
  );
}
