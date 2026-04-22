import { BadgeCheck, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import certEjpt from "@/assets/cert-ejpt.png";
import certEh from "@/assets/cert-ethical-hacker.png";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  url: string;
  img: string;
}

const certs: Cert[] = [
  {
    name: "eJPTv2 — Junior Penetration Tester",
    issuer: "INE Security",
    date: "2026",
    url: "https://certs.ine.com/b449ae08-9d37-47af-b569-be68235aedc9#acc.iSGY2ag0",
    img: certEjpt,
  },
  {
    name: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "2026",
    url: "https://www.credly.com/badges/9ead2b66-3247-4792-aa82-cae1d9d1795b/linked_in_profile",
    img: certEh,
  },
];

export function Certifications() {
  const { t } = useI18n();
  return (
    <section id="certs" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent">{t("certs.idx")}</p>
            <h2 className="mt-1 font-mono text-3xl font-semibold tracking-tight md:text-4xl">
              {t("certs.title")}
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t("certs.intro")}</p>
          </div>
          <p className="hidden font-mono text-xs text-muted-foreground md:block">
            {t("certs.sub")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {certs.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent/60"
            >
              <div className="aspect-[4/3] overflow-hidden border-b border-border bg-surface-elevated">
                <img
                  src={c.img}
                  alt={`${c.name} certificate`}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-elevated text-accent">
                    <BadgeCheck className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{c.date}</span>
                </div>
                <h3 className="mt-4 font-mono text-base font-semibold text-foreground">{c.name}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {t("certs.issuedBy")} <span className="text-foreground">{c.issuer}</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent opacity-80 transition-opacity group-hover:opacity-100">
                  {t("certs.verify")} <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
