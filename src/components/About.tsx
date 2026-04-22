import { Bluetooth, Wifi, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs text-accent">{t("about.idx")}</p>
        <h2 className="mt-2 font-mono text-2xl font-semibold tracking-tight md:text-3xl">
          {t("about.cmd")}<span className="text-accent">_</span>
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>

          <div className="flex gap-3 md:flex-col">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-surface text-accent">
              <Wifi className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-surface text-accent">
              <Bluetooth className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-surface text-accent">
              <Cpu className="h-5 w-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
