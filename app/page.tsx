import "./globals.css";
import { Button } from "@/components/ui/button";
import FilterVar from "@/components/home/filter";
import { VideoSection } from "@/components/home/video";
import { getVideo } from "@/lib/handleGetVideo";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-dvh bg-pink-200">
      <FilterVar />

      <section className="flex flex-col justify-center items-center gap-3 p-6 border border-black bg-red-500 w-card">
        <div className="min-w-30 min-h-8 text-black">
          <VideoSection />
        </div>

        <div>
          <Button onClick={getVideo}>Get video</Button>
        </div>
      </section>
    </main>
  );
}
