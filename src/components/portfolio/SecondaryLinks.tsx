import { Github, FileText, Download } from "lucide-react";

const SecondaryLinks = () => {
  // Editable links
  const githubUrl = "https://github.com/tu-usuario";
  const cvUrl = "/cv.pdf"; // Place your CV in the public folder

  return (
    <div className="card-secondary">
      <h3 className="section-title mb-4">Enlaces</h3>
      
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1"
          aria-label="Ver perfil de GitHub"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        
        <a
          href={cvUrl}
          download
          className="btn-secondary flex-1"
          aria-label="Descargar CV en PDF"
        >
          <FileText className="h-4 w-4" />
          Descargar CV
          <Download className="h-3.5 w-3.5 opacity-50" />
        </a>
      </div>
    </div>
  );
};

export default SecondaryLinks;
