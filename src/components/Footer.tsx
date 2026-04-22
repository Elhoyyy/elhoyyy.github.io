import { Github, Linkedin, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <figure className="rounded-lg border border-border bg-surface/60 p-6 md:p-8">
          <Quote className="h-5 w-5 text-accent" strokeWidth={1.5} />
          <blockquote className="mt-3 font-mono text-base leading-relaxed text-foreground md:text-lg">
            "Diseñando hoy las herramientas del mañana."
          </blockquote>
        </figure>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 md:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} eloy · {t("footer.built")}
          </p>
          <a
            href="https://github.com/Elhoyyy"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            <Github className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.5} />
            github.com/Elhoyyy
          </a>
          <a href="https://www.linkedin.com/in/eloy-sastre-sobrino-50689a370/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent">
            <Linkedin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.5} href="https://www.linkedin.com/in/eloy-sastre-sobrino-50689a370/" />
            linkedin.com
          </a>
        </div>
      </div>
    </footer>
  );
}
