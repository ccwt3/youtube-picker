import { timeSnaps, videoTopics } from "../filterType";
import "dotenv/config";

interface tagArray {
  time: string;
  topic: string;
}

export async function builder(tags: tagArray[]) {
  //* Builder Function
  const outPutNumber = 2;
  const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${outPutNumber}`;

  const urls = tags.map((combination) => {
    const topicQuery = encodeURIComponent(combination.topic);
    const duration =
      combination.time === "short"
        ? "&videoDuration=medium"
        : "videoDuration=long";
    return `${baseUrl}&q=${topicQuery}${duration}&key=${process.env.API_KEY}`;
  });

  // 2️⃣ Fetch en paralelo
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
        `⚠️  API ignoró maxResults=${outPutNumber}, limitando manualmente`,
      );
      data.items = data.items.slice(0, outPutNumber);
    }

    //console.log(data.items);

    const videosReferences = data.items.map((info: any) => {
      return {
        id: info.id.videoId,
        title: info.snippet.title,
      };
    });

    console.log(videosReferences);
  }
}

async function executer() {
  //* starter function
  const dailyTimeTag = timeSnaps[0].id;

  const tagsObjectArray = videoTopics.map((topic) => {
    return { time: dailyTimeTag, topic: topic.id };
  });

  await builder(tagsObjectArray); // 👈 Esperar con await
}

executer().catch(console.error); // 👈 Manejar errores
