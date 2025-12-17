const AboutCard = () => {
  // Editable content
  const name = "Tu Nombre";
  const location = "España";
  const description = "Desarrollador frontend especializado en crear experiencias digitales únicas.";
  
  const techStack = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Next.js",
  ];

  const hobbies = "Además de programar, me apasiona el diseño, las artes marciales y la fotografía. Creo firmemente en la disciplina como motor del éxito.";

  return (
    <div className="bento-card h-full">
      <h2 className="mb-4 text-lg font-semibold text-foreground">About me</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Hola, soy {name}, un desarrollador de software de {location}.
        </p>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            Mis herramientas principales:
          </p>
          <ul className="space-y-1.5">
            {techStack.map((tech) => (
              <li key={tech} className="tech-tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">{hobbies}</p>
      </div>
    </div>
  );
};

export default AboutCard;
