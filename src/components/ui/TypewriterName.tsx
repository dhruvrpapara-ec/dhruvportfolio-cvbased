import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAMES = [
  "Dhruv Rupapara",
  "ध्रुव रुपापरा", // Hindi
  "ધ્રુવ રૂપાપરા"  // Gujarati
];

const FONTS = [
  "font-typewriter", // English
  "font-regional pt-8",   // Hindi (Yatra One)
  "font-gujarati pt-8"    // Gujarati (Farsan)
];

export function TypewriterName() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentName = NAMES[index];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentName.substring(0, text.length + 1));
        if (text === currentName) {
          setTimeout(() => setIsDeleting(true), 2000); // Wait 2s before deleting
        }
      } else {
        setText(currentName.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % NAMES.length);
        }
      }
    }, text === currentName ? 2000 : typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <div className="relative inline-flex items-center">
      <span className={`${FONTS[index]} text-[12vw] md:text-[6.5rem] leading-[0.92] tracking-tight text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]`}>
        {text}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-2 inline-block h-[12vw] w-[1vw] md:h-[8rem] md:w-[0.8rem] bg-[#06B6D4] drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
      />
    </div>
  );
}
