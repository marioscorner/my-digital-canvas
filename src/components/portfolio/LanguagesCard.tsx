import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguagesCard = () => {
  const { t, language } = useLanguage();

  // Editable content - Languages
  const languages: Array<{
    name: { es: string; en: string };
    level: { es: string; en: string };
  }> = [
    {
      name: { es: "Español", en: "Spanish" },
      level: { es: "Nativo", en: "Native" },
    },
    {
      name: { es: "Inglés", en: "English" },
      level: { es: "C1", en: "C1" },
    },
    {
      name: { es: "Alemán", en: "German" },
      level: { es: "A1", en: "A1" },
    },
  ];

  return (
    <div className="bento-card flex flex-col h-full">
      <div className="mb-1 flex items-center gap-2">
        <Languages className="h-4 w-4 text-primary" />
        <span className="section-label">{t.languages.title}</span>
      </div>

      <div className="space-y-1">
        {languages.length > 0 ? (
          languages.map((lang, index) => (
            <div key={index} className="space-y-0.5">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">
                  {lang.name[language]}
                </p>
                <p className="text-sm text-muted-foreground">
                  {lang.level[language]}
                </p>
              </div>
              {index < languages.length - 1 && (
                <div className="border-t border-border pt-1" />
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">{t.languages.empty}</p>
        )}
      </div>
    </div>
  );
};

export default LanguagesCard;
