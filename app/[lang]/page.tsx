import { About } from "@/components/About";
import { ChatBot } from "@/components/ChatBot";
import { Contact } from "@/components/Contact";
import { DesignShowcase } from "@/components/DesignShowcase";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImageBand } from "@/components/ImageBand";
import { SelectedWork } from "@/components/SelectedWork";
import { Skills } from "@/components/Skills";
import { Statement } from "@/components/Statement";
import type { Lang } from "@/lib/i18n";

// Récit : identité → projets → expertise → stack → parcours → design → formation → contact.
export default function Home({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  return (
    <>
      <Header lang={lang} home />
      <main id="main-content">
        <Hero lang={lang} />
        {/* Le reste de la page glisse sur le hero comme une feuille aux coins arrondis. */}
        <div className="relative z-10 -mt-10 overflow-hidden rounded-t-[2rem] bg-background sm:-mt-12 sm:rounded-t-[2.5rem]">
          <About lang={lang} />
          <ImageBand lang={lang} />
          <SelectedWork lang={lang} />
          <Expertise lang={lang} />
          <Skills lang={lang} />
          <Experience lang={lang} />
          <DesignShowcase lang={lang} />
          <Education lang={lang} />
          <Statement lang={lang} />
          <Contact lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
      <ChatBot lang={lang} />
    </>
  );
}
