import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Trash2 } from "lucide-react";
import BrailleCell from "@/components/BrailleCell";
import { getCharLabel } from "@/lib/braille";
import { speakChar, speakText, setTTSEnabled, isTTSEnabled } from "@/lib/tts";

const PRINTABLE = /^[a-zA-Z0-9 .,!?;:'\-]$/;

const Index = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentChar, setCurrentChar] = useState<string | null>(null);
  const [audioOn, setAudioOn] = useState(true);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setHistory((prev) => {
          const next = prev.slice(0, -1);
          setCurrentChar(next.length > 0 ? next[next.length - 1] : null);
          return next;
        });
        return;
      }
      if (PRINTABLE.test(e.key)) {
        const ch = e.key;
        setHistory((prev) => [...prev, ch]);
        setCurrentChar(ch);
        speakChar(ch);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const toggleAudio = () => {
    const next = !audioOn;
    setAudioOn(next);
    setTTSEnabled(next);
  };

  const handleSpeakAll = () => {
    const text = history.join("");
    speakText(text);
  };

  const handleClear = () => {
    setHistory([]);
    setCurrentChar(null);
  };

  const typedText = history.join("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-10 pb-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
        >
          Braille<span className="text-primary">y</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-muted-foreground text-lg"
        >
          Type anywhere — see &amp; hear Braille in real time
        </motion.p>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 pb-10 flex flex-col gap-8">
        {/* Current Character */}
        <section className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {currentChar ? (
              <motion.div
                key={currentChar + history.length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.4 }}
              >
                <BrailleCell char={currentChar} size="lg" animate />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-8 text-center"
              >
                <p className="text-muted-foreground text-lg">
                  Start typing to see Braille…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typed text preview */}
          {typedText && (
            <div className="glass-card px-5 py-3 max-w-full overflow-x-auto">
              <p className="text-foreground font-medium text-lg tracking-wide whitespace-pre">
                {typedText}
              </p>
            </div>
          )}
        </section>

        {/* Controls */}
        <section className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={handleSpeakAll}
            disabled={history.length === 0}
            className="glass-card px-5 py-2.5 flex items-center gap-2 text-primary hover:glow-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            <span className="font-medium text-sm">Speak All</span>
          </button>
          <button
            onClick={handleClear}
            disabled={history.length === 0}
            className="glass-card px-5 py-2.5 flex items-center gap-2 text-destructive hover:glow-secondary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            <span className="font-medium text-sm">Clear</span>
          </button>
          <button
            onClick={toggleAudio}
            className={`glass-card px-5 py-2.5 flex items-center gap-2 transition-all ${
              audioOn ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="font-medium text-sm">
              Audio {audioOn ? "On" : "Off"}
            </span>
          </button>
        </section>

        {/* History Grid */}
        {history.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Character History
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              <AnimatePresence>
                {history.map((ch, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BrailleCell char={ch} size="sm" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
