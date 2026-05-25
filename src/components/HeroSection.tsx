import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypewriterName } from "./ui/TypewriterName";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative w-full bg-[#050505] pt-[80px] px-2 md:px-6 pb-6">
      <motion.div
        style={{ opacity, y }}
        className="relative mx-auto w-full max-w-[1400px] h-[85vh] min-h-[600px] overflow-hidden rounded-[30px] border border-[#1F2937] shadow-[0_0_50px_rgba(6,182,212,0.1)] bg-[#0A0A0A]"
      >
        {/* Background Image - Object-contain on mobile to prevent cropping, cover on larger screens if needed, 
            but using contain to respect user's strict no-crop request. */}
        <img 
          src="/hero-images/AI DHRUV.png" 
          alt="Dhruv" 
          className="absolute inset-0 h-full w-full object-contain object-center"
        />

        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[#06B6D4]/5 z-10 pointer-events-none mix-blend-overlay" />

        {/* Main hero content (Text at the bottom left) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="-ml-1 md:-ml-2 mb-2">
              <TypewriterName />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-xl md:text-3xl font-medium tracking-wide text-[#E5E7EB] drop-shadow-md"
            >
              Inspired to Serve. <br className="md:hidden" />Determined to <span className="font-cursive font-normal text-[#06B6D4] text-4xl md:text-6xl leading-[0.5]">Lead.</span>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
