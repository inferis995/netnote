
import { useRef, useState } from "react";
import logoImage from "../assets/netnote-icon.png";

export function Logo3DCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glow, setGlow] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (max 15 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 20; // Rotate around Y axis based on X position
        const rotateX = ((centerY - y) / centerY) * 20; // Rotate around X axis based on Y position (inverted)

        setRotate({ x: rotateX, y: rotateY });
        setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlow({ x: 50, y: 50 });
    };

    return (
        <div
            className="relative w-14 h-14"
            style={{ perspective: "1000px" }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-all duration-100 ease-out preserve-3d"
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-20"
                    style={{
                        background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
                    }}
                />

                {/* App Icon */}
                <img
                    src={logoImage}
                    alt="NetNote Logo"
                    className="w-full h-full object-cover"
                    style={{ transform: "translateZ(10px)" }}
                />
            </div>
        </div>
    );
}
