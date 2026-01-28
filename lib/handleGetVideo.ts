"use client";

export async function getVideo() {
  const rawData = localStorage.getItem("filters");
  if (rawData) {
    const data = JSON.parse(rawData);
    console.log(data);
  }

  const response = await fetch("api/getNovia");
  const video = await response.json();
  console.log(video);
}
