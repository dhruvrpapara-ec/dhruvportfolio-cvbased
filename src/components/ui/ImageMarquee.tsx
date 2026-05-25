import { useState } from "react";
import clsx from "clsx";

const IMAGES = Array.from({ length: 11 }).map((_, i) => `/hero-images/IMGS/IMGPORT (${i + 1}).png`);

export function ImageMarquee() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // We duplicate the array to ensure seamless infinite looping
  const duplicatedImages = [...IMAGES, ...IMAGES];

  return (
    <section className="relative w-full bg-[#050505] pt-12 pb-24 px-2 md:px-6">
      <div className="relative mx-auto w-full max-w-[1400px] rounded-[30px] overflow-hidden border border-[#1F2937] bg-[#0A0A0A] py-16 shadow-[0_0_50px_rgba(76,29,149,0.05)]">
        
        {/* Fade edges to black for smooth entry/exit inside the container */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        <div className="flex w-fit animate-marquee">
          {duplicatedImages.map((src, i) => {
            // Determine if this specific image (or its duplicate) is hovered
            const isHovered = hoveredIndex !== null && (i % IMAGES.length === hoveredIndex);

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i % IMAGES.length)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={clsx(
                  "relative mx-4 h-[250px] w-[180px] md:h-[400px] md:w-[280px] shrink-0 overflow-hidden rounded-2xl border transition-all duration-500 ease-out cursor-crosshair",
                  isHovered
                    ? "border-[#06B6D4] shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-105 z-20 grayscale-0 opacity-100"
                    : "border-[#1F2937] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 z-10"
                )}
              >
                <img
                  src={src}
                  alt={`Portfolio Gallery ${i}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
