"use client";

import { useEffect, useState } from "react";
import MotionSkill from "./motionSkill";
import { Skill } from "./skillType";
import { motion } from "framer-motion";
import { useContainerSize } from "@/Hooks/useContainerSize";
import useIsMobile from "@/Hooks/useIsMobile";


interface SkillsCircleProps {
  skills: Skill[];
}

export default function SkillsCircle({ skills }: SkillsCircleProps) {
  const [ref, { width }] = useContainerSize();
  const total = skills.length;
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile()

  const dynamicRadius =   typeof window !== "undefined" && isMobile
      ? 130
      : width / 2.6;
      
   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.5),
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (     
    <div
     id="competences" 
      ref={ref}
      className="relative max-w-[550] aspect-square mx-auto flex items-center justify-center"
    > 
      {/* Texte centre */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={visible ? { opacity: 1, scale: 1 }: { opacity: 0, scale: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute justify-center flex flex-col items-center"
      >
        <span className="text-balance sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center">
          Mes Outils en<br />Développement Full Stack
        </span>
      </motion.div>
 
      {skills.map((skill, index) => {
        const angle = (index / total) * (2 * Math.PI) - Math.PI /2;
        const x = Math.cos(angle)
        const y = Math.sin(angle)
 
        return (
          <div
            key={skill.title}
            className="absolute top-1/2 left-1/2 flex items-center justify-center"
            style={{
              transform: `translate(${x * dynamicRadius}px, ${y * dynamicRadius}px)`,
            }}
          >           
            <MotionSkill
              key={skill.id}
              {...skill}
              x={x}
              y={y}
              index={index}
              containerWidth={width}
              visible={visible}
            />
          </div>
        );
      })};
    </div>
  );
}
