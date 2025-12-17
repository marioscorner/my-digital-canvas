import { ExternalLink, Star } from "lucide-react";

const FeaturedProject = () => {
  // Editable content
  const projectTitle = "Taekwondo Mario Gutiérrez";
  const projectDescription = [
    "Sitio web oficial del gimnasio de Taekwondo, diseñado para reflejar los valores de disciplina, constancia y comunidad que definen nuestra práctica.",
    "Un proyecto que combina mi pasión por las artes marciales con mis habilidades de desarrollo web, creando una plataforma moderna para conectar con estudiantes y promover el deporte."
  ];
  
  // Placeholder URL - easy to edit
  const projectUrl = "https://TU-DOMINIO-AQUI.com";
  const isComingSoon = true; // Set to false when you have your domain

  return (
    <article className="card-featured group">
      {/* Featured badge */}
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
        <span className="text-xs font-medium text-primary">Proyecto destacado</span>
      </div>

      <div className="space-y-5 pt-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground">
            {projectTitle}
          </h3>
          {isComingSoon && (
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              Próximamente
            </span>
          )}
        </div>

        <div className="space-y-3">
          {projectDescription.map((text, index) => (
            <p key={index} className="text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          ))}
        </div>

        <div className="pt-2">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
            aria-label={`Visitar ${projectTitle}`}
          >
            <ExternalLink className="h-4 w-4" />
            Visitar web del gimnasio
          </a>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
};

export default FeaturedProject;
