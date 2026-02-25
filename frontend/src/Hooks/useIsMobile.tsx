"use client"
import { useEffect, useState } from 'react'

const useIsMobile = () => {
    const [isMobile, SetIsMobile] = useState(false);
    
    useEffect(()=>{
        const check = () => SetIsMobile(window.innerWidth<640);
        check();
        window.addEventListener("resize", check);
        return ()=>window.removeEventListener("resize", check);
    }, []);
  return isMobile;
}

export default useIsMobile