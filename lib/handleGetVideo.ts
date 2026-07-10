"use client";

export interface VideoData {
  videoUrl: string;
  title?: string;
  author?: string;
  duration?: string;
  category?: string;
}

interface TimeTopicFilters {
  time: string[];
  filter: string[];
}

function readStoredFilters(): TimeTopicFilters {
  const rawData = localStorage.getItem("filters");
  if (!rawData) return { time: [], filter: [] };

  try {
    const parsed = JSON.parse(rawData);
    return {
      time: Array.isArray(parsed.time) ? parsed.time : [],
      filter: Array.isArray(parsed.filter) ? parsed.filter : [],
    };
  } catch {
    return { time: [], filter: [] };
  }
}

export async function fetchVideo(): Promise<VideoData> {
  const filterData = readStoredFilters();

  const params = new URLSearchParams();
  filterData.time.forEach((t) => params.append("timesnap", t));
  filterData.filter.forEach((f) => params.append("topic", f));

  const res = await fetch(`/api/video?${params.toString()}`);

  if (!res.ok) {
    throw new Error("No se pudo obtener el video.");
  }

  const data = await res.json();

  if (typeof data === "string" || !data || !data.videoUrl) {
    throw new Error("La base de datos esta desactivada");
  }

  return data as VideoData;
}
