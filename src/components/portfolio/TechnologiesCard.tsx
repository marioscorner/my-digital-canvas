import { Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TechnologiesCard = () => {
  const { t } = useLanguage();

  // Editable content - Technologies (4 per row)
  const techStack = [
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express",
    "React",
    "Angular",
    "Python",
    "Django",
    "FastAPI",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Linux",
    "Git",
  ];

  return (
    <div className="bento-card flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <Code2 className="h-4 w-4 text-primary" />
        <span className="section-label">{t.technologies.label}</span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground mb-2">
          {t.technologies.description}
        </p>

        <div className="grid grid-cols-2 gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center justify-center rounded-md bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologiesCard;

