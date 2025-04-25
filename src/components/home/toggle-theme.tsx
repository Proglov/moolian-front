"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";

const toggleTheme = (theme: string | undefined) => {
    return theme === 'light' ? 'dark' : 'light';
}

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(toggleTheme(theme))}>
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: theme === 'light' ? 0 : -180 }}
                transition={{ duration: 0.3 }}
            >
                <Sun className="block dark:hidden" />
                <Moon className="transform-[scale(1,-1)] rotate-90 hidden dark:block" />
            </motion.div>
        </Button>
    );
}
