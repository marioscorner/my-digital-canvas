import { Code2 } from "lucide-react";

const TechStackCard = () => {
  // Editable content
  const currentStatus = "Disponible para proyectos";
  const statusDetail = "Actualmente trabajando en proyectos freelance";

  return (
    <div className="bento-card flex h-full flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="section-label">Status</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-foreground">
              {currentStatus}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{statusDetail}</p>
        </div>
      </div>

      {/* Current Time (simulated) */}
      <div className="mt-6 rounded-xl bg-secondary/50 p-4">
        <p className="text-center font-mono text-2xl tracking-wide text-foreground">
          {new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          <span className="text-sm text-muted-foreground">CET</span>
        </p>
      </div>
    </div>
  );
};

export default TechStackCard;
