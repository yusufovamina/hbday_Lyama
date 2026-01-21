"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Story from "@/components/Story";
import { Gift } from "lucide-react";

export default function SurpriseStory() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFB6C1', '#89CFF0', '#E6E6FA']
        });
    };

    return (
        <Story background="bg-lavender-dark">
            <AnimatePresence>
                {!isOpen ? (
                    <motion.button
                        className="bg-white text-hot-pink rounded-full p-8 shadow-2xl flex flex-col items-center gap-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleOpen}
                        exit={{ scale: 0, opacity: 0 }}
                    >
                        <Gift size={48} />
                        <span className="font-hand text-xl font-bold">Tap for Surprise!</span>
                    </motion.button>
                ) : (
                    <motion.div
                        className="bg-white/90 p-8 rounded-2xl max-w-xs text-center shadow-2xl"
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                    >
                        <img
                            src="https://media1.tenor.com/m/Yp0KOBZZ9RYAAAAC/кот-поцелуй.gif"
                            alt="Cute cat kiss"
                            className="w-full rounded-xl mb-4"
                        />
                        <h3 className="text-3xl font-hand text-hot-pink mb-4">Surprise! 🎉</h3>
                        <p className="font-sans text-lg text-gray-700">
                         best wishes for your birthday!!
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-6 text-sm text-gray-400 underline"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Story>
    );
}
