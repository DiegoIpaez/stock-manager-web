import Spinner from '@/components/ui/feedback/Spinner';

export default function Loading() {
  return (
    <div className="flex justify-center mt-[10rem]">
      <Spinner size={50} />
    </div>
  );
}
