import clsx from 'clsx';

export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={clsx('text-xl font-bold py-5', {
        [className ?? '']: className,
      })}
    >
      {children}
    </h1>
  );
}
