"use client";

import { motion } from "framer-motion";
import Story from "@/components/Story";

const reasons = [
    "Your style is iconic 💅",
    "You're the kindest & most positive person ☀️",
    "It's always fun with you <3",
    "You have the best vibes ✨",
];

export default function ReasonsStory() {
    return (
        <Story background="bg-soft-pink">
            <h2 className="text-4xl font-hand text-white mb-10 drop-shadow-md">Why I Love You 💖</h2>
            <div className="flex flex-col gap-4 w-full max-w-xs px-4">
                {reasons.map((reason, index) => (
                    <motion.div
                        key={index}
                        className="bg-white/90 rounded-xl p-4 shadow-lg text-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <p className="font-sans text-lg font-bold text-hot-pink">{reason}</p>
                    </motion.div>
                ))}
            </div>
        </Story>
    );
}
