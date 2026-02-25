// Grade-1 Braille mapping: each character maps to [d1,d2,d3,d4,d5,d6]
// Dot positions:  1 4
//                 2 5
//                 3 6

const BRAILLE_MAP: Record<string, boolean[]> = {
  a: [true, false, false, false, false, false],
  b: [true, true, false, false, false, false],
  c: [true, false, false, true, false, false],
  d: [true, false, false, true, true, false],
  e: [true, false, false, false, true, false],
  f: [true, true, false, true, false, false],
  g: [true, true, false, true, true, false],
  h: [true, true, false, false, true, false],
  i: [false, true, false, true, false, false],
  j: [false, true, false, true, true, false],
  k: [true, false, true, false, false, false],
  l: [true, true, true, false, false, false],
  m: [true, false, true, true, false, false],
  n: [true, false, true, true, true, false],
  o: [true, false, true, false, true, false],
  p: [true, true, true, true, false, false],
  q: [true, true, true, true, true, false],
  r: [true, true, true, false, true, false],
  s: [false, true, true, true, false, false],
  t: [false, true, true, true, true, false],
  u: [true, false, true, false, false, true],
  v: [true, true, true, false, false, true],
  w: [false, true, false, true, true, true],
  x: [true, false, true, true, false, true],
  y: [true, false, true, true, true, true],
  z: [true, false, true, false, true, true],
  "1": [true, false, false, false, false, false],
  "2": [true, true, false, false, false, false],
  "3": [true, false, false, true, false, false],
  "4": [true, false, false, true, true, false],
  "5": [true, false, false, false, true, false],
  "6": [true, true, false, true, false, false],
  "7": [true, true, false, true, true, false],
  "8": [true, true, false, false, true, false],
  "9": [false, true, false, true, false, false],
  "0": [false, true, false, true, true, false],
  " ": [false, false, false, false, false, false],
  ".": [false, false, true, false, true, false],
  ",": [false, true, false, false, false, false],
  "!": [false, true, true, false, true, false],
  "?": [false, true, true, false, false, true],
  ";": [false, true, true, false, false, false],
  ":": [false, true, false, false, true, false],
  "-": [false, false, true, false, false, true],
  "'": [false, false, true, false, false, false],
};

export function charToBraille(ch: string): boolean[] {
  const key = ch.toLowerCase();
  return BRAILLE_MAP[key] ?? [false, false, false, false, false, false];
}

export function getBrailleUnicode(ch: string): string {
  const dots = charToBraille(ch);
  // Unicode Braille starts at U+2800
  // Bit pattern: d1=bit0, d2=bit1, d3=bit2, d4=bit3, d5=bit4, d6=bit5
  let offset = 0;
  if (dots[0]) offset |= 1;
  if (dots[1]) offset |= 2;
  if (dots[2]) offset |= 4;
  if (dots[3]) offset |= 8;
  if (dots[4]) offset |= 16;
  if (dots[5]) offset |= 32;
  return String.fromCharCode(0x2800 + offset);
}

export function getCharLabel(ch: string): string {
  if (ch === " ") return "Space";
  return ch.toUpperCase();
}
