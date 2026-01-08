import { ExternalLink, Code } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectsCard = () => {
  const { t, language } = useLanguage();

  // Editable content - GitHub projects summary
  const githubUrl = "https://github.com/marioscorner";

  return (
    <div className="bento-card flex flex-col justify-between h-full">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          <span className="section-label">{t.projects.title}</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          {t.projects.description}
        </p>
      </div>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        aria-label={t.projects.visitGitHub}
      >
        <FaGithub className="h-4 w-4 shrink-0" />
        <span className="whitespace-nowrap">{t.projects.visitGitHub}</span>
      </a>
    </div>
  );
};

export default ProjectsCard;
