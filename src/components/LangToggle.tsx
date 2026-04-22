import { useI18n } from "@/lib/i18n";

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex items-center rounded-md border border-border/60 bg-surface p-0.5 font-mono text-[11px]">
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`rounded px-2 py-1 transition-colors ${
          lang === "es"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-accent"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded px-2 py-1 transition-colors ${
          lang === "en"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-accent"
        }`}
      >
        EN
      </button>
    </div>
  );
}
