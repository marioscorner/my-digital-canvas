import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedProject = () => {
  const { t, language } = useLanguage();
  
  // Editable content
  const projectTitle = "Taekwondo Mario Gutiérrez";
  const projectDescription = {
    es: "Web del gimnasio: disciplina, constancia y comunidad. Un proyecto que combina artes marciales con desarrollo web moderno.",
    en: "Gym website: discipline, consistency and community. A project that combines martial arts with modern web development.",
  };
  
  // Placeholder URL - easy to edit
  const projectUrl = "https://TU-DOMINIO-AQUI.com";
  const isComingSoon = true;

  return (
    <div className="bento-card-featured group h-full">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="section-label">{t.featured.label}</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </div>
          
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {projectTitle}
          </h3>
          
          {isComingSoon && (
            <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {t.featured.comingSoon}
            </span>
          )}
          
          <p className="text-sm text-muted-foreground">
            {language === "es" ? projectDescription.es : projectDescription.en}
          </p>
        </div>

        <div className="mt-4">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent w-full justify-center"
            aria-label={`${t.featured.visitWeb} ${projectTitle}`}
          >
            <ExternalLink className="h-4 w-4" />
            {t.featured.visitWeb}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
