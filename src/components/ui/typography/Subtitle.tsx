import clsx from "clsx";

export default function Subtitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h1
      className={clsx("text-2xl font-bold", { [className ?? ""]: className })}
    >
      {text}
    </h1>
  );
}
