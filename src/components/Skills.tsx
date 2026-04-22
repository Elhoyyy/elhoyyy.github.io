import { Wrench, Server, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface SkillGroup {
  labelKey: string;
  icon: LucideIcon;
  items: string[];
}

const groups: SkillGroup[] = [
  { labelKey: "skills.tools", icon: Wrench, items: ["Nmap", "Metasploit", "Burp Suite", "Wireshark", "wFuzz", "Subfinder", "..."] },
  { labelKey: "skills.systems", icon: Server, items: ["Kali Linux", "Bash scripting", "Python tooling"] },
  { labelKey: "skills.hardware", icon: Cpu, items: ["Flipper Zero", "RFID / NFC", "Bluetooth / Wifi"] },
];

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <p className="font-mono text-xs text-accent">{t("skills.idx")}</p>
          <h2 className="mt-1 font-mono text-3xl font-semibold tracking-tight md:text-4xl">
            {t("skills.title")}<span className="text-accent">.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t("skills.intro")}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.labelKey}
                className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-elevated text-accent">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                    {t(g.labelKey)}
                  </h3>
                </div>
                <ul className="mt-5 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-mono text-sm">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
