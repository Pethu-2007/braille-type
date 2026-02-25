let enabled = true;

export function setTTSEnabled(val: boolean) {
  enabled = val;
  if (!val) window.speechSynthesis?.cancel();
}

export function isTTSEnabled() {
  return enabled;
}

export function speakChar(ch: string) {
  if (!enabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const name = ch === " " ? "Space" : ch.toUpperCase();
  const utterance = new SpeechSynthesisUtterance(name);
  utterance.rate = 1.2;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export function speakText(text: string) {
  if (!enabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}
