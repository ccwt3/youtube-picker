"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EttiquetesList } from "./list";
import { timeSnaps, videoTopics } from "@/lib/filterType";

export default function FilterVar() {
  const [isOpen, setOpen] = useState(false);
  const [topicFilters, setTopicFilters] = useState<string[]>([]);
  const [timeFilters, setTimeFilters] = useState<string[]>([]);

  useEffect(() => {
    const rawFilters = localStorage.getItem("filters");
    if (rawFilters) {
      const parsedFilters = JSON.parse(rawFilters);

      const topic = parsedFilters.filter || [];
      const time = parsedFilters.time || [];

      setTopicFilters(topic);
      setTimeFilters(time);
    }
  }, []);

  const handleUpdateFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      time: formData.getAll("timesnap[]") as string[],
      filter: formData.getAll("filter[]") as string[],
    };

    localStorage.setItem("filters", JSON.stringify(data));
    setTopicFilters(data.filter);
    setTimeFilters(data.time);
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-3 bg-purple-500 w-card h-14 fixed top-14">
        <Button size={"lg"} onClick={() => setOpen(true)}>
          Filter
        </Button>
      </div>

      {isOpen && (
        <dialog open={isOpen} className="absolute z-20 w-filter top-28 p-4">
          <form
            className="grid grid-cols-2 gap-2 justify-items-start"
            onSubmit={handleUpdateFilter}
          >
            <label className="col-span-2 justify-self-center">Duration: </label>
            <EttiquetesList
              ettiquetes={timeSnaps}
              selectedFilters={timeFilters}
              type="time"
            />

            <label className="col-span-2 justify-self-center">Topic: </label>
            <EttiquetesList
              ettiquetes={videoTopics}
              selectedFilters={topicFilters}
              type="topic"
            />

            <Button
              type="submit"
              size={"lg"}
              className="col-span-2 justify-self-center"
            >
              Update
            </Button>
          </form>
        </dialog>
      )}

      <div
        className={`w-dvw h-dvh absolute z-10 bg-[#00000070] ${isOpen ? "block" : "hidden"}`}
      ></div>
    </>
  );
}
