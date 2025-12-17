import { Mail, MapPin } from "lucide-react";

const ContactCard = () => {
  // Editable content
  const email = "tu-email@ejemplo.com";
  const location = "España";

  return (
    <div className="bento-card h-full" id="contact">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Let's start working together!
      </h2>
      
      <div className="space-y-4">
        <div>
          <span className="section-label">Contact Details</span>
          <a
            href={`mailto:${email}`}
            className="mt-2 flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4 text-muted-foreground" />
            {email}
          </a>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {location}
          </p>
        </div>

        <a
          href={`mailto:${email}`}
          className="btn-accent w-full justify-center"
        >
          <Mail className="h-4 w-4" />
          Enviar email
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
