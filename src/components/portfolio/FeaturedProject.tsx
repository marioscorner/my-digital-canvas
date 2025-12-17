import { ExternalLink, ArrowUpRight } from "lucide-react";

const FeaturedProject = () => {
  // Editable content
  const projectTitle = "Taekwondo Mario Gutiérrez";
  const projectDescription = "Web del gimnasio: disciplina, constancia y comunidad. Un proyecto que combina artes marciales con desarrollo web moderno.";
  
  // Placeholder URL - easy to edit
  const projectUrl = "https://TU-DOMINIO-AQUI.com";
  const isComingSoon = true;

  return (
    <div className="bento-card-featured group h-full">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="section-label">Proyecto destacado</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </div>
          
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {projectTitle}
          </h3>
          
          {isComingSoon && (
            <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Próximamente
            </span>
          )}
          
          <p className="text-sm text-muted-foreground">{projectDescription}</p>
        </div>

        <div className="mt-4">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent w-full justify-center"
            aria-label={`Visitar ${projectTitle}`}
          >
            <ExternalLink className="h-4 w-4" />
            Visitar web
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
