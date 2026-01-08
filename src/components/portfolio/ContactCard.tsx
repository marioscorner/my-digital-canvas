import { Mail, MapPin, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactCard = () => {
  const { t } = useLanguage();

  // Editable content
  const email = "hello@marioscorner.com";
  const location = "Madrid/Málaga (posibilidad de desplazamiento)";

  return (
    <div
      className="bento-card flex flex-col justify-between h-full"
      id="contact"
    >
      <div>
        <div className="mb-1 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="section-label">{t.contact.label}</span>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary cursor-default">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              {email}
            </div>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              {location}
            </p>
          </div>
        </div>
      </div>

      <a href={`mailto:${email}`} className="btn-accent mt-2">
        <Mail className="h-4 w-4 shrink-0" />
        <span className="whitespace-nowrap">{t.contact.sendEmail}</span>
      </a>
    </div>
  );
};

export default ContactCard;
