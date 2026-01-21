"use client";

import { motion } from "framer-motion";
import Story from "@/components/Story";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroStory() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Story background="bg-lavender">
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-hot-pink/30"
                            initial={{
                                x: Math.random() * 360, // Assuming mobile width roughly
                                y: "100vh",
                                scale: 0.5 + Math.random() * 1
                            }}
                            animate={{
                                y: -100,
                                rotate: Math.random() * 360
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                            style={{
                                left: `${Math.random() * 100}%`
                            }}
                        >
                            <Heart fill="currentColor" size={24 + Math.random() * 24} />
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-6xl font-hand text-hot-pink mb-6 drop-shadow-sm">
                        Happy Birthday!
                    </h1>
                    <p className="text-2xl font-sans text-gray-700 mb-8">
                        My favorite person 💕
                    </p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-gray-400 text-sm"
                    >
                        Scroll down 👇
                    </motion.div>
                </motion.div>
            </div>
        </Story>
    );
}
