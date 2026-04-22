import { Music } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Beyond() {
  const { t } = useI18n();
  return (
    <section id="beyond" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 rounded-lg border border-border bg-surface p-8 md:grid-cols-[auto_1fr] md:items-center md:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-surface-elevated text-accent accent-glow">
            <Music className="h-7 w-7" strokeWidth={1.25} />
          </div>
          <div>
            <p className="font-mono text-xs text-accent">{t("beyond.idx")}</p>
            <h2 className="mt-2 font-mono text-2xl font-semibold tracking-tight md:text-3xl">
              {t("beyond.title")}<span className="text-accent">.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("beyond.text")}
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              <span className="text-accent">~/</span>
              {t("beyond.loc")} <span className="text-foreground">Galicia, Spain</span>{" "}
              {t("beyond.locWith")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
