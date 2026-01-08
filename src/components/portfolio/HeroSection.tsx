import { FileText, Hand } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter, FaSpotify } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  // Editable content
  const name = "Mario Gutiérrez González";

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
    { name: "Spotify", url: "https://open.spotify.com/playlist/3PgjqksPrmqU4KxsISTjoV?si=312ac94e52624836", icon: FaSpotify },
  ];

  return (
    <div className="bento-card flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <Hand className="h-4 w-4 text-primary" />
          <span className="section-label">{t.hero.welcome}</span>
        </div>

        <div className="space-y-2">
          <p className="text-lg leading-relaxed text-foreground">
            {t.hero.greeting} <span className="font-semibold">{t.hero.name}</span>, {t.hero.intro}
          </p>

          <p className="text-sm text-muted-foreground">{t.hero.cta}</p>
        </div>

        {/* Social Icons + CV */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
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
                <IconComponent className="h-4 w-4" />
              </a>
            );
          })}

          <a href={t.cv.url} download className="btn-primary ml-1">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span className="whitespace-nowrap text-sm">{t.hero.downloadCV}</span>
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
              alt={`Foto de ${name}`}
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
