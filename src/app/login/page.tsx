import Title from '@/components/ui/typography/Title';
import Subtitle from '@/components/ui/typography/Subtitle';
import FormLogin from './_components/FormLogin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const { error } = (await searchParams) || {};
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
      <Title className="font-bold mb-6 text-center text-black">SM</Title>
      <Subtitle className="font-bold mb-6 text-center text-black">
        Iniciar Sesión
      </Subtitle>
      <FormLogin error={error as string} />
    </div>
  );
}
