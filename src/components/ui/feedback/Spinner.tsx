import { Loader, type LucideProps } from 'lucide-react';

export default function Spinner(props: LucideProps) {
  return <Loader {...props} className="animate-spin" />;
}
