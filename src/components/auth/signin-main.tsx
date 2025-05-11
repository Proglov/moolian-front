'use client'
import { useSearchParams } from "next/navigation"
import SigninPhone from "./signin-phone";
import SigninUsername from "./signin-username";
import { AnimatePresence, motion } from "framer-motion";

const USERNAME_TAB = 'username';

export default function SigninMain() {
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab');
    const content = tab === USERNAME_TAB ? <SigninUsername /> : <SigninPhone />;

    return (
        <AnimatePresence mode="wait" >
            <motion.div
                key={tab}
                style={{ overflow: 'hidden' }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {content}
            </motion.div>
        </AnimatePresence>
    )
}
