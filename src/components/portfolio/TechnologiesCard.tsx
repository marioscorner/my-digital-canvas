import { Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TechnologiesCard = () => {
  const { t } = useLanguage();

  // Editable content - Technologies
  const techStack = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Next.js",
  ];

  return (
    <div className="bento-card h-full flex flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Code2 className="h-5 w-5 text-primary" />
        <span className="section-label">{t.technologies.label}</span>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-foreground">
        {t.technologies.title}
      </h2>

      <div className="space-y-4 flex-1">
        <p className="text-sm text-muted-foreground">
          {t.technologies.description}
        </p>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            {t.technologies.mainTools}
          </p>
          <ul className="space-y-1.5">
            {techStack.map((tech) => (
              <li key={tech} className="tech-tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesCard;

