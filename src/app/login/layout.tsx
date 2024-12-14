import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      {children}
    </div>
  );
}
