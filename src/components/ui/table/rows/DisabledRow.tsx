import { Check, X } from "lucide-react";

export default function DisabledRow({ disabled }: { disabled: boolean }) {
  return !disabled ? (
    <Check className="text-white bg-green-500 rounded-full p-1" size={20} />
  ) : (
    <X className="text-white bg-red-500 rounded-full p-1" size={20} />
  );
}
