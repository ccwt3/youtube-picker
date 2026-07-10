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

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

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
      <header className="fixed top-0 z-30 flex h-14 w-full items-center justify-between border-b border-black bg-white px-4 sm:px-8">
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-black">
          Silly Picker
        </span>
        <Button
          size="sm"
          className="rounded-none border border-black bg-white text-black shadow-none transition-colors duration-150 hover:bg-black hover:text-white"
          onClick={() => setOpen(true)}
        >
          Filter
        </Button>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/70 px-4 pt-24"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-filter border border-black bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black px-5 py-4">
              <span className="font-mono text-xs uppercase tracking-widest text-black">
                Filters
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="font-mono text-base leading-none text-black/50 transition-colors duration-150 hover:text-red-600"
              >
                x
              </button>
            </div>

            <form onSubmit={handleUpdateFilter} className="p-6">
              <fieldset className="mb-6">
                <legend className="mb-3 font-mono text-[11px] uppercase tracking-widest text-black/50">
                  Duration
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <EttiquetesList
                    ettiquetes={timeSnaps}
                    selectedFilters={timeFilters}
                    type="time"
                  />
                </div>
              </fieldset>

              <fieldset className="mb-7">
                <legend className="mb-3 font-mono text-[11px] uppercase tracking-widest text-black/50">
                  Topic
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <EttiquetesList
                    ettiquetes={videoTopics}
                    selectedFilters={topicFilters}
                    type="topic"
                  />
                </div>
              </fieldset>

              <Button
                type="submit"
                className="w-full rounded-none border border-black bg-red-600 py-5 text-white shadow-none transition-colors duration-150 hover:bg-black"
              >
                Apply filters
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
