import { User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutCard = () => {
  const { t } = useLanguage();

  return (
    <div className="bento-card flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <User className="h-4 w-4 text-primary" />
        <span className="section-label">{t.about.label}</span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.about.paragraph1}
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.about.paragraph2}
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.about.paragraph3}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
