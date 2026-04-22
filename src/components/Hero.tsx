import { ShieldCheck, ArrowDownRight, MapPin } from "lucide-react";
import { TypingLine } from "./TypingLine";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="fade-in-up flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span>{t("hero.status")}</span>
          <span className="mx-1 text-border">|</span>
          <MapPin className="h-3 w-3 text-accent" strokeWidth={1.75} />
          <span>Galicia, Spain</span>
        </div>

        <h1 className="fade-in-up mt-6 font-mono text-5xl font-semibold tracking-tight md:text-7xl">
          Eloy<span className="text-accent">.</span>
        </h1>

        <p className="fade-in-up mt-4 max-w-2xl font-mono text-sm text-muted-foreground md:text-base">
          {t("hero.role")}
          <span className="mx-2 text-accent">/</span>
          {t("hero.role2")}
          <span className="mx-2 text-accent">/</span>
          {t("hero.role3")}
        </p>

        <div className="fade-in-up mt-10 max-w-2xl rounded-md border border-border bg-surface/80 p-4 font-mono text-sm shadow-sm">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-3 text-xs text-muted-foreground">~/eloy — zsh</span>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground">whoami --verbose</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-2">
            <span className="text-accent">→</span>
            <TypingLine
              lines={[t("hero.type1"), t("hero.type2"), t("hero.type3"), t("hero.type4")]}
            />
          </div>
        </div>

        <div className="fade-in-up mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-accent-foreground transition-all hover:opacity-90 accent-glow"
          >
            {t("hero.cta1")}
            <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" strokeWidth={1.75} />
          </a>
          <a
            href="#skills"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
            {t("hero.cta2")}
          </a>
        </div>
      </div>
    </section>
  );
}
