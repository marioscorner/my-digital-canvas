import { useLanguage } from "@/contexts/LanguageContext";

const AboutCard = () => {
  const { t } = useLanguage();

  // Editable content
  const name = "Mario Gutiérrez González";
  const location = "España";

  return (
    <div className="bento-card h-full flex flex-col">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        {t.about.title}
      </h2>

      <div className="space-y-4 flex-1">
        <p className="text-sm text-muted-foreground">
          {t.about.greeting} {name}, {t.about.description} {location}.
        </p>

        <p className="text-sm text-muted-foreground">{t.about.hobbies}</p>
      </div>
    </div>
  );
};

export default AboutCard;
