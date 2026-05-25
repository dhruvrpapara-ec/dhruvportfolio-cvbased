import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticHoverCard } from "./MagneticHoverCard";

const projectsData = [
  {
    title: "NSS Connect Portal",
    desc: "CENTRALIZED PLATFORM FOR VOLUNTEER AND EVENT MANAGEMENT. REDUCED COORDINATION DELAYS THROUGH WORKFLOW AUTOMATION AND STRUCTURED REPORTING SYSTEMS.",
    image: "/hero-images/Projects/NSS Connect Portal.png"
  },
  {
    title: "RFID Smart Attendance",
    desc: "DESIGNED AND IMPLEMENTED AN RFID-ENABLED ATTENDANCE SYSTEM ON STM32F103 MICROCONTROLLER WITH REAL-TIME LOGGING AND LCD FEEDBACK.",
    image: "/hero-images/Projects/RFID Smart Attendance.png"
  },
  {
    title: "IoT Security System",
    desc: "SENSOR-BASED SECURITY SYSTEM FOR REAL-TIME INTRUSION DETECTION. IMPROVED RESPONSE EFFICIENCY THROUGH OPTIMIZED COMMUNICATION PROTOCOLS.",
    image: "/hero-images/Projects/IoT Security System.png"
  },
  {
    title: "CMOS D Flip-Flop",
    desc: "DESIGNED CMOS D FLIP-FLOPS IN CADENCE VIRTUOSO AND PERFORMED POWER & DELAY ANALYSIS ACROSS MULTIPLE TECHNOLOGY NODES FOR OPTIMIZATION.",
    image: "/hero-images/Projects/CMOS D Flip-Flop.png"
  },
  {
    title: "9 GHz Patch Antenna",
    desc: "DESIGNED AND SIMULATED A 9 GHZ INSET-FED MICROSTRIP PATCH ANTENNA FOR X-BAND APPLICATIONS WITH EFFECTIVE IMPEDANCE MATCHING AND STABLE RADIATION.",
    image: "/hero-images/Projects/9 GHz Patch Antenna.png"
  },
];

export function ProjectCards() {
  const total = projectsData.length;
  const rotationRange = 50;
  const offsetRange = 80;

  return (
    <section id="projects" className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden flex flex-col items-center">
      <div className="w-full text-center z-50 pointer-events-none mb-12">
        <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#06B6D4] mb-4">
          <span className="inline-block h-px w-12 bg-gradient-to-r from-transparent to-[#06B6D4]" />
          03 — Projects
          <span className="inline-block h-px w-12 bg-gradient-to-l from-transparent to-[#06B6D4]" />
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-white drop-shadow-lg">
          Engineering Work.<br />
          <span className="font-cursive font-normal text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#4C1D95] to-[#10B981] drop-shadow-md">
            That Ships & Scales.
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-[#A1A1AA] max-w-3xl font-medium mx-auto">
          Building robust hardware and software solutions from the ground up.
        </p>
      </div>

      {/* Cinematic Bento Grid */}
      <div className="mx-auto w-full max-w-7xl px-6 relative z-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((p, i) => {
            // First item takes up 2 columns on desktop
            const isFeatured = i === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
              >
                <MagneticHoverCard className="h-[400px] md:h-[450px] w-full flex flex-col justify-end p-0">
                  {/* Background Image that zooms on hover */}
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Dark Gradient Overlay for text readability */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Overlay */}
                  <div className="relative z-20 p-8 md:p-10 flex flex-col h-full justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-end gap-6">
                      <div className="flex-1">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#06B6D4] mb-3">
                          PROJECT
                        </div>
                        <h3 className="font-display text-white font-bold text-2xl md:text-4xl leading-tight mb-3 drop-shadow-md">
                          {p.title}
                        </h3>
                        <p className={`text-[#A1A1AA] text-xs md:text-sm font-medium leading-relaxed tracking-wide ${isFeatured ? 'max-w-xl' : 'line-clamp-3'}`}>
                          {p.desc}
                        </p>
                      </div>
                      
                      {/* Arrow Icon */}
                      <div className="hidden sm:flex flex-none items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </MagneticHoverCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
