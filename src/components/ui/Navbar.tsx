import { motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className={clsx(
        "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300",
        isScrolled && "rounded-full border border-[#1F2937] bg-[#09090b]/80 backdrop-blur-md px-6 py-3 shadow-[0_4px_30px_rgba(6,182,212,0.15)] mx-4 md:mx-auto"
      )}>
        <a
          href="#top"
          className="flex items-center gap-3 font-display text-xl text-white transition-transform hover:scale-105"
        >
          <img src="/hero-images/IMGS/DR-Logo.png" alt="Dhruv Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
          <span>Dhruv<span className="text-[#06B6D4]">.</span></span>
        </a>
        
        <ul className="hidden items-center gap-8 text-sm font-medium text-[#9CA3AF] md:flex">
          {[
            ["About", "#about"],
            ["Experience", "#experience"],
            ["Projects", "#projects"],
            ["Skills", "#skills"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <li key={label}>
              <a href={href} className="transition-colors hover:text-[#06B6D4]">
                {label}
              </a>
            </li>
          ))}
        </ul>
        
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full bg-[#06B6D4] px-4 py-2 text-sm font-semibold text-[#050505] transition-all hover:bg-[#E5E7EB] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
        >
          Get in touch
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.header>
  );
}
