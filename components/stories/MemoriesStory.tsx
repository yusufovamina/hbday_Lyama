"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import Story from "@/components/Story";
import { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

const initialMemories = [
    { id: 1, src: "/memories/1.png", rotate: -5, caption: "love you 💖" },
    { id: 2, src: "/memories/2.png", rotate: 5, caption: "vibing ✨" },
    { id: 3, src: "/memories/3.jpg", rotate: -2, caption: "<3" },
    { id: 4, src: "/memories/4.jpg", rotate: 3, caption: "cute" },
    { id: 5, src: "/memories/5.jpg", rotate: -4, caption: "💖💖💖" },
];

export default function MemoriesStory() {
    const [memories, setMemories] = useState(initialMemories);
    const [isFirstRevealed, setIsFirstRevealed] = useState(false);

    const removeMemory = (id: number) => {
        setMemories((prev) => prev.filter((m) => m.id !== id));
    };

    const handleReveal = () => {
        if (!isFirstRevealed) {
            setIsFirstRevealed(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                shapes: ['heart'],
                colors: ['#FF69B4', '#FFB6C1', '#E6E6FA']
            });
        }
    };

    return (
        <Story background="bg-baby-blue">
            <h2 className="text-4xl font-hand text-white mb-8 drop-shadow-md">Memories ✨</h2>
            <div className="relative w-full max-w-xs h-[500px] flex items-center justify-center">
                <AnimatePresence>
                    {memories.map((memory, index) => (
                        <Card
                            key={memory.id}
                            memory={memory}
                            index={index}
                            onRemove={() => removeMemory(memory.id)}
                            isLocked={memory.id === 1 && !isFirstRevealed}
                            onUnlock={handleReveal}
                        />
                    ))}
                </AnimatePresence>
                {memories.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white font-hand text-2xl text-center"
                    >
                        More memories coming soon... 💖
                        <br />
                        <button
                            onClick={() => {
                                setMemories(initialMemories);
                                setIsFirstRevealed(false);
                            }}
                            className="mt-4 text-sm bg-white/20 px-4 py-2 rounded-full"
                        >
                            Reset
                        </button>
                    </motion.div>
                )}
            </div>
            <p className="absolute bottom-10 text-white/80 text-sm animate-pulse">
                {isFirstRevealed || memories.length === 0 || memories[0].id !== 1
                    ? "Swipe photos away! 💨"
                    : "tap!"}
            </p>
        </Story>
    );
}

function Card({ memory, index, onRemove, isLocked, onUnlock }: {
    memory: any,
    index: number,
    onRemove: () => void,
    isLocked?: boolean,
    onUnlock?: () => void
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-50, 50]);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const controls = useAnimation();

    // Shake detection logic
    useEffect(() => {
        if (!isLocked || !onUnlock) return;

        let lastX = 0, lastY = 0, lastZ = 0;
        let lastTime = 0;
        const threshold = 15; // Sensitivity

        const handleMotion = (e: DeviceMotionEvent) => {
            const current = e.accelerationIncludingGravity;
            if (!current) return;

            const currentTime = Date.now();
            if ((currentTime - lastTime) > 100) {
                const diffTime = currentTime - lastTime;
                lastTime = currentTime;

                const speed = Math.abs((current.x || 0) + (current.y || 0) + (current.z || 0) - lastX - lastY - lastZ) / diffTime * 10000;

                if (speed > threshold) {
                    onUnlock();
                }

                lastX = current.x || 0;
                lastY = current.y || 0;
                lastZ = current.z || 0;
            }
        };

        window.addEventListener('devicemotion', handleMotion);
        return () => window.removeEventListener('devicemotion', handleMotion);
    }, [isLocked, onUnlock]);

    const handleDragEnd = (event: any, info: any) => {
        if (Math.abs(info.offset.x) > 100) {
            onRemove();
        }
    };

    const handleTap = () => {
        if (isLocked && onUnlock) {
            // Simulate shake animation
            controls.start({
                x: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.4 }
            });
            onUnlock();
        }
    };

    return (
        <motion.div
            className={`absolute w-72 h-96 bg-white rounded-2xl shadow-xl p-3 flex flex-col items-center pb-8 cursor-grab active:cursor-grabbing`}
            style={{ x, rotate, opacity, zIndex: 10 - index }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={controls}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ x: 500, opacity: 0, transition: { duration: 0.2 } }}
            drag={isLocked ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: "grabbing" }}
            onClick={handleTap}
        >
            <div className="relative w-full h-full rounded-xl overflow-hidden mb-2 bg-gray-100">
                {isLocked ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-lavender/50 backdrop-blur-sm z-10">
                        <span className="text-6xl mb-4">📲</span>
                        <p className="font-hand text-2xl text-hot-pink font-bold">Tap me!</p>
                        <p className="text-xs text-gray-500 mt-2"></p>
                    </div>
                ) : (
                    <Image
                        src={memory.src}
                        alt="Memory"
                        fill
                        className="object-cover"
                        draggable={false}
                    />
                )}
            </div>
            {memory.caption && !isLocked && (
                <p className="font-hand text-2xl text-gray-800 mt-2">{memory.caption}</p>
            )}
        </motion.div>
    );
}
