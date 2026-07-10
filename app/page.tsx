import "./globals.css";
import FilterVar from "@/components/home/filter";
import { HomeWrapper } from "@/components/home/homeWrapper";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-white">
      <FilterVar />
      <div className="flex w-full flex-1 flex-col items-center justify-center px-4 pb-10 pt-24">
        <HomeWrapper />
      </div>
    </main>
  );
}
