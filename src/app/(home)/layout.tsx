import "../globals.css";
import HomeLayout from "@/components/home/HomeLayout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  );
}
