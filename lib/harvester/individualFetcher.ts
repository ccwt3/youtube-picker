import "dotenv/config";
import { manualIds } from "../filterType";
const baseUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${process.env.API_KEY}`;

interface manualVideos {
  id: string;
  videoId: string;
}

export interface YouTubeVideoItem {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    defaultLanguage?: string;
  };
}

export async function fetcher(ids: manualVideos[]) {
  const responses = await Promise.all(
    ids.map((videoObj) =>
      fetch(`${baseUrl}&id=${videoObj.videoId}`).then((res) => res.json()),
    ),
  );

  const filteredData = responses.flatMap(
    (rawData) =>
      rawData.items?.map((item: YouTubeVideoItem) => ({
        id: item.id,
        title: item.snippet.title,
        tags: item.snippet.tags,
        category: item.snippet.categoryId,
        language: item.snippet.defaultLanguage,
      })) || [],
  );

  console.log(filteredData);
  return filteredData;
}

fetcher(manualIds);
