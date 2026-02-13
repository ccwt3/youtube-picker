export function VideoSection({ videoUrl }: { videoUrl: string }) {
  return (
    <iframe width="560" height="315" src={videoUrl} allowFullScreen></iframe>
  );
}
