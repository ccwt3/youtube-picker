import { NextResponse } from "next/server";
import "dotenv/config";

export async function GET(request: Request) {
  const query = "philosophy";
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&relevanceLanguage=en&type=video&videoDuration=medium&maxResults=5&key=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("error al consultar la API: ", err);
  }
}
