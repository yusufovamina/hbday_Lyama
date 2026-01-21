import { ReactNode } from "react";

export default function Feed({ children }: { children: ReactNode }) {
    return (
        <main className="h-dvh w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar touch-pan-y">
            {children}
        </main>
    );
}
