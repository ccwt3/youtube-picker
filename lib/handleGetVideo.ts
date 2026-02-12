"use client";

export async function getVideo() {
  const rawData = localStorage.getItem("filters");
  let filterData;
  if (rawData) {
    filterData = JSON.parse(rawData);
  }

  const res = await fetch("/api/video");
  const data = await res.json();

  return console.log(data);
}
