import HeroSection from "@/components/portfolio/HeroSection";
import AboutCard from "@/components/portfolio/AboutCard";
import TechnologiesCard from "@/components/portfolio/TechnologiesCard";
import TechStackCard from "@/components/portfolio/TechStackCard";
import FeaturedProject from "@/components/portfolio/FeaturedProject";
import ContactCard from "@/components/portfolio/ContactCard";
import SpotifyCard from "@/components/portfolio/SpotifyCard";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const Index = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t.meta.description);
    }
  }, [t]);

  return (
    <>
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />

      <main className="min-h-screen bg-background flex flex-col relative">
        {/* Theme and Language Toggles - Fixed position */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center w-full px-4 py-6 sm:px-6 lg:px-8">
          {/* Bento Grid Layout - 2 rows */}
          <div className="w-full max-w-7xl">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
              {/* Fila 1: Hero (3 cols) + About (1 col) + Technologies (1 col) */}
              <div
                className="w-full md:col-span-3 lg:col-span-3 animate-fade-in"
                style={{ animationDelay: "0ms", opacity: 0 }}
              >
                <HeroSection />
              </div>

              <div
                className="w-full h-full md:col-span-1 lg:col-span-1 animate-fade-in flex"
                style={{ animationDelay: "100ms", opacity: 0 }}
              >
                <AboutCard />
              </div>

              <div
                className="w-full h-full md:col-span-1 lg:col-span-1 animate-fade-in flex"
                style={{ animationDelay: "150ms", opacity: 0 }}
              >
                <TechnologiesCard />
              </div>

              {/* Fila 2: Contact + Tech Stack + Featured + Spotify */}
              <div
                className="w-full md:col-span-1 lg:col-span-1 animate-fade-in flex"
                style={{ animationDelay: "200ms", opacity: 0 }}
              >
                <ContactCard />
              </div>

              <div
                className="w-full md:col-span-1 lg:col-span-1 animate-fade-in flex"
                style={{ animationDelay: "250ms", opacity: 0 }}
              >
                <TechStackCard />
              </div>

              <div
                className="w-full md:col-span-1 lg:col-span-1 animate-fade-in flex"
                style={{ animationDelay: "300ms", opacity: 0 }}
              >
                <FeaturedProject />
              </div>

              <div
                className="w-full md:col-span-1 lg:col-span-2 animate-fade-in flex"
                style={{ animationDelay: "350ms", opacity: 0 }}
              >
                <SpotifyCard />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-6 mt-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} · {t.footer.madeWith}{" "}
              <span className="text-primary">♥</span> {t.footer.by} {t.footer.name}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
