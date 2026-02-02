import { timeSnaps, videoTopics } from "../filterType";
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

interface tagArray {
  time: string;
  topic: string;
}

export async function builder(tags: tagArray[]) {
  const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1`;

  const fetchPromises = tags.map((combination) => {
    const topicQuery = encodeURIComponent(combination.topic); // 👈 Encodear
    const apiKey = process.env.API_KEY;

    if (combination.time === "short") {
      const url = `${baseUrl}&q=${topicQuery}&videoDuration=medium&key=${apiKey}`;
      console.log(`🔍 [${combination.topic}] ${url}`);
      return fetch(url);
    }

    const url = `${baseUrl}&q=${topicQuery}&key=${apiKey}`;
    console.log(`🔍 [${combination.topic}] ${url}`);
    return fetch(url);
  });

  const responses = await Promise.all(fetchPromises);

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

    const data = await res.json();
    const itemCount = data.items?.length || 0;

    console.log(`\n📊 [${tag.topic}] Items recibidos: ${itemCount}`);

    // Workaround: forzar maxResults en cliente
    if (data.items && data.items.length > 1) {
      console.warn(`⚠️  API ignoró maxResults=1, limitando manualmente`);
      data.items = data.items.slice(0, 1);
    }

    console.log(data.items);
    const items = data.items;
  }
}

async function executer() {
  // 👈 Hacer async
  const dailyTimeTag = timeSnaps[0].id;

  const tagsObjectArray = videoTopics.map((topic) => {
    return { time: dailyTimeTag, topic: topic.id };
  });

  console.log("📋 Tags a buscar:", tagsObjectArray);

  await builder(tagsObjectArray); // 👈 Esperar con await

  console.log("\n✅ Búsquedas completadas");
}

executer().catch(console.error); // 👈 Manejar errores
