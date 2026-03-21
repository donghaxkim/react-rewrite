import { cn } from "@/lib/utils";
export default function Button({ active }: { active: boolean }) {
  return (
    <button className={cn("flex p-4", active && "bg-blue-500", "text-white")}>
      Click
    </button>
  );
}
