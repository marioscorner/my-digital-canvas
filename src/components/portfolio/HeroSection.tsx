import { FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  // Editable content
  const name = "Mario Gutiérrez González";
  const profileImage = avatarPlaceholder;

  // Editable links
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/marioscorner", icon: FaGithub },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/marioscorner",
      icon: FaLinkedin,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/marioscorner",
      icon: FaInstagram,
    },
    { name: "Twitter", url: "https://x.com/elrincondehoid", icon: FaXTwitter },
  ];

  return (
    <div className="bento-card flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-4">
        <span className="section-label">{t.hero.welcome}</span>

        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-foreground">
            {t.hero.greeting} <span className="font-semibold">{name}</span>,{" "}
            <span className="text-muted-foreground">{t.hero.intro}</span>
          </p>

          <p className="text-sm text-muted-foreground">{t.hero.cta}</p>
        </div>

        {/* Social Icons + CV */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label={link.name}
                title={link.name}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}

          <a href={t.cv.url} download className="btn-primary ml-2">
            <FileText className="h-4 w-4" />
            {t.hero.downloadCV}
          </a>
        </div>
      </div>

      {/* Avatar */}
      <div className="shrink-0">
        <div className="h-36 w-36 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 sm:h-44 sm:w-44">
          <img
            src={profileImage}
            alt={`Foto de ${name}`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
