import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Mail, Phone, Briefcase, ChevronRight } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { Navbar } from "./ui/Navbar";
import { ImageMarquee } from "./ui/ImageMarquee";
import { IntroSequence } from "./ui/IntroSequence";
import { MagneticHoverCard } from "./ui/MagneticHoverCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

function Section({
  id,
  label,
  title,
  cursive,
  subtitle,
  children,
  className = "",
}: {
  id: string;
  label: string;
  title: string;
  cursive?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-16 md:py-24 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="mb-14 md:mb-20 flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#06B6D4] justify-center">
          <span className="inline-block h-px w-12 bg-gradient-to-r from-transparent to-[#06B6D4]" />
          {label}
          <span className="inline-block h-px w-12 bg-gradient-to-l from-transparent to-[#06B6D4]" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display mt-4 text-4xl leading-[1.1] text-white md:text-6xl text-balance drop-shadow-md"
        >
          {title}
          {cursive && (
            <>
              <br />
              <span className="font-cursive font-normal text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#4C1D95] to-[#10B981] drop-shadow-md">
                {cursive}
              </span>
            </>
          )}
        </motion.h2>
        {subtitle && (
          <motion.p 
            variants={fadeUp}
            className="mt-6 text-lg md:text-2xl text-[#A1A1AA] max-w-3xl font-medium"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      {children}
    </section>
  );
}

function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Adjusted offset: starts animating when container top hits middle of screen, ends when bottom hits bottom of screen.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 90%"]
  });

  const text1 = "I am Dhruv Rupapara, a driven and visionary B.Tech undergraduate with a passion for leadership, management, and creating meaningful impact. Known for leading initiatives with confidence and discipline, I thrive in environments that challenge me to organize, inspire, and grow.";
  const text2 = "Through experiences in IEEE, NSS, and large-scale event management, I have developed strong skills in communication, teamwork, strategic planning, and people management. I believe true success is not only about personal achievements, but about inspiring others, creating opportunities, and building a legacy that makes people proud.";

  const words1 = text1.split(" ");
  const words2 = text2.split(" ");
  const totalWords = words1.length + words2.length;

  const getPillColor = (word: string) => {
    const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
    if (["driven", "visionary", "leadership", "management", "impact"].includes(cleanWord)) return "bg-[#06B6D4]/20 border-[#06B6D4]/50 text-[#06B6D4]";
    if (["confidence", "discipline", "organize", "inspire", "grow"].includes(cleanWord)) return "bg-[#4C1D95]/30 border-[#4C1D95]/50 text-[#A78BFA]";
    if (["communication", "teamwork", "strategic", "planning", "people"].includes(cleanWord)) return "bg-[#E11D48]/20 border-[#E11D48]/50 text-[#FB7185]";
    if (["success", "legacy", "opportunities", "proud"].includes(cleanWord)) return "bg-[#10B981]/20 border-[#10B981]/50 text-[#34D399]";
    return null;
  };

  const renderWord = (word: string, index: number) => {
    // Map the index accurately across the scroll range
    const start = index / totalWords;
    const end = start + (1 / totalWords);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
    const pillClass = getPillColor(word);

    if (pillClass) {
      return (
        <motion.span 
          key={index} 
          style={{ opacity }} 
          className={`inline-block mx-[2px] md:mx-1 px-3 py-0.5 rounded-full border ${pillClass} shadow-lg backdrop-blur-sm`}
        >
          {word}
        </motion.span>
      );
    }

    return (
      <motion.span key={index} style={{ opacity }} className="inline-block mx-[2px] md:mx-1">
        {word}
      </motion.span>
    );
  };

  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-24 bg-[#050505] min-h-[120vh]">
      <div className="sticky top-[25vh] mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mb-14 md:mb-20 flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#06B6D4] justify-center">
            <span className="inline-block h-px w-12 bg-gradient-to-r from-transparent to-[#06B6D4]" />
            01 — About
            <span className="inline-block h-px w-12 bg-gradient-to-l from-transparent to-[#06B6D4]" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 text-4xl leading-[1.1] text-white md:text-6xl text-balance drop-shadow-md"
          >
            A Motivated Leader.<br />
            <span className="font-cursive font-normal text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#4C1D95] to-[#10B981] drop-shadow-md">
              Shaping Outcomes.
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="mt-6 text-lg md:text-2xl text-[#A1A1AA] max-w-3xl font-medium"
          >
            Driving strategy, inspiring teams, and building a legacy.
          </motion.p>
        </motion.div>
        
        <div className="font-display text-lg md:text-2xl leading-relaxed md:leading-[1.8] text-white/90">
          <p className="mb-8 flex flex-wrap gap-y-2">
            {words1.map((w, i) => renderWord(w, i))}
          </p>
          <p className="flex flex-wrap gap-y-2">
            {words2.map((w, i) => renderWord(w, i + words1.length))}
          </p>
        </div>
      </div>
    </section>
  );
}

const experiences = [
  {
    period: "Aug 2024 – Sept 2025",
    role: "Chairperson – NSS Task Force (Student Executive Committee)",
    org: "CHARUSAT",
    points: [
      "Led the establishment of the NSS Task Force by structuring committees and execution frameworks.",
      "Directed 15+ large-scale initiatives involving over 500 volunteers across campus.",
      "Improved operational efficiency through strategic planning and cross-functional coordination.",
    ],
  },
  {
    period: "May 2025 – June 2026",
    role: "Founding Chairperson – IEEE CASS Student Branch Chapter",
    org: "CHARUSAT",
    points: [
      "Established and expanded the technical chapter from inception to 50+ active members.",
      "Organized 10+ technical workshops and events, significantly increasing student participation and engagement.",
      "Developed governance, operational structure, and technical outreach initiatives.",
    ],
  },
  {
    period: "Dec 2025 – Jun 2026",
    role: "Instructor & Teaching Assistant – CUUV101",
    org: "CHARUSAT",
    points: [
      "Conducted academic sessions for 450+ first-year engineering students.",
      "Designed structured learning modules and interactive activities to enhance engagement and leadership awareness.",
      "Assisted in curriculum delivery and academic coordination.",
    ],
  },
  {
    period: "2024 – June 2026",
    role: "Content & Social Media Lead – EC Department, CSPIT",
    org: "CHARUSAT",
    points: [
      "Designed digital creatives including posters, banners, and invitation materials for departmental activities.",
      "Managed Instagram and LinkedIn platforms to improve branding consistency and audience engagement.",
    ],
  },
  {
    period: "2023 – 2025",
    role: "Department Student Coordinator – NSS",
    org: "CSPIT EC Department",
    points: [
      "Coordinated communication between students and faculty members for smooth departmental operations.",
      "Assisted in planning and execution of academic and extracurricular activities.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-col gap-12 md:gap-16">
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
            02 — Experience
            <span className="inline-block h-px w-12 bg-gradient-to-l from-transparent to-[#06B6D4]" />
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="font-display mt-4 text-4xl leading-[1.1] text-white md:text-6xl text-balance drop-shadow-md"
          >
            Proven Track Record.<br />
            <span className="font-cursive font-normal text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#4C1D95] to-[#10B981] drop-shadow-md">
              Leadership & Action.
            </span>
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 text-lg md:text-2xl text-[#A1A1AA] max-w-3xl font-medium"
          >
            Impactful roles across IEEE, NSS, and academic initiatives.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experiences.map((e, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i}
              className="h-full"
            >
              <MagneticHoverCard className="p-8 md:p-10 h-full flex flex-col">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111] border border-[#ffffff10] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="h-5 w-5 text-[#4C1D95]" />
                  </div>
                  <span className="rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3 py-1 text-[11px] uppercase tracking-widest text-[#06B6D4]">
                    {e.period}
                  </span>
                </div>
                
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A78BFA] mb-2">{e.org}</div>
                <h3 className="font-display text-2xl leading-tight text-white mb-6 tracking-tight">
                  {e.role}
                </h3>
                
                <ul className="space-y-3 text-[0.95rem] text-[#A1A1AA] mt-auto">
                  {e.points.map((p, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#06B6D4]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              </MagneticHoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// External Sections
import { ProjectCards } from "./ui/ProjectCards";
import { EducationSection } from "./ui/EducationSection";
import { AchievementsSection } from "./ui/AchievementsSection";

const skills = {
  "Software & Tools": [
    "Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint",
    "Cadence Virtuoso", "MATLAB (Basic Knowledge)", "Canva (Professional Use)"
  ],
  "Core Competencies": [
    "Strategic Planning", "Team Leadership", "Operations Management",
    "Stakeholder Management", "Process Optimization", "Communication & Coordination",
    "Documentation Management"
  ],
};

function Skills() {
  return (
    <Section 
      id="skills" 
      label="05 — Skills" 
      title="Technical Depth."
      cursive="Tools & Capabilities."
      subtitle="A comprehensive stack for hardware design and software development."
    >
      <div className="grid gap-12 md:grid-cols-2 mt-10">
        {Object.entries(skills).map(([cat, items], i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
            className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#09090b] to-[#050505] border border-[#1F2937]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#06B6D4] mb-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#06B6D4]/30" />
              {cat}
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#06B6D4]/30" />
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              {items.map((s, j) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + j * 0.05, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="rounded-full border border-[#4C1D95]/60 bg-[#0F0A1F]/50 px-5 py-2.5 text-sm md:text-base font-medium text-[#E5E7EB] transition-all hover:bg-[#06B6D4] hover:border-[#06B6D4] hover:text-[#050505] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-default backdrop-blur-sm"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32 md:py-44 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(76,29,149,0.3)_0%,rgba(5,5,5,0)_70%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 rounded-3xl border border-[#1F2937] bg-[#09090b]/80 backdrop-blur-xl p-10 md:p-20 text-center shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4] mb-8">
          <span className="inline-block h-px w-12 bg-gradient-to-r from-transparent to-[#06B6D4]" />
          07 — Contact
          <span className="inline-block h-px w-12 bg-gradient-to-l from-transparent to-[#06B6D4]" />
        </div>
        <h2 className="font-display text-5xl leading-tight text-white md:text-7xl text-balance mx-auto max-w-3xl">
          Let's build <span className="italic text-[#06B6D4]">something</span> together.
        </h2>
        <p className="mt-6 mx-auto max-w-xl text-lg text-[#E5E7EB]/80">
          Open to leadership roles, collaborations, MBA conversations, and engineering opportunities.
          The fastest way to reach me is email.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <a
            href="mailto:dhruvrupapara.ec@gmail.com"
            title="Email"
            className="group inline-flex items-center justify-center rounded-full bg-[#06B6D4] p-5 font-semibold text-[#050505] transition-all hover:scale-110 hover:bg-[#E5E7EB] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/dhruv-rupapara"
            target="_blank" rel="noreferrer"
            title="LinkedIn"
            className="group inline-flex items-center justify-center rounded-full border border-[#06B6D4] p-5 font-semibold text-[#06B6D4] transition-all hover:scale-110 hover:bg-[#06B6D4]/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/dhrv.20_"
            target="_blank" rel="noreferrer"
            title="Instagram"
            className="group inline-flex items-center justify-center rounded-full border border-[#E1306C] p-5 font-semibold text-[#E1306C] transition-all hover:scale-110 hover:bg-[#E1306C]/10 hover:shadow-[0_0_20px_rgba(225,48,108,0.3)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a
            href="https://www.snapchat.com/add/xlx_dhrvzzbliss?share_id=dxKho6mEyFQ&locale=en-US"
            target="_blank" rel="noreferrer"
            title="Snapchat"
            className="group inline-flex items-center justify-center rounded-full border border-[#FFFC00] p-5 font-semibold text-[#FFFC00] transition-all hover:scale-110 hover:bg-[#FFFC00]/10 hover:shadow-[0_0_20px_rgba(255,252,0,0.3)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>
          </a>
          <a
            href="https://www.facebook.com/rupapara.dhruv.50?mibextid=ZbWKwL"
            target="_blank" rel="noreferrer"
            title="Facebook"
            className="group inline-flex items-center justify-center rounded-full border border-[#1877F2] p-5 font-semibold text-[#1877F2] transition-all hover:scale-110 hover:bg-[#1877F2]/10 hover:shadow-[0_0_20px_rgba(24,119,242,0.3)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </motion.div>

      <footer className="mt-32 flex flex-col justify-between gap-4 border-t border-[#1F2937] pt-8 text-sm font-medium text-[#4C1D95] md:flex-row text-center md:text-left">
        <div>© {new Date().getFullYear()} Dhruv Rupapara. All rights reserved.</div>
        <div>Rajkot, Gujarat, India · +91 63539 33976</div>
      </footer>
    </section>
  );
}

export default function Portfolio() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [introComplete]);

  if (!introComplete) {
    return <IntroSequence onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      id="top" 
      className="relative w-full overflow-x-hidden bg-[#050505] text-[#E5E7EB]"
    >
      <Navbar />
      <HeroSection />
      <ImageMarquee />
      <About />
      <Experience />
      <ProjectCards />
      <EducationSection />
      <Skills />
      <AchievementsSection />
      <Contact />
    </motion.main>
  );
}
