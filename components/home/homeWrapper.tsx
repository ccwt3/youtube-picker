"use client";
import { Button } from "@/components/ui/button";
import { VideoSection } from "@/components/home/video";
import { fetchVideo, VideoData } from "@/lib/handleGetVideo";
import { useState } from "react";

const DEFAULT_VIDEO: VideoData = {
  videoUrl: "https://www.youtube.com/embed/kArnEmqFBwA",
};

type Status = "idle" | "loading" | "error";

export function HomeWrapper() {
  const [video, setVideo] = useState<VideoData>(DEFAULT_VIDEO);
  const [status, setStatus] = useState<Status>("idle");

  const handleGetVideo = async () => {
    setStatus("loading");
    try {
      const data = await fetchVideo();
      setVideo(data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="flex w-card flex-col border border-black bg-white">
      <div className="flex items-center justify-between border-b border-black bg-red-600 px-5 py-3">
        <span className="font-mono text-xs uppercase tracking-widest text-white">
          Now picking
        </span>
        <span className="h-2 w-2 bg-white" aria-hidden />
      </div>

      <div className="p-6 sm:p-8">
        <VideoSection videoUrl={video.videoUrl} loading={status === "loading"} />

        {(video.title || video.author) && (
          <div className="mt-6 space-y-1.5 border-l-2 border-red-600 pl-4">
            {video.title && (
              <p className="text-sm font-medium leading-snug text-black">
                {video.title}
              </p>
            )}
            {video.author && (
              <p className="font-mono text-xs uppercase tracking-wide text-black/60">
                {video.author}
              </p>
            )}
          </div>
        )}

        {status === "error" && (
          <p className="mt-6 font-mono text-xs text-red-600">
            La base de datos esta actualmente desactivada.
          </p>
        )}
      </div>

      <div className="border-t border-black p-6 sm:p-8">
        <Button
          onClick={handleGetVideo}
          disabled={status === "loading"}
          className="w-full rounded-none border border-black bg-black py-5 text-white shadow-none transition-colors duration-150 hover:bg-red-600"
        >
          {status === "loading" ? "Buscando..." : "Get video"}
        </Button>
      </div>
    </section>
  );
}
