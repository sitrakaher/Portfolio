"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Skill } from "./skillType";
import useIsMobile from "@/Hooks/useIsMobile";

interface MotionSkillProps extends Skill {
  x: number;
  y: number;
  index:number;
  containerWidth: number;
  visible:any;
}

export default function MotionSkill({
  title,
  href,
  level,
  description,
  x,
  y,
  visible,
}: MotionSkillProps) {
  const isMobile = useIsMobile();
  const size = isMobile ? 60 : 80;
  const radius = isMobile ? 26 : 34;
  const stroke = isMobile ? 5 : 6;

  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - level / 100);

  return (
    <motion.div
      className="absolute group"
      initial={{ opacity: 0, 
        x: x * 40,
        y: y * 40, }}
        
      animate={isMobile ?(
        visible 
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: x * 30, y: y * 30}) : (visible
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: x * 80, y: y * 80})
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1,
      }}

    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="transparent"
          />

          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#0092b8"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: visible ? offset : circumference,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
          />
        </svg>
        <label htmlFor="id">
        <Image src={href} alt={title} width={56} height={56} className="rounded-full"/>
        </label>
        <div className="absolute bg-gray-400/75 h-auto p-4 opacity-0 items-center justify-center flex flex-col group-hover:opacity-100">
          <h2>{title}</h2>
          <span>{level}%</span>
          <p>{description}</p>
      </div>
      </div>
      
    </motion.div>
  );
}
