import { Separator } from "@/components/ui/separator";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Logo from "./Logo";
import { FaInstagram, FaTelegram } from "react-icons/fa";

const phoneNumber1 = "09378926148";
const phoneNumber2 = "09198353577";
const email = "info@moolianperfume.com";
const socialLinks = [
    { href: "https://instagram.com", icon: <FaInstagram className="w-8 h-8 text-blue-700" />, alt: "اینستاگرام" },
    { href: "https://t.me", icon: <FaTelegram className="w-8 h-8 text-blue-700" />, alt: "تلگرام" },
];

const Footer = () => (
    <footer className="bg-sky-50 text-black mt-16 py-10 rounded-t-4xl" dir="rtl">

        {/* Logo */}
        <div className="max-w-screen-xl mx-auto px-6 flex justify-center items-center gap-3">
            <Logo length={16} defaultTheme="light" />
            <span className="text-2xl font-semibold">مولیان پرفیوم</span>
        </div>

        {/* Contact Info and social links */}
        <Separator className="mt-10 mb-4" />
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center gap-6">

            <h2>پل های ارتباطی:</h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Contact Info */}
                <div className="text-sm flex flex-col gap-2 text-center md:text-right">
                    <div>
                        <span>تلفن:</span>
                        <a href={`tel:${phoneNumber1}`} className="mx-1">{digitsEnToFa(phoneNumber1)}</a>
                        <span className="mx-1">-</span>
                        <a href={`tel:${phoneNumber2}`} className="mx-1">{digitsEnToFa(phoneNumber2)}</a>
                    </div>
                    <div>
                        <span>ایمیل:</span>
                        <a href={`mailto:${email}`} className="mx-1">{email}</a>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center items-center gap-2 text-sm">
                    <div>شبکه های اجتماعی: </div>
                    <div className="flex gap-4">
                        {socialLinks.map((s, i) => (
                            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.alt}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Enamad Badge */}
        <Separator className="mt-10 mb-4" />
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center gap-6">
            <div className="mt-4">
                <a
                    referrerPolicy="origin"
                    href="https://trustseal.enamad.ir/?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX"
                    target="_blank"
                    title="نماد اعتماد الکترونیکی"
                >
                    <img
                        referrerPolicy="origin"
                        src="https://trustseal.enamad.ir/logo.aspx?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX"
                        alt="نماد اعتماد الکترونیکی"
                        className="object-contain"
                    />
                </a>
            </div>
        </div>

        {/* copyright */}
        <Separator className="mt-10 mb-4" />
        <div className="text-muted-foreground w-full text-center pb-6 text-sm">
            &copy; {digitsEnToFa(new Date().getFullYear())} کلیه حقوق و محتوای این وب‌سایت متعلق به مولیان پرفیوم می‌باشد.
        </div>
    </footer>
);

export default Footer;
