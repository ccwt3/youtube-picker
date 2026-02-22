import { generalFetcher } from "./queryBuilder";
import { fetcher } from "./individualFetcher";
import { storer } from "./populateDB";
import { manualIds } from "../filterType";

async function harvester() {
  //? this will get the references based on the filtering process
  const rawVideoReferences = await generalFetcher();
  //const rawVideoReferences = manualIds; //? still not connecting the getter with the sanatizers

  //? This will sanatize the data and return it ready to upload to the database
  const filteredData = await fetcher(rawVideoReferences);

  console.log(filteredData);
  const information = await storer(filteredData);
  return console.log("INFORMACION FINAL: ", information); //! log
}

harvester();
