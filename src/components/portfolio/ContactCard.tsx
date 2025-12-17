import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactCard = () => {
  const { t } = useLanguage();

  // Editable content
  const email = "mariogugon@outlook.com";
  const location = "España";

  return (
    <div className="bento-card flex flex-col justify-between" id="contact">
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          {t.contact.title}
        </h2>

        <div className="space-y-3">
          <div>
            <span className="section-label">{t.contact.contactDetails}</span>
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
        </div>
      </div>

      <a
        href={`mailto:${email}`}
        className="btn-accent w-full justify-center mt-4"
      >
        <Mail className="h-4 w-4" />
        {t.contact.sendEmail}
      </a>
    </div>
  );
};

export default ContactCard;
