import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const ProfileSection = () => {
  // Editable content
  const profileImage = avatarPlaceholder;
  const name = "Tu Nombre";
  const tagline = "Desarrollador & Emprendedor";
  
  const aboutMe = [
    "Soy un profesional apasionado por la tecnología y el desarrollo web. Me especializo en crear soluciones digitales que combinan funcionalidad con diseño elegante.",
    "Con experiencia en múltiples tecnologías y frameworks modernos, busco siempre aprender y mejorar constantemente mis habilidades.",
    "Fuera del código, practico artes marciales y creo firmemente en la disciplina como motor del éxito personal y profesional."
  ];

  const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Diseño UI/UX",
    "Gestión de proyectos"
  ];

  return (
    <section className="space-y-8">
      {/* Avatar */}
      <div className="flex flex-col items-center lg:items-start">
        <div className="relative">
          <div className="h-40 w-40 overflow-hidden rounded-2xl border-2 border-border bg-secondary">
            <img
              src={profileImage}
              alt={`Foto de ${name}`}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Subtle accent decoration */}
          <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary/20" />
        </div>
        
        <div className="mt-6 text-center lg:text-left">
          <h1 className="text-2xl font-bold text-foreground">{name}</h1>
          <p className="mt-1 text-muted-foreground">{tagline}</p>
        </div>
      </div>

      {/* About Me */}
      <div className="space-y-4">
        <h2 className="section-title">Sobre mí</h2>
        <div className="space-y-4">
          {aboutMe.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm leading-relaxed text-muted-foreground"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Skills Tags */}
      <div className="space-y-4">
        <h2 className="section-title">Habilidades</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="tag transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
