import { Github, Lock, Gamepad2, KeyRound, Wifi, KeySquare, HardDrive, Smile, Bluetooth } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PublicProject {
  name: string;
  descKey: string;
  tags: string[];
  icon: LucideIcon;
  href: string;
}

interface PrivateProject {
  name: string;
  hint: string;
  icon: LucideIcon;
}

const publicProjects: PublicProject[] = [
  {
    name: "impostor-game",
    descKey: "projects.p.impostor",
    tags: ["python", "game-logic"],
    icon: Gamepad2,
    href: "https://github.com/Elhoyyy/impostor-game",
  },
  {
    name: "RC4",
    descKey: "projects.p.rc4",
    tags: ["cryptography", "cipher"],
    icon: KeyRound,
    href: "https://github.com/Elhoyyy/RC4",
  },
  {
    name: "Emoticonos_Estego",
    descKey: "projects.p.emoticonos",
    tags: ["steganography", "python"],
    icon: Smile,
    href: "https://github.com/Elhoyyy/Emoticonos_Estego",
  }
];

const privateProjects: PrivateProject[] = [
  { name: "CyberWifi", hint: "wireless · auditing", icon: Wifi },
  { name: "PassTheKey", hint: "credentials · auth · TFG", icon: KeySquare },
  { name: "Ext4RecForensic", hint: "forensics · recovery", icon: HardDrive },
  { name: "CyberBlue", hint: "bluetooth · auditing · pentest" , icon: Bluetooth },
];

export function Projects() {
  const { t } = useI18n();
  return (
    <section id="projects" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index={t("projects.idx")} title={t("projects.title")} subtitle={t("projects.sub")} />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {publicProjects.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col rounded-lg border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/60"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-elevated text-accent transition-colors group-hover:border-accent/60">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <Github className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-mono text-lg font-semibold text-foreground">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(p.descKey)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>

        {/* Encrypted / private */}
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
            <span>{t("projects.vault")}</span>
            <span className="ml-2 h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {privateProjects.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="group relative overflow-hidden rounded-lg border border-dashed border-border bg-surface/40 p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                  </div>
                  <p className="mt-4 font-mono text-sm text-foreground">
                    {p.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {p.hint}
                  </p>
                  <p className="mt-3 font-mono text-[10px] tracking-widest text-muted-foreground/70">
                    AES-256 · LOCKED
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ index, title, subtitle }: { index: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="font-mono text-xs text-accent">{index}</p>
        <h2 className="mt-1 font-mono text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
          <span className="text-accent">.</span>
        </h2>
      </div>
      <p className="hidden font-mono text-xs text-muted-foreground md:block">{subtitle}</p>
    </div>
  );
}
