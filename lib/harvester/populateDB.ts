import { supabase } from "../supabase/scriptClient";

async function main() {
  const { status, error } = await supabase
    .from("video")
    .insert({ url: "just ur doll", title: "jose", language: "english" });

  if (error) {
    return console.error(error);
  } else {
    return console.log(status);
  }
}

main();
