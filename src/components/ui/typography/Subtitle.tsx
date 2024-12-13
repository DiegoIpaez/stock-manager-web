import clsx from "clsx";

export default function Subtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={clsx("text-2xl font-bold", { [className ?? ""]: className })}
    >
      {children}
    </h1>
  );
}
