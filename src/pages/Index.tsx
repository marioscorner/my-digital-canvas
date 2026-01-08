import HeroSection from "@/components/portfolio/HeroSection";
import AboutCard from "@/components/portfolio/AboutCard";
import TechnologiesCard from "@/components/portfolio/TechnologiesCard";
import TechStackCard from "@/components/portfolio/TechStackCard";
import ExperienceCard from "@/components/portfolio/ExperienceCard";
import FeaturedProject from "@/components/portfolio/FeaturedProject";
import ContactCard from "@/components/portfolio/ContactCard";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const Index = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    // URL base del sitio
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
    const ogImage = `${siteUrl}/MY_PHOTO.png`;

    // Actualizar title
    document.title = t.meta.title;

    // Función helper para actualizar o crear meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Meta tags básicos
    updateMetaTag("description", t.meta.description);
    updateMetaTag("author", "marioscorner");

    // Open Graph tags
    updateMetaTag("og:title", t.meta.title, true);
    updateMetaTag("og:description", t.meta.description, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:url", siteUrl, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:image:alt", t.meta.title, true);
    updateMetaTag("og:locale", language === "es" ? "es_ES" : "en_US", true);
    updateMetaTag("og:site_name", "marioscorner", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", t.meta.title);
    updateMetaTag("twitter:description", t.meta.description);
    updateMetaTag("twitter:image", ogImage);
    updateMetaTag("twitter:image:alt", t.meta.title);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", siteUrl);
  }, [t, language]);

  return (
    <>
      <main className="min-h-screen bg-dot-pattern flex flex-col relative">
        {/* Theme and Language Toggles - Fixed position */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center w-full px-4 py-4 sm:px-6 lg:px-6">
          {/* Bento Grid Layout Premium - 12 columns */}
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-3 items-stretch">
              {/* Columna Izquierda */}
              <div className="flex flex-col gap-3 h-full">
                {/* 1. Welcome / Hero */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "0ms", opacity: 0 }}
                >
                  <HeroSection />
                </div>

                {/* 2. About Me */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "100ms", opacity: 0 }}
                >
                  <AboutCard />
                </div>

                {/* 3. Featured Project + Contact (50% cada uno) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    className="w-full animate-fade-in"
                    style={{ animationDelay: "200ms", opacity: 0 }}
                  >
                    <FeaturedProject />
                  </div>
                  <div
                    className="w-full animate-fade-in"
                    style={{ animationDelay: "250ms", opacity: 0 }}
                  >
                    <ContactCard />
                  </div>
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="flex flex-col gap-3 h-full">
                {/* 1. Status */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "300ms", opacity: 0 }}
                >
                  <TechStackCard />
                </div>

                {/* 2. Tech Stack */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "400ms", opacity: 0 }}
                >
                  <TechnologiesCard />
                </div>

                {/* 3. Experience */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "500ms", opacity: 0 }}
                >
                  <ExperienceCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-3 mt-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6">
            <p className="text-center text-xs text-muted-foreground">
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
