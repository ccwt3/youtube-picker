import { timeSnaps, videoTopics } from "../filterType";
import { genaiWorker } from "./genaiWorker";
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

async function queryBuilder(tags: tagArray[], outPutNumber: number) {
  //* Builder Function
  const baseUrl = "https://www.googleapis.com/youtube/v3/search";

  const urls = await Promise.all(
    tags.map(async (combination) => {
      const prompt = `
  Actúa como un experto en operadores de búsqueda avanzada de YouTube (YouTube Data API v3).
  
  Tengo los siguientes datos de entrada:
  - Categoría principal: "${combination.topic}"

  TU TAREA:
  Genera un objeto JSON con los parámetros óptimos para la API 'search.list'.
  
  REGLAS PARA EL PARAMETRO 'q':
  1. Usa el operador '|' para conceptos alternativos (ej: hombre|mujer).
  2. Usa comillas "" para frases que deben ir juntas.
  3. Usa el operador '-' (menos) para EXCLUIR ruido basado en la intención (ej: si es educativo, quizás quieras excluir '-vlog -reaccion -challenge').
  4. Combina todo en un solo string de búsqueda potente.

  REGLAS PARA OTROS PARAMETROS:
  - 'videoDuration':'medium' o 'long' dependiendo tu consideracion del tema a tratar (podcast seria long, y videjouegos entre medium y long, si son gameplays).
  - 'relevanceLanguage': 'en'.
  - 'videoCategoryId': La que concuerde mejor con la categoria principal, si existen varios candidatos, selecciona al azar de entre los candidatos

  CONSIDERACIONES:
  - IMPORTANTE!: Enfocate en la variabilidad y dinamismo (los videos buscan entrenener al comer o ser de fondo al momento de realizar actividades) relativos de acuerdo a la categoria.
  - Como referencia de tipos de videos toma el formato 'vlog'/'lifestyle' similar al del creador de contenido 'sam sulek', 'documental animado' similar al creador de contenido 'fern', podcasts interesantes como los del creador de contenido 'Andrew Hubberman', videos con dinamismo y no serios al 100% .
  
  Salida esperada (solo JSON):
  {
    "q": "string",
    "videoDuration": "string",
    "videoCategoryId": "Number"
  }
`;
      const aiQuery = await genaiWorker(prompt);
      const params = new URLSearchParams({
        part: "snippet",
        type: "video",
        maxResults: outPutNumber.toString(),
        key: process.env.API_KEY!, // No olvides agregar tu API Key
        q: aiQuery.q,
        videoDuration: aiQuery.videoDuration,
        videoCategoryId: aiQuery.videoCategoryId,
        relevanceLanguage: "en",
        regionCode: "US",
      });

      // Esto generará la URL perfectamente codificada
      const urlFinal = `${baseUrl}?${params.toString()}`;
      return urlFinal;
    }),
  );

  return urls;
}

export async function generalFetcher() {
  //* starter function
  const dailyTimeTag = timeSnaps[0].id;
  const outPutNumber = 1;

  const tagsObjectArray = videoTopics.map((topic) => {
    return { time: dailyTimeTag, topic: topic.id };
  });

  const queries = await queryBuilder(tagsObjectArray, outPutNumber);

  const videoReferences = await queryFetcher(
    tagsObjectArray,
    outPutNumber,
    queries,
  );

  return videoReferences;
}
