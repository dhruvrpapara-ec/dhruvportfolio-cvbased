import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { MagneticHoverCard } from "./MagneticHoverCard";

const education = [
  { degree: "B.Tech — Electronics & Communication Engineering", school: "Charotar University of Science and Technology (CHARUSAT)", loc: "Anand, Gujarat", years: "2023 – 2027" },
  { degree: "Higher Secondary — Science Stream", school: "The Imperial Science School", loc: "Dhoraji, Gujarat", years: "2021 – 2023" },
  { degree: "Secondary Education", school: "The Imperial Science School", loc: "Dhoraji, Gujarat", years: "2019 – 2021" },
  { degree: "Primary Education", school: "J.B. Diamonds & KARP Impex Vidya Sankul", loc: "Surat, Gujarat", years: "2014 – 2019" },
  { degree: "Primary Education", school: "Shree Kailash Vidhyalay", loc: "Rajkot, Gujarat", years: "2011 – 2014" },
];

function EducationCard({ e, i, left }: { e: any, i: number, left: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative md:grid md:grid-cols-2 md:gap-16 items-center"
    >
      {/* Glowing Pulse Node on Timeline */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
        className="absolute left-[28px] md:left-1/2 top-1/2 -translate-y-1/2 z-20 -translate-x-1/2"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06B6D4] opacity-50 duration-1000" />
          <span className="relative inline-flex h-4 w-4 rounded-full border-[2px] border-[#050505] bg-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,1)]" />
        </span>
      </motion.div>

      {/* Connecting Horizontal Line (Desktop) */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] w-8 bg-gradient-to-r ${left ? "from-transparent to-[#06B6D4]/50 left-[calc(50%-2rem)]" : "from-[#06B6D4]/50 to-transparent right-[calc(50%-2rem)]"}`} />

      {/* Years and Location (Desktop Only) */}
      <div className={`hidden md:block ${left ? "md:order-1 md:text-right md:pr-16" : "md:order-2 md:pl-16"}`}>
        <div className="font-display text-4xl font-bold text-white tracking-tight drop-shadow-md">{e.years}</div>
        <div className="mt-2 text-sm uppercase tracking-[0.2em] font-semibold text-[#06B6D4]">{e.loc}</div>
      </div>

      {/* Glassmorphism Details Card */}
      <div className={`relative ${left ? "md:order-2 md:ml-12" : "md:order-1 md:mr-12"} ml-20 md:ml-0 group perspective-1000`}>
        <MagneticHoverCard className="p-8 md:p-10 h-full flex flex-col">
          <div className="relative z-10">
            {/* Mobile Years & Location */}
            <div className="md:hidden mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
              <span className="font-display text-lg text-white">{e.years}</span>
              <span className="text-[#4C1D95]">•</span>
              <span>{e.loc}</span>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 bg-[#111] p-2 rounded-xl border border-[#ffffff10] shadow-inner group-hover:border-[#06B6D4]/50 transition-colors">
                <GraduationCap className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl group-hover:text-[#06B6D4] transition-colors duration-300 drop-shadow-sm">
                {e.degree}
              </div>
            </div>
            
            <div className="text-base text-[#A1A1AA] font-medium tracking-wide mb-6 pl-12">
              {e.school}
            </div>

            {e.highlight && (
              <div className="pl-12 mt-auto text-xs md:text-sm text-[#E5E7EB] font-medium opacity-80 uppercase tracking-widest border-l-2 border-[#06B6D4]/30">
                <span className="pl-4 inline-block">{e.highlight}</span>
              </div>
            )}
          </div>
        </MagneticHoverCard>
      </div>
    </motion.div>
  );
}

export function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="relative w-full bg-[#050505] py-16 md:py-24 overflow-hidden font-sans">
      {/* Ambient Floating Gradients */}
      <div className="absolute top-1/4 left-0 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.05)_0%,rgba(0,0,0,0)_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(76,29,149,0.05)_0%,rgba(0,0,0,0)_70%)] blur-[120px] pointer-events-none" />
      
      <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
        
        {/* Cinematic Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
          className="mb-14 md:mb-20 flex flex-col items-center text-center"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#06B6D4] justify-center">
            <span className="inline-block h-px w-12 bg-gradient-to-r from-transparent to-[#06B6D4]" />
            04 — Education
            <span className="inline-block h-px w-12 bg-gradient-to-l from-transparent to-[#06B6D4]" />
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="font-display mt-4 text-4xl leading-[1.1] text-white md:text-6xl text-balance drop-shadow-md"
          >
            Years of Education.<br />
            <span className="font-cursive font-normal text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#4C1D95] to-[#10B981] drop-shadow-md">
              A Lifetime of Vision.
            </span>
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 text-lg md:text-2xl text-[#A1A1AA] max-w-3xl font-medium"
          >
            Every institution shaped discipline, leadership, and purpose.
          </motion.p>
        </motion.div>

        {/* Timeline & Cards */}
        <div ref={ref} className="relative w-full">
          {/* Main Vertical Timeline Track */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#ffffff05] -translate-x-1/2" />
          
          {/* Animated Glowing Fill Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[28px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#06B6D4] to-[#4C1D95] -translate-x-1/2 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10"
          />

          <div className="space-y-12 md:space-y-16 py-10">
            {education.map((e, i) => (
              <EducationCard key={i} e={e} i={i} left={i % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Cinematic Finishing Touch */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-32 md:mt-48 text-center"
        >
          <h3 className="font-display text-4xl md:text-6xl font-bold text-[#E5E7EB] tracking-tight leading-tight">
            <span className="opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default">Still learning.</span><br />
            <span className="opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default">Still growing.</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A1A1AA] drop-shadow-lg">Still building the future.</span>
          </h3>
        </motion.div>
        
      </div>
    </section>
  );
}
