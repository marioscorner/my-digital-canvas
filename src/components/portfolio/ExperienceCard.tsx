import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ExperienceCard = () => {
  const { t, language } = useLanguage();

  // Editable content - Work Experience
  const workExperience = [
    {
      company: "Quai Technologies",
      position: {
        es: "Prácticas de desarrollo full stack",
        en: "Full stack development internship",
      },
      period: {
        es: "Noviembre 2025 – Diciembre 2025",
        en: "November 2025 – December 2025",
      },
    },
  ];

  return (
    <div className="bento-card flex flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" />
        <span className="section-label">{t.techStack.experience}</span>
      </div>

      <div className="space-y-4">
        {workExperience.map((job, index) => (
          <div key={index} className="space-y-1">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                {job.position[language]}
              </p>
              <p className="text-sm text-muted-foreground">
                {job.company}
              </p>
              <p className="text-sm text-muted-foreground">
                {job.period[language]}
              </p>
            </div>
            {index < workExperience.length - 1 && (
              <div className="border-t border-border pt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;

