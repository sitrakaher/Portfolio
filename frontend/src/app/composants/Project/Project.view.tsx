"use client"
import { api } from '@/lib/api';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Projects ={
    title:string,
    github:string,
    lienProjet:string,
    image:string;
    type:string;
    technologieIds:string[],
    technologies:Technologies[];
}

type Technologies = {
    id:string,
    title:string,
    href:string,
}


const Projet = () => {
    const [projects, setProjects] = useState<Projects[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const loadProject = async () =>{
        setLoading(true)
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (error) {
            console.error(error)
            setErrors("Erreur lors du récupération des Projets")
        } finally{
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        loadProject();
    },[])
    
  return (
    <section id='projet' className='flex flex-col min-h-svh justify-center items-center py-10 lg:p-10 lg:px-20'>
        <div>
            <div className="flex items-center justify-center gap-4">
                <Image src="/assets/requirements.png" alt="Réalisations" width={46} height={46}/> 
                <h2  className='text-3xl font-bold md:text-4xl'>Mes Réalisations</h2>
            </div>           
            <div  className='flex flex-col md:flex-row p-10 gap-10'>
            {loading ? <span className='text-center text-balance md:text-xl'>Chargments des projets encours...</span>: projects.map((projet) =>(
                <div key={projet.title} className='relative group perspective-midrange'>
                    <div className='relative min-h-92 origin-bottom rounded-tr-2xl rounded-bl-2xl transition-all duration-500 ease-in-out hover:rotate-x-12 hover:brightness-100 max-w-80 h-auto bg-white flex flex-col justify-between items-center'>
                        <Image 
                            src={projet.image} 
                            alt='description'
                            width={512} 
                            height={512}
                            className='flex justify-center items-center p-6'
                        />
                        <div className='relative object-contain bg-cyan-950 w-full text-white flex flex-col justify-between rounded-bl-2xl min-h-46 overflow-hidden'>
                            <h2 className='flex items-center justify-center font-semibold text-center p-2'>
                                {projet.title}
                            </h2>
                            <div className='flex flex-col items-center py-2 gap-2'>
                                <div className='flex items-center'>
                                    <span className='flex flex-wrap items-center justify-center flex-1 hover:scale-105'>
                                        {projet.technologies?.map((t)=>(
                                            <Image key={t.id} src={t.href} alt={t.title} width={24} height={24} className='rounded-full'/>
                                        ))}
                                    </span>
                                    <div className='flex gap-2 items-center justify-center'>
                                        <Link href={projet.github} >
                                            <Image src="/assets/github.png" alt='Github' width={32} height={32} className='hover:scale-105'/>
                                        </Link> 
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-2'>
                                    <div>
                                        {projet.type === "PORTFOLIO" 
                                    ? 
                                    <p className='bg-linear-to-r from-cyan-600 text-white flex items-center justify-center to-cyan-300 px-4 py-1 rounded w-auto md:w-fit text-center'>
                                        <span >
                                            Vous y êtes
                                        </span>
                                    </p>
                                    : projet.type === "LOCAL"
                                    ? <p className='bg-linear-to-r from-cyan-600 to-cyan-300 text-white flex items-center justify-center px-4 py-1 rounded w-auto md:w-fit text-center'>Local</p> 
                                    : <Link href={projet.lienProjet} className='bg-linear-to-r from-cyan-600 to-cyan-300 text-white flex items-center justify-center px-4 py-1 rounded w-auto md:w-fit text-center'>
                                        Consulter
                                    </Link>}
                                    </div>
                                    <button className='border px-2 py-4'>Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Projet