import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Beyond } from "@/components/Beyond";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { WireframeSphere } from "@/components/WireframeSphere";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Eloy — Cybersecurity & Ethical Hacking" },
      {
        name: "description",
        content:
          "Eloy — Cybersecurity & Ethical Hacking, CTF Player and Python Scripting Enthusiast. Projects, skills and tooling.",
      },
      { property: "og:title", content: "Eloy — Cybersecurity & Ethical Hacking" },
      {
        property: "og:description",
        content: "Pentester, CTF player and Python scripting enthusiast. Explore projects, tools and the arsenal.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Skills />
        <Beyond />
        <WireframeSphere />
      </main>
      <Footer />
    </div>
  );
}
