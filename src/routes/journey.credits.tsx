import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/credits")({ component: Credits });

function Credits() {
  const nav = useNavigate();
  return (
    <SceneShell>
      <div className="w-full max-w-md text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
          <p className="font-display text-2xl text-rose-900 dark:text-rose-100">{content.credits.signature}</p>
          <p className="mt-2 text-sm text-muted-foreground">by <span className="font-medium">{content.author.name}</span></p>

          <div className="my-8 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

          <p className="text-sm text-muted-foreground">{content.credits.thanks}</p>

          <motion.button
            onClick={() => {
              try { sessionStorage.removeItem("hena:unlocked"); } catch {}
              nav({ to: "/" });
            }}
            whileHover={{ scale: 1.05 }}
            className="mt-10 rounded-full bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 px-6 py-2.5 text-sm text-rose-950 shadow-[0_0_40px_rgba(232,192,122,0.6)]">
            ✨ {content.credits.restart}
          </motion.button>
        </motion.div>
      </div>
    </SceneShell>
  );
}
