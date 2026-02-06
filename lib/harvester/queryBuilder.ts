import { timeSnaps, videoTopics } from "../filterType";
import "dotenv/config";

interface tagArray {
  time: string;
  topic: string;
}

async function queryFetcher(
  tags: tagArray[],
  outPutNumber: number,
  urls: string[],
) {
  const videoReferences: any = [];
  const responses = await Promise.all(urls.map((url) => fetch(url)));

  // ✅ Usar for...of en lugar de forEach
  for (let i = 0; i < responses.length; i++) {
    const res = responses[i];
    const tag = tags[i];

    if (!res.ok) {
      console.error(
        `❌ Error en ${tag.topic}: ${res.status} ${res.statusText}`,
      );
      continue;
    }

    const data: any = await res.json();

    // Workaround: forzar maxResults en cliente
    if (data.items && data.items.length > outPutNumber) {
      console.warn(
        `⚠️  API ignoró maxResults=${outPutNumber} en ${tag.topic}, limitando manualmente`,
      );
      data.items = data.items.slice(0, outPutNumber);
    }

    //console.log(data.items);

    data.items.forEach((info: any) => {
      videoReferences.push({
        id: tag.topic,
        videoId: info.id.videoId,
      });
    });
  }

  return videoReferences;
}

function queryBuilder(tags: tagArray[], outPutNumber: number) {
  //* Builder Function
  const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${outPutNumber}`;

  const urls = tags.map((combination) => {
    const topicQuery = encodeURIComponent(combination.topic);
    const duration =
      combination.time === "short"
        ? "&videoDuration=medium"
        : "videoDuration=long";
    return `${baseUrl}&q=${topicQuery}${duration}&key=${process.env.API_KEY}`;
  });

  return urls;
}

export async function generalFetcher() {
  //* starter function
  const dailyTimeTag = timeSnaps[0].id;
  const outPutNumber = 2;

  const tagsObjectArray = videoTopics.map((topic) => {
    return { time: dailyTimeTag, topic: topic.id };
  });

  const queries = queryBuilder(tagsObjectArray, outPutNumber);

  const videoReferences = await queryFetcher(
    tagsObjectArray,
    outPutNumber,
    queries,
  );

  return videoReferences;
}
