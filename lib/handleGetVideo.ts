"use client";

export async function getVideo() {
  const rawData = localStorage.getItem("filters");
  let filterData;
  if (rawData) {
    filterData = JSON.parse(rawData);
  }

  console.log(filterData);
}
