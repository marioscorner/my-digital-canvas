import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CertificationsCard = () => {
  const { t, language } = useLanguage();

  // Editable content - Certifications
  const certifications: Array<{
    name: { es: string; en: string };
    issuer?: { es: string; en: string };
    date?: { es: string; en: string };
    url?: string;
  }> = [
    {
      name: {
        es: "Certificate in Advanced English (CAE)",
        en: "Certificate in Advanced English (CAE)",
      },
      issuer: {
        es: "Cambridge Assessment English",
        en: "Cambridge Assessment English",
      },
    },
    {
      name: {
        es: "Curso Universitario de Programación con Python",
        en: "University Course in Python Programming",
      },
      issuer: {
        es: "Universidad Europea de Madrid",
        en: "European University of Madrid",
      },
    },
  ];

  return (
    <div className="bento-card flex flex-col h-full">
      <div className="mb-1 flex items-center gap-2">
        <Award className="h-4 w-4 text-primary" />
        <span className="section-label">{t.certifications.title}</span>
      </div>

      <div className="space-y-1">
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <div key={index} className="space-y-1">
              <div className="flex flex-col gap-1">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {cert.name[language]}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">
                    {cert.name[language]}
                  </p>
                )}
                {cert.issuer && (
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer[language]}
                  </p>
                )}
                {cert.date && (
                  <p className="text-sm text-muted-foreground">
                    {cert.date[language]}
                  </p>
                )}
              </div>
              {index < certifications.length - 1 && (
                <div className="border-t border-border pt-1" />
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            {t.certifications.empty}
          </p>
        )}
      </div>
    </div>
  );
};

export default CertificationsCard;
