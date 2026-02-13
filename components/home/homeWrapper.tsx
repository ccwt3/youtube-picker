"use client";
import { Button } from "@/components/ui/button";
import { VideoSection } from "@/components/home/video";
import { getVideo } from "@/lib/handleGetVideo";
import { useState } from "react";

export function HomeWrapper() {
  const [url, setUrl] = useState("https://www.youtube.com/embed/kArnEmqFBwA");

  return (
    <section className="flex flex-col justify-center items-center gap-3 p-6 border border-black bg-red-500 w-card">
      <div className="min-w-30 min-h-8 text-black">
        <VideoSection videoUrl={url} />
      </div>

      <div>
        <Button onClick={() => getVideo(setUrl)}>Get video</Button>
      </div>
    </section>
  );
}
