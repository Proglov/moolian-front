'use client'
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type MotionDivProps = React.PropsWithChildren<HTMLMotionProps<"div">>;
type MotionPProps = React.PropsWithChildren<HTMLMotionProps<"p">>;
type MotionH1Props = React.PropsWithChildren<HTMLMotionProps<"h1">>;

export function MotionDiv({ children, ...rest }: MotionDivProps) {
    return <motion.div {...rest}>{children}</motion.div>;
}

export function MotionP({ children, ...rest }: MotionPProps) {
    return <motion.p {...rest}>{children}</motion.p>;
}

export function MotionH1({ children, ...rest }: MotionH1Props) {
    return <motion.h1 {...rest}>{children}</motion.h1>;
}
