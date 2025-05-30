import Image from "next/image";
import { MotionDiv, MotionH1, MotionP } from "../shared/MotionDiv";
import { Heart } from "lucide-react";
import Logo from "../shared/Logo";

export default function Hero() {
    return (
        <div className="relative w-full h-[50rem] overflow-hidden text-white">
            <MotionDiv
                className="absolute inset-0 shadow-2xl"
                variants={imageVariants}
                initial="init"
                animate="animate"
                transition={{ duration: 0.7 }}
            >
                <Image
                    width={1000}
                    height={1000}
                    priority
                    src="/img/perf4.jpeg"
                    alt="Hero"
                    className="absolute inset-0 object-cover w-full h-full"
                />
            </MotionDiv>
            <MotionDiv
                className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:gap-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="grid gap-4">
                    <MotionH1
                        className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex justify-start items-center gap-2">
                            مولیان پرفیوم
                            <Logo length={16} defaultTheme="dark" />
                        </div>
                    </MotionH1>
                    <MotionP
                        className="max-w-[700px] text-lg flex items-center gap-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        با مولیان عطر مخصوص خودت رو پیدا کن
                        <Heart className="text-3xl text-primary" />
                    </MotionP>
                </div>
            </MotionDiv>
            <div
                className="absolute bottom-0 h-10 w-full bg-background"
                style={{ borderRadius: '50% 50% 0 0' }}
            />
        </div>
    );
}

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const imageVariants = {
    init: { y: -400 },
    animate: { y: 0 }
};