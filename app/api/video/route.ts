import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function randomIndex(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled)) + minCeiled;
}

async function randomVideo() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("video").select(`
    id,
    videoUrl,
    video_tags (
      tags (
        id,
        tag_name
      )
    )
  `);

  if (error) console.error(error);

  let idx;

  if (Array.isArray(data)) {
    idx = randomIndex(0, data?.length);
  } else {
    //todo fix problem handling
    return "error at fetching";
  }

  return data[idx];
}

export async function GET(request: NextRequest) {
  const parameters = request.nextUrl.searchParams;

  const filters = parameters.getAll("topic");
  const timeSnaps = parameters.getAll("timesnap");

  if (filters.length === 0 && timeSnaps.length === 0) {
    const video = await randomVideo();
    return NextResponse.json(video);
  }

  return NextResponse.json("osaka");
}
