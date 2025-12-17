export type Language = "es" | "en";

export const translations = {
  es: {
    // Hero Section
    hero: {
      welcome: "welcome",
      greeting: "Hola, soy",
      intro:
        "un desarrollador de software con enfoque en la experiencia de usuario, animaciones e interacciones.",
      cta: "No dudes en contactarme si tienes algún proyecto en mente, o simplemente para saludar.",
      downloadCV: "Descargar CV",
    },
    // About Card
    about: {
      title: "About me",
      greeting: "Hola, soy",
      description: "un desarrollador de software de",
      hobbies:
        "Además de programar, me apasiona el diseño, las artes marciales y la fotografía. Creo firmemente en la disciplina como motor del éxito.",
    },
    // Technologies Card
    technologies: {
      label: "Tech Stack",
      title: "Tecnologías",
      description:
        "Herramientas y tecnologías con las que trabajo habitualmente.",
      mainTools: "Mis herramientas principales:",
    },
    // Contact Card
    contact: {
      title: "Let's start working together!",
      contactDetails: "Contact Details",
      sendEmail: "Enviar email",
    },
    // Tech Stack Card (Status/Experience)
    techStack: {
      status: "Status",
      available: "Disponible para proyectos",
      statusDetail: "Actualmente trabajando en proyectos freelance",
      experience: "Experiencia",
    },
    // Featured Project
    featured: {
      label: "Proyecto destacado",
      comingSoon: "Próximamente",
      visitWeb: "Visitar web",
    },
    // Spotify Card
    spotify: {
      label: "Music",
      description:
        "Una selección de canciones que me inspiran y acompañan mientras programo.",
      openPlaylist: "Abrir en Spotify",
    },
    // Footer
    footer: {
      madeWith: "Hecho con",
      by: "por",
      name: "marioscorner",
    },
    // Meta
    meta: {
      title: "marioscorner | Desarrollador Web",
      description:
        "Portfolio personal de marioscorner. Programador Full Stack.",
    },
    // CV
    cv: {
      url: "/cv-es.pdf",
    },
  },
  en: {
    // Hero Section
    hero: {
      welcome: "welcome",
      greeting: "Hi, I'm",
      intro:
        "a software developer focused on user experience, animations and interactions.",
      cta: "Feel free to contact me if you have a project in mind, or just to say hello.",
      downloadCV: "Download CV",
    },
    // About Card
    about: {
      title: "About me",
      greeting: "Hi, I'm",
      description: "a software developer from",
      hobbies:
        "Besides programming, I'm passionate about design, martial arts and photography. I firmly believe in discipline as the engine of success.",
    },
    // Technologies Card
    technologies: {
      label: "Tech Stack",
      title: "Technologies",
      description: "Tools and technologies I work with regularly.",
      mainTools: "My main tools:",
    },
    // Contact Card
    contact: {
      title: "Let's start working together!",
      contactDetails: "Contact Details",
      sendEmail: "Send email",
    },
    // Tech Stack Card (Status/Experience)
    techStack: {
      status: "Status",
      available: "Available for projects",
      statusDetail: "Currently working on freelance projects",
      experience: "Experience",
    },
    // Featured Project
    featured: {
      label: "Featured project",
      comingSoon: "Coming soon",
      visitWeb: "Visit website",
    },
    // Spotify Card
    spotify: {
      label: "Music",
      description:
        "A selection of songs that inspire me and accompany me while coding.",
      openPlaylist: "Open on Spotify",
    },
    // Footer
    footer: {
      madeWith: "Made with",
      by: "by",
      name: "marioscorner",
    },
    // Meta
    meta: {
      title: "marioscorner | Full Stack Developer",
      description: "Personal portfolio of marioscorner. Full Stack Developer.",
    },
    // CV
    cv: {
      url: "/cv-en.pdf",
    },
  },
} as const;
