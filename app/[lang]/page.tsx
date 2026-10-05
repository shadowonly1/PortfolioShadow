import { About } from "@/components/About";
import { ChatBot } from "@/components/ChatBot";
import { Contact } from "@/components/Contact";
import { DesignShowcase } from "@/components/DesignShowcase";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImageBand } from "@/components/ImageBand";
import { Process } from "@/components/Process";
import { SelectedWork } from "@/components/SelectedWork";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Statement } from "@/components/Statement";
import type { Lang } from "@/lib/i18n";

// Récit : identité → produits → savoir-faire → parcours → méthode → design → contact.
export default function Home({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  return (
    <>
      <Header lang={lang} home />
      <main id="main-content">
        <Hero lang={lang} />
        <About lang={lang} />
        <ImageBand lang={lang} />
        <SelectedWork lang={lang} />
        <Services lang={lang} />
        <Skills lang={lang} />
        <Experience lang={lang} />
        <Process lang={lang} />
        <DesignShowcase lang={lang} />
        <Statement lang={lang} />
        <Education lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <ChatBot lang={lang} />
    </>
  );
}
