import { Separator } from "@/components/ui/separator";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";
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
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start gap-10">

            {/* Left side: Logo and Contact Info */}
            <div className="flex flex-col items-center md:items-start gap-6 md:w-1/3">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Logo length={16} defaultTheme="light" />
                    <span className="text-2xl font-semibold">مولیان پرفیوم</span>
                </div>

                {/* Contact Info */}
                <div className="text-sm flex flex-col gap-2 text-center md:text-right">
                    <div>
                        <span>تلفن:</span>
                        <a href={`tel:${phoneNumber1}`} className="mx-1 underline">{digitsEnToFa(phoneNumber1)}</a>
                        <span className="mx-1">-</span>
                        <a href={`tel:${phoneNumber2}`} className="mx-1 underline">{digitsEnToFa(phoneNumber2)}</a>
                    </div>
                    <div>
                        <span>ایمیل:</span>
                        <a href={`mailto:${email}`} className="mx-1 underline">{email}</a>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-2">
                    {socialLinks.map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.alt}>
                            {s.icon}
                        </a>
                    ))}
                </div>

                {/* Enamad Badge */}
                <div className="mt-4">
                    <a
                        referrerPolicy="origin"
                        href="https://trustseal.enamad.ir/?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX"
                        target="_blank"
                        title="نماد اعتماد الکترونیکی"
                    >
                        <Image
                            referrerPolicy="origin"
                            src="https://trustseal.enamad.ir/logo.aspx?id=616357&Code=5oNHS7sIJ1zMiHwwEYFvTM34wB36nbHX"
                            alt="نماد اعتماد الکترونیکی"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </a>
                </div>
            </div>

            {/* Right side: Description text */}
            <div className="md:w-2/3 text-justify text-sm leading-7">
                ما مولیان هستیم 😊 یه گروه کوچیک با انگیزه‌ای بزرگ: اینکه به هر کسی کمک کنیم بویی پیدا کنه که دقیقاً خودش باشه. عطر برای ما فقط یه بو نیست. عطر حالت نفس، حالات روز و حتی یادهاییه که دوست داریم با خودمون ببریم. توی انتخاب عطر، مثل لباس پوشیدن هویتتون، همینطور بوی خودتون رو هم طراحی می‌کنید. در مولیانه دنبال فروختن عطر نیستیم، دنبال این هستیم که یه تجربه خوب بهتون هدیه بدیم. چه دنبال یه عطر روزمره باشید، چه یه بوی خاص برای یه شب مهم – ما کنارتون هستیم تا بتونید عطر خودتون رو پیدا کنید. باورمون اینه که هر کدوممون یه بوی منحصر به فرد داریم. ما فقط می‌خواهیم کمک کنیم اونو پیدا کنیم.
            </div>
        </div>

        {/* Separators and copyright */}
        <Separator className="mt-10 mb-4" />
        <div className="text-muted-foreground w-full text-center pb-6 text-sm">
            &copy; {digitsEnToFa(new Date().getFullYear())} کلیه حقوق و محتوای این وب‌سایت متعلق به مولیان پرفیوم می‌باشد.
        </div>
    </footer>
);

export default Footer;
