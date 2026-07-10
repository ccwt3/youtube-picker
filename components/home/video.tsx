export function VideoSection({
  videoUrl,
  loading,
}: {
  videoUrl: string;
  loading?: boolean;
}) {
  return (
    <div className="relative aspect-video w-full border border-black bg-black">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
          <span className="font-mono text-xs uppercase tracking-widest text-black/50">
            Buscando...
          </span>
        </div>
      )}
      <iframe
        key={videoUrl}
        src={videoUrl}
        className="h-full w-full"
        allowFullScreen
        title="Video seleccionado"
      />
    </div>
  );
}
