import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { ChatBot } from "@/components/ChatBot";
import { Contact } from "@/components/Contact";
import { DesignShowcase } from "@/components/DesignShowcase";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Preloader } from "@/components/Preloader";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Sidebar } from "@/components/Sidebar";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <Sidebar>
      <Preloader />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Process />
        <Projects />
        <DesignShowcase />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </Sidebar>
  );
}
