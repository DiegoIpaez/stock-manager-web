import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center mt-[10rem]">
      <Loader size={50} className="animate-spin" />
    </div>
  );
}
