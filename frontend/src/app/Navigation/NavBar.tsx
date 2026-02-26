"use client"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {

  const menuItems = [
    {label:"Accueil", href:"/#hero", icon:"/assets/home.png" },
    {label:"Compétences", href:"/#competences", icon:"/assets/skill.png"},
    {label:"Projet", href:"/#projet", icon:'/assets/requirements.png'},
    {label:"Contact", href:"/#contact", icon:'/assets/phone-call.png'},
  ]

  const [activeId, setActiveId] = useState("");
  const isCliking = useRef(false);

  useEffect(()=>{
    const observer = new IntersectionObserver(
      (entries) => {
        if (isCliking.current) return;
        const intersectingEntry = entries.find(entry=> entry.isIntersecting);

          if (intersectingEntry) {
            setActiveId(intersectingEntry.target.id);
            window.history.replaceState(null, '', `#${intersectingEntry.target.id}`);
          }
      },
      {rootMargin: '-20% 0% -40% 0%', threshold:0.1}
    );

    menuItems.forEach((item)=>{
      const id =item.href.replace(/[\/#]/g, '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return ()=> observer.disconnect();
  }, []);

  const handleLickClick = (e:React.SubmitEvent, id:any) =>{
    e.preventDefault();
    isCliking.current = true;
    setActiveId(id);
    window.history.pushState(null, '', `#${id}`);

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior:"smooth"
      })
    }
    setTimeout(()=> {isCliking.current = false;}, 800);
  };

  return (
    <nav className='fixed top-0 left-0 right-0 md:w-full justify-center flex p-2 z-50'>
      <div className='max-w-fit w-[95%] bg-white border flex items-center justify-center border-cyan-600 px-4 py-2 rounded-full backdrop-blur-2xl shadow-cyan-100 shadow-2xl'>
        <ul className='flex gap-4'>
        {menuItems.map((item) =>{
          const id = item.href.replace(/[\/#]/g, '');
          const isActive = activeId === id;

          return( 
            <li key={id}>
              <a 
              href={item.href}
              onClick={(e:any)=> handleLickClick(e, id)}
              className={`flex flex-col items-center justify-center transition-all ${
                isActive ? "text-white bg-cyan-600 rounded-full font-bold p-2 " :"hover:bg-cyan-600 hover:text-white hover:font-bold py-2 px-4 rounded-full"
              }`}
              >
                <span className='sm:hidden text-2xl'>
                  <Image src={item.icon} alt={item.label} width={32} height={32}/>
                </span>
                <span className='hidden sm:block text-sm uppercase items-center justify-center'>
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
      </div>
    </nav>
  )
}
