"use client";

export async function getVideo() {
  const rawData = localStorage.getItem("filters");
  let filterData;
  if (rawData) {
    filterData = JSON.parse(rawData);
  }

  const response = await fetch("api/video", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ filterData }),
  });

  const video = await response.json();
  console.log(video);
}
