'use client'
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarMotionDiv({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AnimatePresence>
            <motion.div
                variants={variants}
                initial="init"
                animate="animate"
                transition={{ duration: 0.1 }}
                exit='init'
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

const variants = {
    init: { y: -10, opacity: .1 },
    animate: { y: 0, opacity: 1 }
};