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
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
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
