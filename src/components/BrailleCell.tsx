import { motion } from "framer-motion";
import { charToBraille, getBrailleUnicode, getCharLabel } from "@/lib/braille";

interface BrailleCellProps {
  char: string;
  size?: "sm" | "lg";
  animate?: boolean;
}

const BrailleCell = ({ char, size = "sm", animate = false }: BrailleCellProps) => {
  const dots = charToBraille(char);
  const unicode = getBrailleUnicode(char);
  const label = getCharLabel(char);

  const dotSize = size === "lg" ? "w-5 h-5" : "w-3 h-3";
  const gap = size === "lg" ? "gap-3" : "gap-1.5";
  const cellPadding = size === "lg" ? "p-5" : "p-3";

  // Dots layout: col1=[d1,d2,d3], col2=[d4,d5,d6]
  const col1 = [dots[0], dots[1], dots[2]];
  const col2 = [dots[3], dots[4], dots[5]];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`glass-card ${cellPadding} flex ${gap}`}>
        {[col1, col2].map((col, ci) => (
          <div key={ci} className={`flex flex-col ${gap}`}>
            {col.map((active, di) => {
              const Wrapper = animate ? motion.div : "div";
              const props = animate && active
                ? { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: di * 0.05, duration: 0.3, type: "spring" as const } }
                : {};
              return (
                <Wrapper
                  key={di}
                  {...(props as any)}
                  className={`${dotSize} rounded-full transition-all duration-200 ${
                    active
                      ? "bg-dot-active dot-glow"
                      : "bg-dot-inactive"
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className={`font-semibold ${size === "lg" ? "text-2xl" : "text-xs"} text-foreground`}>
          {label}
        </span>
        <span className={`${size === "lg" ? "text-xl" : "text-xs"} text-muted-foreground`}>
          {unicode}
        </span>
      </div>
    </div>
  );
};

export default BrailleCell;
