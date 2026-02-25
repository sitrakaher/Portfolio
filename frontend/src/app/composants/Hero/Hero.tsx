'use client'
import { useSplitReveal } from '@/Hooks/observer';
import Image from 'next/image'
import Link from 'next/link'
function Hero() {

  const visible = useSplitReveal("hero");

  return (
    <section id='hero' className='lg:px-20 pt-20 min-h-svh px-10'>

    <div className={`flex items-center lg:p-20 md:p-10  justify-center md:border-2 md:border-cyan-600 rounded-2xl md:shadow-lg md:shadow-cyan-900 transition-transform duration-800 ease-out ${visible ?"md:translate-y-0" : "md:-translate-y-full"}`}>
      <div className="flex-5 flex-col-reverse flex md:flex-row justify-center items-center gap-5">
      <div className="flex-3 flex flex-col items-center justify-center">
          <div className='flex flex-col gap-10 justify-between'>
              <div className='flex flex-col text-center md:text-left gap-6'>
                <h1 className='text-black font-semibold flex flex-col'>
                  <span className='text-cyan-600 text-3xl md:text-5xl font-bold'>RAKOTOARIVONY Sitraka Heriniaina</span>
                  <span className='font-bold text-2xl md:text-4xl'><br />Développeur FullStack Junior</span>
                </h1>
                <div className='text-lg'>
                <p className='text-lg'>Jeune 24ans, développeur FullStack JavaScript spécialsé en Nextjs • Reactjs • Node.js.</p>
                <p className='text-lg'>Je conçois des applications web modernes, perfromantes, sécurisées et scalables.</p>
                <p>Besoin d'un développeur Nextjs/Reactjs/Nodejs, toujours disponible.</p>
                <p><Link href="/#contact" className='underline font-bold' >Contactez-moi</Link>{" "} pour votre projet.</p>
                </div>
              </div>
              <Link href="/file/rakotoarivony sitraka heriniaina.pdf" download className='bg-linear-to-r from-cyan-600 to-cyan-300 flex items-center justify-center flex-row-reverse gap-2 hover:scale-105 px-6 py-2 rounded md:w-fit text-center text-white shadow-cyan-300 shadow-2xl'>
                <h3>Téléchager mon CV </h3>
                <Image src="/assets/downloads.png" alt="Download" width={32} height={32}/>
              </Link>
            </div>
      </div>
        
      <div className='flex-2 flex flex-col items-center justify-center'>
        <div className='relative w-64 h-80 md:w-80 md:h-96'>
            <Image
            fill
            src="/assets/Sitraka.jpg"
            alt="Photo d'identité"
            className='object-cover rounded-tl-[16rem] rounded-tr-[60rem] rounded-br-[16rem] rounded-bl-[40rem] blur-xl border-4 border-cyan-600'/>
            <Image
            fill
            src="/assets/Sitraka.jpg"
            alt="Photo d'identité"
            className='object-cover rounded-tl-[16rem] rounded-tr-[60rem] rounded-br-[16rem] rounded-bl-[40rem] border-4 border-cyan-600'/>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Hero

