import { supabase } from "../supabase/serverClient";

async function main() {
  const { error } = await supabase
    .from("video")
    .insert({ url: "asd", title: "omar", language: "english" });

  return;
}

main();
