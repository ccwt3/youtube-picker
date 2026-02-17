import "dotenv/config";
const baseUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&key=${process.env.API_KEY}`;

interface manualVideos {
  id: string;
  videoId: string;
}

interface YouTubeVideoItem {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    title: string;
    tags?: string[];
    categoryId: string;
    defaultLanguage?: string;
  };
  contentDetails: {
    duration: string
  }
}

//? Manual tags (temporal)
export async function fetcher(ids: manualVideos[]) {
  const responses = await Promise.all(
    ids.map(async (videoObj) => {
      const res = await fetch(`${baseUrl}&id=${videoObj.videoId}`);
      return { tag: videoObj.id, data: await res.json() };
    }),
  );

  const filteredData = responses.flatMap(
    ({ tag, data }) =>
      data.items?.map((item: YouTubeVideoItem) => ({
        videoUrl: `https://www.youtube.com/embed/${item.id}`,
        title: item.snippet.title,
        tags: tag, //todo MODIFICAR TODO EL SISTEMA DE TAGS
        category: item.snippet.categoryId,
        language: item.snippet.defaultLanguage,
        author: item.snippet.channelId,
        duration: item.contentDetails.duration
      })) || [],
  );

  //console.log(filteredData); //! log
  return filteredData;
}
