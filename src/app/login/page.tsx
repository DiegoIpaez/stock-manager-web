import Title from "@/components/ui/typography/Title";
import Subtitle from "@/components/ui/typography/Subtitle";
import FormLogin from "./_components/FormLogin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LoginPage({ searchParams }: { searchParams: any }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <Title className="font-bold mb-6 text-center text-primary">SM</Title>
      <Subtitle className="font-bold mb-6 text-center text-black">
        Iniciar Sesión
      </Subtitle>
      <FormLogin error={searchParams.error} />
    </div>
  );
}
