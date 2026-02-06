import { supabase } from "../supabase/scriptClient";

interface CleanVideoReferences {
  videoUrl: string;
  title: string;
  tags?: string; //todo Modificar esto en conjunto con todo el sistema de tags (convertir a string)
  category: string;
  language?: string;
  author: string;
}

interface NormalizerType {
  id: number;
}

const inputMock = [
  {
    title: "elpepe",
    language: "en",
    videoUrl: "achetetepe",
    category: "2",
    author: "me",
    tags: "religious",
  },
  {
    title: "sech",
    language: "es",
    videoUrl: "etesech",
    category: "2",
    tags: "learning",
    author: "me",
  },
  {
    title: "sech",
    language: "es",
    videoUrl: "mebadoler",
    tags: "documentary",
    category: "3",
    author: "elpepe",
  },
];

async function videoTableUploader(payload: CleanVideoReferences[]) {
  const { data, error } = await supabase
    .from("video")
    .upsert(
      payload.map(({ tags, ...rest }) => rest), //Desctructurando el objeto y solo pasando lo que quiero que pase
      { onConflict: "videoUrl" },
    )
    .select();

  if (error) {
    console.error(error);
    return [];
  }

  console.log("video table info: ", data);
  const videosIds = data.flatMap((video) => video.id);
  return videosIds;
}

export async function storer(payload: CleanVideoReferences[]) {
  const videosIds: number[] = await videoTableUploader(payload);

  const tagsData = await Promise.all(
    payload.flatMap(async (video) => {
      //todo How to fetch each tag
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .eq("tag_name", video.tags);

      if (error) {
        console.error("error:", error);
        return;
      }

      console.log("tags data: ", data); //! log
      return data[0].id;
    }),
  );

  console.log("id de los tags: ", tagsData); //! log
  console.log("videos ids: ", videosIds); //! log

  const normalizedPairs = [];

  for (let i = 0; i < videosIds.length; i++) {
    const pair = {
      video_id: videosIds[i],
      tag_id: tagsData[i],
    };

    normalizedPairs.push(pair);
  }

  const { data, error } = await supabase
    .from("video_tags")
    .insert(normalizedPairs)
    .select();

  console.log("pares: ", normalizedPairs); //! log
  return console.log("Informacion normalizada: ", data); //! log
}

storer(inputMock);
