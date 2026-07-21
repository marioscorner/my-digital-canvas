import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";
import { formatCurrentExperiencePeriod, sortExperiences } from "@/lib/experience";

const ExperienceCard = () => {
  const { t, language } = useLanguage();
  const { content } = useContent();
  const workExperience = Array.isArray(content?.experience)
    ? sortExperiences(content.experience)
    : [];

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
                {job.position?.[language]}
              </p>
              <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
              <p className="text-xs text-muted-foreground">
                {job.isCurrent
                  ? formatCurrentExperiencePeriod(job.startDate, language)
                  : job.period?.[language]}
              </p>
            </div>
            {job.responsibilities?.[language]?.length > 0 && (
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
