import { Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();
  const links = [
    { href: "#about", label: t("nav.about") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#certs", label: t("nav.certs") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#beyond", label: t("nav.beyond") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold">
          <Terminal className="h-4 w-4 text-accent" strokeWidth={1.5} />
          <span>eloy</span>
          <span className="text-accent">_</span>
        </a>
        <nav className="hidden items-center gap-6 font-mono text-xs text-muted-foreground lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-accent">
              <span className="text-accent/70">~/</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden font-mono text-[11px] text-muted-foreground xl:inline">
            {t("header.lang")}
          </span>
          <LangToggle />
          <span className="hidden font-mono text-[11px] text-muted-foreground xl:inline">
            {t("header.theme")}
          </span>
          <ThemeToggle />
          <a
            href="https://github.com/Elhoyyy"
            target="_blank"
            rel="noreferrer"
            className="hidden font-mono text-xs text-muted-foreground transition-colors hover:text-accent sm:inline"
          >
            github ↗
          </a>
        </div>
      </div>
    </header>
  );
}
