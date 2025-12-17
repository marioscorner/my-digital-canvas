import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";

const ContactSection = () => {
  // Editable contact info
  const email = "tu-email@ejemplo.com";
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/tu-usuario",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/tu-usuario",
      icon: Linkedin,
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/tu-usuario",
      icon: Twitter,
    },
  ];

  return (
    <section className="card-secondary">
      <h3 className="section-title mb-5">Contacto</h3>
      
      <div className="flex flex-wrap items-center gap-3">
        {/* Social Links */}
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-social"
            aria-label={`Visitar ${social.name}`}
            title={social.name}
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}

        {/* Email - slightly more prominent */}
        <a
          href={`mailto:${email}`}
          className="btn-secondary ml-auto"
          aria-label="Enviar email"
        >
          <Mail className="h-4 w-4" />
          Enviar email
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
