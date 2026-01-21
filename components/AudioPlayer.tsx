"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Attempt autoplay on mount
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // Autoplay blocked
                setIsPlaying(false);
            });
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={togglePlay}
                className="bg-white/30 backdrop-blur-md p-3 rounded-full text-black hover:bg-white/50 transition-colors shadow-lg"
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
            {/* User needs to add a file named 'bgm.mp3' to the public folder */}
            <audio ref={audioRef} loop src="/bgm.mp3" />
        </div>
    );
}
