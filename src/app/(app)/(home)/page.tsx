import { Metadata } from "next";
import Title from "@/components/ui/typography/Title";
import CardList from "./_components/CardList";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex flex-col mt-10">
      <Title className="text-center">Stock Manager</Title>
      <CardList />
    </div>
  );
}
