import { Github, Linkedin, Instagram, Twitter, FileText } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const HeroSection = () => {
  // Editable content
  const name = "Tu Nombre";
  const intro = "un desarrollador de software con enfoque en la experiencia de usuario, animaciones e interacciones.";
  const cta = "No dudes en contactarme si tienes algún proyecto en mente, o simplemente para saludar.";
  const profileImage = avatarPlaceholder;

  // Editable links
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/tu-usuario", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com/in/tu-usuario", icon: Linkedin },
    { name: "Instagram", url: "https://instagram.com/tu-usuario", icon: Instagram },
    { name: "Twitter", url: "https://x.com/tu-usuario", icon: Twitter },
  ];
  const cvUrl = "/cv.pdf";

  return (
    <div className="bento-card flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-4">
        <span className="section-label">welcome</span>
        
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-foreground">
            Hola, soy <span className="font-semibold">{name}</span>,{" "}
            <span className="text-muted-foreground">{intro}</span>
          </p>
          
          <p className="text-sm text-muted-foreground">{cta}</p>
        </div>

        {/* Social Icons + CV */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label={link.name}
              title={link.name}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}

          <a href={cvUrl} download className="btn-primary ml-2">
            <FileText className="h-4 w-4" />
            Descargar CV
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
