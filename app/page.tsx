import { About } from "@/components/About";
import { ChatBot } from "@/components/ChatBot";
import { Contact } from "@/components/Contact";
import { DesignShowcase } from "@/components/DesignShowcase";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { SelectedWork } from "@/components/SelectedWork";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Statement } from "@/components/Statement";

// Récit : identité → produits → savoir-faire → parcours → méthode → design → contact.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <SelectedWork />
        <Services />
        <Skills />
        <Experience />
        <Process />
        <DesignShowcase />
        <Statement />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
