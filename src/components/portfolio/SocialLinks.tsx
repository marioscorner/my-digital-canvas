import { Github, Linkedin, Instagram, Twitter, FileText } from "lucide-react";

const SocialLinks = () => {
  // Editable links
  const links = [
    { name: "GitHub", url: "https://github.com/tu-usuario", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com/in/tu-usuario", icon: Linkedin },
    { name: "Instagram", url: "https://instagram.com/tu-usuario", icon: Instagram },
    { name: "Twitter", url: "https://x.com/tu-usuario", icon: Twitter },
  ];

  const cvUrl = "/cv.pdf";

  return (
    <div className="bento-card">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {links.map((link) => (
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
        </div>

        <a href={cvUrl} download className="btn-primary">
          <FileText className="h-4 w-4" />
          Descargar CV
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
