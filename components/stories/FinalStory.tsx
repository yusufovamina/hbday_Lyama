"use client";

import { motion } from "framer-motion";
import Story from "@/components/Story";
import { RefreshCcw } from "lucide-react";

export default function FinalStory() {
    const handleReplay = () => {
        const main = document.querySelector('main');
        if (main) {
            main.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Story background="bg-black">
            {/* Glitter effect placeholder - using CSS radial gradients or similar */}
            <div className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="z-10 text-center px-6">
                <motion.h1
                    className="text-5xl font-hand text-white mb-8 leading-tight"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    I love you endlessly 💗
                </motion.h1>

                <motion.button
                    className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-8 py-3 rounded-full font-sans font-bold flex items-center gap-2 mx-auto hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReplay}
                >
                    <RefreshCcw size={20} />
                    Replay ✨
                </motion.button>
            </div>
        </Story>
    );
}
