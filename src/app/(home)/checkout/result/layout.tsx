export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full max-w-xl mx-auto mt-5 h-[100%]">
            {children}
        </div>
    );
}
