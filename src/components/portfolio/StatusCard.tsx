import { UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const StatusCard = () => {
  const { t } = useLanguage();

  return (
    <div className="bento-card flex flex-col">
      <div className="mb-1 flex items-center gap-2">
        <UserCheck className="h-4 w-4 text-primary" />
        <span className="section-label">{t.techStack.status}</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-foreground">
            {t.techStack.available}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t.techStack.statusDetail}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;

