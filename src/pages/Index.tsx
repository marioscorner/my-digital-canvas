import HeroSection from "@/components/portfolio/HeroSection";
import AboutCard from "@/components/portfolio/AboutCard";
import TechnologiesCard from "@/components/portfolio/TechnologiesCard";
import StatusCard from "@/components/portfolio/StatusCard";
import ExperienceCard from "@/components/portfolio/ExperienceCard";
import CertificationsCard from "@/components/portfolio/CertificationsCard";
import LanguagesCard from "@/components/portfolio/LanguagesCard";
import ProjectsCard from "@/components/portfolio/ProjectsCard";
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
    const updateMetaTag = (
      property: string,
      content: string,
      isProperty = false
    ) => {
      const selector = isProperty
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
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
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", siteUrl);
  }, [t, language]);

  return (
    <>
      <main className="flex-1 bg-dot-pattern flex flex-col relative">
        {/* Theme and Language Toggles - Fixed position */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center w-full px-4 py-2 sm:px-6 lg:px-8">
          {/* Bento Grid Layout - 3 columns */}
          <div className="w-full max-w-[90rem]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-stretch">
              {/* Columna 1 - Contenido Principal */}
              <div className="flex flex-col gap-2 h-full">
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

                {/* 3. Projects */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "200ms", opacity: 0 }}
                >
                  <ProjectsCard />
                </div>
              </div>

              {/* Columna 2 - Status, Contacto, Proyecto Destacado e Idiomas */}
              <div className="flex flex-col gap-2 h-full">
                {/* 1. Status */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "300ms", opacity: 0 }}
                >
                  <StatusCard />
                </div>

                {/* 2. Contact */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "400ms", opacity: 0 }}
                >
                  <ContactCard />
                </div>

                {/* 3. Featured Project */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "500ms", opacity: 0 }}
                >
                  <FeaturedProject />
                </div>

                {/* 4. Languages */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "600ms", opacity: 0 }}
                >
                  <LanguagesCard />
                </div>
              </div>

              {/* Columna 3 - Información Profesional */}
              <div className="flex flex-col gap-2 h-full">
                {/* 1. Tech Stack */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "700ms", opacity: 0 }}
                >
                  <TechnologiesCard />
                </div>

                {/* 2. Experience */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "800ms", opacity: 0 }}
                >
                  <ExperienceCard />
                </div>

                {/* 3. Certifications */}
                <div
                  className="w-full animate-fade-in"
                  style={{ animationDelay: "900ms", opacity: 0 }}
                >
                  <CertificationsCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-2 mt-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} · {t.footer.madeWith}{" "}
              <span className="text-primary">♥</span> {t.footer.by}{" "}
              {t.footer.name}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
