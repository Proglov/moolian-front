
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mt-0 sm:mt-20 max-w-[26rem] sm:max-w-sm sm:border p-5 sm:rounded-2xl sm:shadow-xl w-full mx-auto ">

            <h1 className="mb-3 text-center text-xl text-shadow-lg">
                مولیان پرفیوم
            </h1>

            {children}
        </div>
    );
}
