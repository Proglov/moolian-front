import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";

const footerLinks = [
    {
        title: "تماس با ما",
        href: "#",
    },
    {
        title: "درباره ما",
        href: "#",
    },
];

const Footer = () => {
    return (
        <footer>
            <Separator className="mt-16" />
            <Separator className="mb-4" />
            <div className="max-w-screen-lg mx-auto">
                <div className="p-5 text-justify">
                    ما مولیان هستیم 😊
                    یه گروه کوچیک با انگیزه‌ای بزرگ: اینکه به هر کسی کمک کنیم بویی پیدا کنه که دقیقاً خودش باشه.

                    عطر برای ما فقط یه بو نیست. عطر حالت نفس، حالات روز و حتی یادهاییه که دوست داریم با خودمون ببریم. توی انتخاب عطر، مثل لباس پوشیدن هویتتون، همینطور بوی خودتون رو هم طراحی می‌کنید.

                    در مولیانه دنبال فروختن عطر نیستیم، دنبال این هستیم که یه تجربه خوب بهتون هدیه بدیم. چه دنبال یه عطر روزمره باشید، چه یه بوی خاص برای یه شب مهم – ما کنارتون هستیم تا بتونید عطر خودتون رو پیدا کنید.

                    باورمون اینه که هر کدوممون یه بوی منحصر به فرد داریم. ما فقط می‌خواهیم کمک کنیم اونو پیدا کنیم.
                </div>
                <div className="py-6 flex flex-col justify-start items-center">

                    {/* Logo */}
                    <div className="flex justify-center items-center gap-2">
                        <Image
                            width={100}
                            height={100}
                            src="/img/logo.jpg"
                            alt="Hero"
                            className="inset-0 object-cover w-16 h-16 border rounded-full"
                        />
                        <div className="h-10 w-1 border-r-2 border-muted-foreground" />
                        <div>
                            مولیان پرفیوم
                        </div>
                    </div>

                    {/* //TODO create this pages */}
                    {/* <ul className="mt-6 flex items-center gap-4 flex-wrap">
                        {footerLinks.map(({ title, href }) => (
                            <li key={title}>
                                <Link
                                    href={href}
                                    className="text-muted-foreground hover:text-foreground font-medium"
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul> */}
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
