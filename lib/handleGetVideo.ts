"use client";

interface timeTopic {
  time: string[];
  filter: string[];
}

export async function getVideo() {
  const rawData = localStorage.getItem("filters");
  let filterData: timeTopic;
  if (rawData) {
    filterData = JSON.parse(rawData);
  } else {
    filterData = { time: [], filter: [] };
  }

  let query = "";

  filterData.time.forEach((t) => {
    query += `&timesnap=${t}`;
  });

  filterData.filter.forEach((f) => {
    query += `&topic=${f}`;
  });

  console.log(query);

  const res = await fetch(`/api/video?${query}`);
  const data = await res.json();

  return console.log(data);
}
