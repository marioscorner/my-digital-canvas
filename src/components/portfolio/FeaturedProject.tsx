import { ExternalLink, FolderOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedProject = () => {
  const { t } = useLanguage();

  // Editable content
  const projectTitle = "Taekwondo Mario Gutiérrez";

  // GitHub repository URL
  const projectUrl = "https://github.com/marioscorner";
  const isComingSoon = false;

  return (
    <div className="bento-card-featured group flex flex-col justify-between h-full">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-primary" />
          <span className="section-label">{t.featured.label}</span>
        </div>

        <h3 className="mb-1 text-base font-semibold text-primary">
          {projectTitle}
        </h3>

        {isComingSoon && (
          <span className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {t.featured.comingSoon}
          </span>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.featured.description}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {t.featured.description2}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{t.featured.cta}</p>
      </div>

      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-2"
        aria-label={`${t.featured.visitWeb} ${projectTitle}`}
      >
        <ExternalLink className="h-4 w-4 shrink-0" />
        <span className="whitespace-nowrap">{t.featured.visitWeb}</span>
      </a>
    </div>
  );
};

export default FeaturedProject;
