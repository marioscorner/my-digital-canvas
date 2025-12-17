import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TechStackCard = () => {
  const { t, language } = useLanguage();

  // Editable content - Work Experience
  const workExperience = [
    {
      company: "Empresa 1",
      position: {
        es: "Desarrollador Full Stack",
        en: "Full Stack Developer",
      },
      period: {
        es: "2023 - Presente",
        en: "2023 - Present",
      },
    },
    {
      company: "Empresa 2",
      position: {
        es: "Desarrollador Frontend",
        en: "Frontend Developer",
      },
      period: {
        es: "2021 - 2023",
        en: "2021 - 2023",
      },
    },
  ];

  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex-1">
        <div className="mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <span className="section-label">{t.techStack.status}</span>
        </div>
        
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-foreground">
              {t.techStack.available}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{t.techStack.statusDetail}</p>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            {t.techStack.experience}
          </h3>
          <div className="space-y-4">
            {workExperience.map((job, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {job.position[language]}
                    </p>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {job.period[language]}
                  </span>
                </div>
                {index < workExperience.length - 1 && (
                  <div className="border-t border-border pt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackCard;
