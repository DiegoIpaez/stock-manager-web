import { Metadata } from "next";
import Title from "@/components/ui/typography/Title";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex justify-center mt-10">
      <Title>Stock Manager</Title>
    </div>
  );
}
