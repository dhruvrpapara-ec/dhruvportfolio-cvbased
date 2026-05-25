import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type IntroSequenceProps = {
  onComplete: () => void;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState(0);
  
  // 0: init (dark)
  // 1: left_reveal (Faith, Peace, Hope)
  // 2: lines_to_middle
  // 3: middle_reveal (Gratitude, Humility)
  // 4: lines_to_soul
  // 5: soul_reveal
  // 6: bloom (Soul expands, screen lights up)
  // 7: fade_out

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      await wait(300); if (!isMounted) return; setPhase(1);
      await wait(600); if (!isMounted) return; setPhase(2);
      await wait(400); if (!isMounted) return; setPhase(3);
      await wait(600); if (!isMounted) return; setPhase(4);
      await wait(400); if (!isMounted) return; setPhase(5);
      await wait(800); if (!isMounted) return; setPhase(6);
      await wait(600); if (!isMounted) return; setPhase(7);
      await wait(500); if (!isMounted) return; onComplete();
    };
    sequence();
    return () => { isMounted = false; };
  }, [onComplete]);

  // Coordinates management for SVG lines
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<Record<string, HTMLDivElement | null>>({});
  const [coords, setCoords] = useState<Record<string, { x: number; y: number }>>({});

  const registerRef = (id: string, el: HTMLDivElement | null) => {
    nodesRef.current[id] = el;
  };

  const updateCoords = () => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const newCoords: Record<string, { x: number; y: number }> = {};
    
    Object.keys(nodesRef.current).forEach((id) => {
      const el = nodesRef.current[id];
      if (el) {
        const rect = el.getBoundingClientRect();
        newCoords[id] = {
          x: rect.left + rect.width / 2 - svgRect.left,
          y: rect.top + rect.height / 2 - svgRect.top,
        };
      }
    });
    setCoords(newCoords);
  };

  useEffect(() => {
    // Run multiple times during initial render to ensure exact layout coordinates
    const timers = [
      setTimeout(updateCoords, 50),
      setTimeout(updateCoords, 500),
      setTimeout(updateCoords, 1000)
    ];
    window.addEventListener("resize", updateCoords);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", updateCoords);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase >= 7 ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        phase >= 6 ? "bg-[#ffffff05]" : "bg-[#020202]"
      }`}
    >
      {/* Ambient background particles/glows */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: phase >= 6 
            ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)" 
            : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 70%)"
        }}
        transition={{ duration: 0.6 }}
      />

      {/* SVG Layer for Connections */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <Connection coords={coords} from="faith" to="gratitude" phase={phase} drawPhase={2} glowPhase={6} />
        <Connection coords={coords} from="faith" to="humility" phase={phase} drawPhase={2} glowPhase={6} />
        <Connection coords={coords} from="peace" to="gratitude" phase={phase} drawPhase={2} glowPhase={6} />
        <Connection coords={coords} from="peace" to="humility" phase={phase} drawPhase={2} glowPhase={6} />
        <Connection coords={coords} from="hope" to="gratitude" phase={phase} drawPhase={2} glowPhase={6} />
        <Connection coords={coords} from="hope" to="humility" phase={phase} drawPhase={2} glowPhase={6} />
        
        <Connection coords={coords} from="gratitude" to="soul" phase={phase} drawPhase={4} glowPhase={6} />
        <Connection coords={coords} from="humility" to="soul" phase={phase} drawPhase={4} glowPhase={6} />
      </svg>

      {/* HTML Nodes Layer */}
      <div className="w-full h-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 p-12 md:p-20 relative z-20">
        
        {/* Left Layer */}
        <div className="flex flex-row md:flex-col gap-6 md:gap-16 justify-center w-full md:w-auto">
          <Node id="faith" label="Faith" phase={phase} appearPhase={1} glowPhase={6} registerRef={registerRef} />
          <Node id="peace" label="Peace" phase={phase} appearPhase={1} glowPhase={6} registerRef={registerRef} />
          <Node id="hope" label="Hope" phase={phase} appearPhase={1} glowPhase={6} registerRef={registerRef} />
        </div>

        {/* Middle Layer */}
        <div className="flex flex-row md:flex-col gap-10 md:gap-24 justify-center w-full md:w-auto">
          <Node id="gratitude" label="Gratitude" phase={phase} appearPhase={3} glowPhase={6} registerRef={registerRef} />
          <Node id="humility" label="Humility" phase={phase} appearPhase={3} glowPhase={6} registerRef={registerRef} />
        </div>

        {/* Final Layer */}
        <div className="flex justify-center w-full md:w-auto">
          <Node id="soul" label="Soul" phase={phase} appearPhase={5} glowPhase={6} isSoul registerRef={registerRef} />
        </div>

      </div>
    </motion.div>
  );
}

// --- Subcomponents ---

function Node({ 
  id, label, phase, appearPhase, glowPhase, isSoul = false, registerRef 
}: { 
  id: string, label: string, phase: number, appearPhase: number, glowPhase: number, isSoul?: boolean, registerRef: any 
}) {
  const isVisible = phase >= appearPhase;
  const isGlowing = phase >= glowPhase;

  return (
    <motion.div
      ref={(el) => registerRef(id, el)}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
      animate={
        isVisible 
          ? { opacity: 1, filter: "blur(0px)", scale: isSoul && phase >= 6 ? 1.2 : 1 }
          : { opacity: 0, filter: "blur(20px)", scale: 0.9 }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        relative px-6 py-4 md:px-12 md:py-6 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500
        ${isVisible && !isSoul ? 'border-white/10 bg-[#111111]/80 backdrop-blur-xl shadow-2xl' : 'border-transparent bg-transparent'}
        ${isVisible && isSoul && phase < 6 ? 'border-white/30 bg-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)]' : ''}
        ${isGlowing && !isSoul ? 'shadow-[0_0_30px_rgba(255,255,255,0.15)] border-white/30 bg-[#222222]/80' : ''}
        ${isSoul && phase >= 6 ? 'bg-white border-white shadow-[0_0_150px_rgba(255,255,255,0.8)]' : ''}
      `}
    >
      <span className={`
        font-display text-sm md:text-xl font-medium tracking-[0.2em] uppercase transition-colors duration-1000 relative z-10
        ${isSoul && phase >= 6 ? 'text-black font-bold' : 'text-white'}
      `}>
        {label}
      </span>
      
      {/* Soft breathing background pulse for input nodes */}
      {isVisible && !isSoul && !isGlowing && (
        <motion.div
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 pointer-events-none"
        />
      )}
    </motion.div>
  );
}

function Connection({ 
  coords, from, to, phase, drawPhase, glowPhase 
}: { 
  coords: Record<string, {x: number, y: number}>, from: string, to: string, phase: number, drawPhase: number, glowPhase: number 
}) {
  const isDrawn = phase >= drawPhase;
  const isGlowing = phase >= glowPhase;
  
  if (!coords[from] || !coords[to]) return null;

  const { x: x1, y: y1 } = coords[from];
  const { x: x2, y: y2 } = coords[to];

  return (
    <g>
      {/* Base faint connection line */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isDrawn ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      
      {/* Traveling energy pulse */}
      {isDrawn && phase < glowPhase && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2"
          strokeDasharray="15 1000"
          initial={{ strokeDashoffset: 1015 }}
          animate={{ strokeDashoffset: -15 }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "linear",
            delay: (Math.random() * 0.2) // slight stagger for organic feel
          }}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}
        />
      )}

      {/* Solid illuminated line when Soul activates */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isGlowing ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
      />
    </g>
  );
}
