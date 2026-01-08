export type Language = "es" | "en";

export const translations = {
  es: {
    // Hero Section
    hero: {
      welcome: "welcome",
      greeting: "Hola, soy",
      name: 'Mario "marioscorner" Gutiérrez',
      intro: "desarrollador full stack.",
      cta: "Aquí encontrarás mis redes, mi GitHub y un enlace para descargar mi CV.",
      downloadCV: "Descargar CV",
    },
    // About Card
    about: {
      label: "About",
      title: "About me",
      paragraph1:
        "Soy Mario Gutiérrez González, desarrollador de software en España. Vengo del mundo audiovisual, pero la programación fue ganando terreno hasta convertirse en mi camino profesional.",
      paragraph2:
        "Más allá del código, me encanta leer, la música, viajar y todo lo que tenga un punto friki.",
      paragraph3:
        "También soy muy deportista. Practico Taekwondo desde siempre, tengo mi propio gimnasio y estoy a punto de convertirme en Maestro Nacional.",
    },
    // Technologies Card
    technologies: {
      label: "Tech Stack",
      title: "Tecnologías",
      description: "Trabajo habitualmente con:",
    },
    // Contact Card
    contact: {
      label: "Contact",
      title: "¡Vamos a trabajar juntos!",
      contactDetails: "Contact Details",
      sendEmail: "Enviar email",
    },
    // Tech Stack Card (Status/Experience)
    techStack: {
      status: "Status",
      available: "Buscando trabajo",
      statusDetail: "Actualmente estoy buscando una oportunidad para seguir creciendo como desarrollador.",
      experience: "Experiencia",
    },
    // Featured Project
    featured: {
      label: "Proyecto destacado",
      comingSoon: "Próximamente",
      visitWeb: "Visitar web",
      description:
        "Este proyecto nace como mi TFM y como respuesta a una necesidad real: mejorar la comunicación entre alumnos y profesores mediante un chat y centralizar toda la gestión y documentación de un gimnasio de Taekwondo.",
      cta: "Te invito a descubrirlo.",
    },
    // Spotify Card
    spotify: {
      label: "Music",
      title: "¿Quién es marioscorner?",
      description:
        "Creo que la música dice mucho de quiénes somos. Estas son las 10 canciones que mejor me definen.",
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
      name: 'Mario "marioscorner" Gutiérrez',
      intro: "full stack developer.",
      cta: "Here you'll find my social networks, GitHub and my CV.",
      downloadCV: "Download CV",
    },
    // About Card
    about: {
      label: "About",
      title: "About me",
      paragraph1:
        "I'm Mario Gutiérrez González, a software developer in Spain. I come from the audiovisual world, but programming gradually gained ground until it became my professional path.",
      paragraph2:
        "Beyond code, I love reading, music, traveling and everything that has a geeky touch.",
      paragraph3:
        "I'm also very athletic. I've been practicing Taekwondo forever, I have my own gym and I'm about to become a National Master.",
    },
    // Technologies Card
    technologies: {
      label: "Tech Stack",
      title: "Technologies",
      description: "I usually work with:",
    },
    // Contact Card
    contact: {
      label: "Contact",
      title: "Let's work together!",
      contactDetails: "Contact Details",
      sendEmail: "Send email",
    },
    // Tech Stack Card (Status/Experience)
    techStack: {
      status: "Status",
      available: "Looking for work",
      statusDetail: "I'm currently looking for an opportunity to keep growing as a developer.",
      experience: "Experience",
    },
    // Featured Project
    featured: {
      label: "Featured project",
      comingSoon: "Coming soon",
      visitWeb: "Visit website",
      description:
        "This project was born as my Master's Thesis and as a response to a real need: improve communication between students and teachers through a chat and centralize all the management and documentation of a Taekwondo gym.",
      cta: "I invite you to discover it.",
    },
    // Spotify Card
    spotify: {
      label: "Music",
      title: "Who is marioscorner?",
      description:
        "I believe music says a lot about who we are. These are the 10 songs that best define me.",
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
