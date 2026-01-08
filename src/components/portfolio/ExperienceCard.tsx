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
      responsibilities: {
        es: [
          "Desarrollo de la aplicación APPUNTO",
          "Implementación de WAHA para poder utilizar Whatsapp en tiempo real desde la aplicación.",
          "Trabajo con BB.DD., tanto diseño como mantenimiento.",
          "Colaboración con el CTO para el diseño de producto, buscando las mejores líneas de desarrollo y evitar problemas futuros.",
        ],
        en: [
          "Development of the app APPUNTO",
          "Implementing real time Whatsapp messaging in the app using WAHA.",
          "Work with Databases, both designing and maintaining them.",
          "Help the CTO in product design, looking to solve problems before we encountered them.",
        ],
      },
    },
  ];

  return (
    <div className="bento-card flex flex-col">
      <div className="mb-1 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" />
        <span className="section-label">{t.techStack.experience}</span>
      </div>

      <div className="space-y-1">
        {workExperience.map((job, index) => (
          <div key={index} className="space-y-1">
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-foreground">
                {job.position[language]}
              </p>
              <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
              <p className="text-xs text-muted-foreground">
                {job.period[language]}
              </p>
            </div>
            {job.responsibilities && (
              <div className="mt-2 space-y-1">
                {job.responsibilities[language].map((responsibility, idx) => (
                  <p
                    key={idx}
                    className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5"
                  >
                    <span className="text-primary shrink-0 text-sm">·</span>
                    <span>{responsibility}</span>
                  </p>
                ))}
              </div>
            )}
            {index < workExperience.length - 1 && (
              <div className="border-t border-border pt-1 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
