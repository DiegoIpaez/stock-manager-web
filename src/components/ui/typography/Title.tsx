import clsx from "clsx";

export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={clsx("text-4xl font-bold", { [className ?? ""]: className })}
    >
      {children}
    </h1>
  );
}
