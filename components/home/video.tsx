export function VideoSection() {

  const videoId = "kArnEmqFBwA"

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      allowFullScreen
    ></iframe>
  );
}
