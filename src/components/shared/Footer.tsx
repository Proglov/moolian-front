import { Separator } from "@/components/ui/separator";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";

const Footer = () => {
    const phoneNumber1 = "09378926148";
    const phoneNumber2 = "09198353577";

    return (
        <footer>
            <Separator className="mt-16" />
            <Separator className="mb-4" />
            <div className="max-w-screen-lg mx-auto">
                <div className="p-5 text-justify">
                    {/* Your existing footer text */}
                </div>
                <div className="py-6 flex flex-col justify-start items-center">

                    {/* Logo */}
                    <div className="flex justify-center items-center gap-2">
                        <Image
                            width={64}
                            height={64}
                            src="/img/logo.svg"
                            alt="Hero"
                            className="inset-0 object-cover w-16 h-16"
                        />
                        <div className="h-10 w-1 border-r-2 border-muted-foreground" />
                        <div>
                            مولیان پرفیوم
                        </div>
                    </div>

                    {/* Phone numbers */}
                    <div className="mt-4 text-center text-lg">
                        شماره تماس: {digitsEnToFa(phoneNumber1)} - {digitsEnToFa(phoneNumber2)}
                    </div>

                    {/* Enamad badge */}
                    <div className="mt-6 bg-destructive">
                        {/* <a
                            referrerPolicy="origin"
                            href='https://trustseal.enamad.ir/?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX'
                            target="_blank"
                            rel="noopener noreferrer"
                            title="نماد اعتماد الکترونیکی"
                        >
                            <Image
                                referrerPolicy='origin'
                                src='https://trustseal.enamad.ir/logo.aspx?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX'
                                alt="نماد اعتماد الکترونیکی"
                                width={120}
                                height={60}
                                className="object-contain"
                            />
                        </a> */}
                        <a
                            referrerPolicy='origin'
                            target='_blank'
                            href='https://trustseal.enamad.ir/?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX'
                        >
                            <img referrerPolicy='origin'
                                src='https://trustseal.enamad.ir/logo.aspx?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX'
                                alt='trust'
                                style={{ cursor: 'pointer', width: '100px' }}
                            />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-muted-foreground w-full text-center mb-2">
                    &copy; {digitsEnToFa(new Date().getFullYear())}{" "}
                    کلیه حقوق و محتوای این وب‌سایت متعلق به مولیان پرفیوم می‌باشد.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
