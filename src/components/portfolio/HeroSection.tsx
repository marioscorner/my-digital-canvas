import { Github, Linkedin, Dribbble } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const HeroSection = () => {
  // Editable content
  const name = "Tu Nombre";
  const intro = "un desarrollador de software con enfoque en la experiencia de usuario, animaciones e interacciones.";
  const cta = "No dudes en contactarme si tienes algún proyecto en mente, o simplemente para saludar.";
  const profileImage = avatarPlaceholder;

  // Editable links
  const githubUrl = "https://github.com/tu-usuario";
  const linkedinUrl = "https://linkedin.com/in/tu-usuario";
  const dribbbleUrl = "https://dribbble.com/tu-usuario";

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

        {/* Social Icons */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={dribbbleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Dribbble"
          >
            <Dribbble className="h-5 w-5" />
          </a>

          <a href="#contact" className="btn-primary ml-2">
            Contactar
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
