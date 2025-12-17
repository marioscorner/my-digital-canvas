import { Music } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpotifyCard = () => {
  const { t } = useLanguage();

  // Editable content
  const playlistId = "3PgjqksPrmqU4KxsISTjoV";
  const playlistTitle = "Who is Mario Gutiérrez?";

  return (
    <div className="bento-card h-full">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          <span className="section-label">{t.spotify.label}</span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {playlistTitle}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground">
          {t.spotify.description}
        </p>

        {/* Spotify Embed */}
        <div className="flex-1 min-h-0">
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyCard;

