import { ReactNode } from "react";

interface StoryProps {
    children: ReactNode;
    className?: string;
    background?: string;
}

export default function Story({ children, className, background = "bg-white" }: StoryProps) {
    return (
        <section
            className={`h-dvh w-full snap-start snap-always relative overflow-hidden flex flex-col items-center justify-center ${background} ${className || ""}`}
        >
            {children}
        </section>
    );
}
