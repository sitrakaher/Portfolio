"use client"

import { useEffect, useState } from "react";

export function useSplitReveal (sectionId:string) {
  const [visible, setVisible] = useState(false);
    useEffect(()=>{
      const section = document.getElementById(sectionId);
      if(!section) return;
  
      const observer = new IntersectionObserver(
        ([entry])=>{
          setVisible(entry.isIntersecting);
        },
        {
          threshold:[0.5],
        }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }, [sectionId]);
  return visible;
}