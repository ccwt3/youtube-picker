import "./globals.css";
import FilterVar from "@/components/home/filter";
import { HomeWrapper } from "@/components/home/homeWrapper";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-dvh bg-pink-200">
      <FilterVar />
      <HomeWrapper />
    </main>
  );
}
