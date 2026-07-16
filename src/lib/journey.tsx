import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Howl } from "howler";
import { content } from "./content";

type JourneyState = {
  unlocked: boolean;
  unlock: () => void;
  musicOn: boolean;
  toggleMusic: () => void;
  playMusic: () => void;
  hydrated: boolean;
};

const Ctx = createContext<JourneyState | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    setHydrated(true);
    try {
      setUnlocked(sessionStorage.getItem("hena:unlocked") === "1");
    } catch {}
  }, []);

  const unlock = useCallback(() => {
    setUnlocked(true);
    try { sessionStorage.setItem("hena:unlocked", "1"); } catch {}
  }, []);

  const ensureHowl = useCallback(() => {
    if (howlRef.current) return howlRef.current;
    const track = content.music[0];
    if (!track) return null;
    const h = new Howl({ src: [track.src], html5: true, loop: true, volume: 0.4 });
    howlRef.current = h;
    return h;
  }, []);

  const playMusic = useCallback(() => {
    const h = ensureHowl();
    if (!h) return;
    if (!h.playing()) h.play();
    setMusicOn(true);
  }, [ensureHowl]);

  const toggleMusic = useCallback(() => {
    const h = ensureHowl();
    if (!h) return;
    if (h.playing()) { h.pause(); setMusicOn(false); }
    else { h.play(); setMusicOn(true); }
  }, [ensureHowl]);

  useEffect(() => () => { howlRef.current?.unload(); }, []);

  const value = useMemo(() => ({ unlocked, unlock, musicOn, toggleMusic, playMusic, hydrated }),
    [unlocked, unlock, musicOn, toggleMusic, playMusic, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useJourney() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useJourney outside provider");
  return v;
}
