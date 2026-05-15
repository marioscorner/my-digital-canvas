import { FileText, Hand } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";

const HeroSection = () => {
  const { language } = useLanguage();
  const { content } = useContent();

  if (!content) {
    return <div className="bento-card">Loading...</div>;
  }

  const heroData = content.hero?.[language] || {};
  const socialLinks = content.social || [];

  // Get CV URL from content or fallback
  const cvUrl = language === "es" ? "/cv-es.pdf" : "/cv-en.pdf";

  return (
    <div className="bento-card flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Hand className="h-4 w-4 text-primary" />
          <span className="section-label">welcome</span>
        </div>

        <div className="space-y-1">
          <p className="text-lg leading-relaxed text-foreground">
            {heroData.greeting} <span className="font-semibold">{heroData.name}</span>, {heroData.intro}
          </p>

          <p className="text-sm text-muted-foreground">{heroData.cta}</p>
        </div>

        {/* Social Icons + CV */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {socialLinks.map((link) => {
            const IconComponent = link.icon === "FaLinkedin" ? FaLinkedin : FaLinkedin;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label={link.name}
                title={link.name}
              >
                <IconComponent className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{link.name}</span>
              </a>
            );
          })}

          <a href={cvUrl} download className="btn-primary">
            <FileText className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">{heroData.downloadCV}</span>
          </a>
        </div>
      </div>

      {/* Avatar */}
      <div className="shrink-0">
        <div className="h-28 w-28 overflow-hidden rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 sm:h-32 sm:w-32">
          <picture>
            <source srcSet="/MY_PHOTO.webp" type="image/webp" />
            <img
              src="/MY_PHOTO.png"
              alt="Photo"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
