import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  es: {
    "nav.about": "sobre-mi",
    "nav.projects": "proyectos",
    "nav.certs": "certificaciones",
    "nav.skills": "skills",
    "nav.beyond": "beyond",
    "header.theme": "Tema:",
    "header.lang": "Idioma:",

    "hero.status": "online · acepto retos de seguridad ofensiva",
    "hero.role": "Ciberseguridad y Hacking Ético",
    "hero.role2": "Jugador de CTF",
    "hero.role3": "Scripting en Python",
    "hero.cta1": "ver proyectos",
    "hero.cta2": "arsenal",
    "hero.type1": "rompo sistemas para hacerlos más fuertes.",
    "hero.type2": "estudiante de día, pentester de noche",
    "hero.type3": "python, kali linux, flipper zero y café.",
    "hero.type4": "curiosidad primero.",

    "about.idx": "01 // sobre_mi",
    "about.cmd": "$ cat about.md",
    "about.p1": "Soy Eloy, de Galicia. Llevo un tiempo metido en pentesting porque me gustar entender el por qué de las cosas",
    "about.p2": "Lo que más me llama es lo wireless: Wi-Fi, Bluetooth y BLE. Entender cómo interceptar, y explotar estos protocolos que viajan por el aire me genera curiosidad",
    "about.p3": "Me gusta el hardware hacking y cacharrear en general.",

    "projects.idx": "02",
    "projects.title": "proyectos",
    "projects.sub": "// el hub",
    "projects.vault": "vault_cifrado — próximamente",
    "projects.p.impostor": "Lógica de un juego de rol social: votaciones, fases por rondas y gestión de estado.",
    "projects.p.rc4": "Implementación del cifrado de flujo RC4 — key scheduling, PRGA y análisis didáctico.",
    "projects.p.emoticonos": "Implementación forense de ocultación de mensajes secretos dentro de emojis usando caracteres invisibles Unicode (Zero Width Characters).",


    "certs.idx": "03",
    "certs.title": "certificaciones",
    "certs.sub": "// credenciales verificadas",
    "certs.intro": "Certificaciones técnicas en hacking ético y pentesting.",
    "certs.issuedBy": "Emitido por",
    "certs.verify": "verificar ↗",

    "skills.idx": "04",
    "skills.title": "skills",
    "skills.intro": "El arsenal — herramientas, sistemas y hardware que uso día a día en seguridad ofensiva y CTFs.",
    "skills.tools": "tools",
    "skills.systems": "sistemas",
    "skills.hardware": "hardware",

    "beyond.idx": "05 // más_allá_del_terminal",
    "beyond.title": "Batería y música",
    "beyond.text": "Cuando cierro el portátil, salen las baquetas. Tocar la batería es mi vía de escape pero sin shell.",
    "beyond.loc": "basado en",
    "beyond.locWith": "· potenciado por la lluvia ",

    "footer.built": "construido con cafeína y curiosidad",
  },
  en: {
    "nav.about": "about",
    "nav.projects": "projects",
    "nav.certs": "certs",
    "nav.skills": "skills",
    "nav.beyond": "beyond",
    "header.theme": "Theme:",
    "header.lang": "Language:",

    "hero.status": "online · accepting offensive sec engagements",
    "hero.role": "Cybersecurity & Ethical Hacking",
    "hero.role2": "CTF Player",
    "hero.role3": "Python Scripting",
    "hero.cta1": "view projects",
    "hero.cta2": "arsenal",
    "hero.type1": "breaking systems to make them stronger.",
    "hero.type2": "day student, night pentester",
    "hero.type3": "python, kali linux, flipper zero & coffee.",
    "hero.type4": "curious mind.",

    "about.idx": "01 // about_me",
    "about.cmd": "$ cat about.md",
    "about.p1": "I'm Eloy, from Galicia. I've been diving into pentesting for a while now because I love understanding the 'why' behind how things work.",
    "about.p2": "What fascinates me the most is wireless security: Wi-Fi, Bluetooth, and BLE. I'm driven by a deep curiosity to understand how to intercept and exploit these over-the-air protocols.",
    "about.p3": "I'm into hardware hacking and I just love tinkering with electronics in general.",

    "projects.idx": "02",
    "projects.title": "projects",
    "projects.sub": "// the hub",
    "projects.vault": "encrypted_vault — coming soon",
    "projects.p.impostor": "Game logic exploring deception, voting flows and round state management.",
    "projects.p.rc4": "RC4 stream cipher implementation — key scheduling, PRGA and educational analysis.",
    "projects.p.emoticonos": "Forensic implementation of secret message hiding within emojis using invisible Unicode characters (Zero Width Characters).",
    "certs.idx": "03",
    "certs.title": "certifications",
    "certs.sub": "// verified credentials",
    "certs.intro": "Hands-on certifications in ethical hacking and penetration testing.",
    "certs.issuedBy": "Issued by",
    "certs.verify": "verify ↗",

    "skills.idx": "04",
    "skills.title": "skills",
    "skills.intro": "The arsenal — tools, systems and hardware I use day-to-day for offensive security and CTFs.",
    "skills.tools": "tools",
    "skills.systems": "systems",
    "skills.hardware": "hardware",

    "beyond.idx": "05 // beyond_the_terminal",
    "beyond.title": "Drums & Music",
    "beyond.text": "When the laptop closes, the sticks come out. Drumming is my creative escape but no shell required.",
    "beyond.loc": "based in",
    "beyond.locWith": "· powered by rain ",

    "footer.built": "built with caffeine & curiosity",
  },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
  };

  const t = (key: string) => dictionaries[lang][key] ?? key;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
