import { useEffect, useState } from "react";

interface TypingLineProps {
  lines: string[];
  speed?: number;
  pause?: number;
}

export function TypingLine({ lines, speed = 45, pause = 1600 }: TypingLineProps) {
  const [lineIdx, setLineIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setLineIdx((i) => (i + 1) % lines.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
        },
        deleting ? speed / 2 : speed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, lineIdx, lines, speed, pause]);

  return (
    <span className="font-mono text-accent terminal-cursor">{text}</span>
  );
}
