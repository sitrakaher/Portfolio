"use client";

import { useEffect, useState } from "react";
import { Skill } from "./skillType";
import { api } from "@/lib/api"; 
import {motion} from"framer-motion";
import SkillsCircle from "./SkillCircle";
import Image from "next/image";
type Stacks = [
  Frontend:string,
  Backend:string,
]
const Stacks:any = {
  Frontend:[
    "Next.js",
    "React.js",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "Responsive Design",
    "State Management"
  ],
  Backend:[
    "Node.js",
    "Express.js",
    "FastAPI",
    "Python",
    "RESTful API",
    "JWT Authentication",
    "Middleware",
    "Input Validation"
  ],
  "Base de données":[
    "MongoDB",
    "MySQL",
    "Postgresql",
    "Prisma ORM",
    "SQLAlchemy",
    "Database Modeling"
  ],
  "Tools & Workflow":[
    "Git & GitHub",
    "Docker",
    "GitHub Actions",
    "CI/CD Pipelines",
  ]
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get<Skill[]>("/technologies/favoris"); // Endpoint Node.js
        setSkills(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des compétences favoris");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
  <section id="competences"  className="relative scroll-mt-20">
    <div className="py-10">
      <motion.div className="flex flex-col text-center"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5}}
      >
        <div className="flex items-center justify-center gap-2">
          <Image src="/assets/skill.png" alt="contact" width={46} height={46}/>
          <h2 className="text-2xl md:text-4xl font-bold">Mes Compétences</h2>
        </div>
        <p>J'utilise des outils performants et professionnels pour créer une valeur à votre idée</p>
      </motion.div>
    </div>

    <div>
      { loading ? (
          <div className="h-24 flex items-center justify-center">
            <p>Chargement des compétences favoris..</p>
          </div>
      ): error? (
        <p className="text-center py-20 text-red-500">{error}</p>
      ):(
        <SkillsCircle skills={skills} />
      )}
    </div>

    <div className="pt-10 p-10">
      <h1 className="font-bold text-3xl lg:text-4xl flex justify-center">Stack Téchnique</h1>
      <div className="flex flex-col md:flex-row gap-4 py-6 md:gap-2 justify-center"> 
        {Object.keys(Stacks).map((category, index)=>(
          <div className="border-l p-4 rounded-2xl bg-gray-200" key={index}>
              <h1 className="font-semibold text-xl">{category}</h1>
              <div className="px-4">
                {Stacks[category].map((stack:string, index:any)=>(
                  <ul key={index}>
                    <li>{stack}</li>
                  </ul>
                ))}
              </div>
          </div>
        ))}
      </div>
    </div>
    
    <div>
      <span className="relative flex justify-center items-center">
        <hr className='absolute md:w-3xl w-xs border'/>
      </span>
    </div>
  </section>
  )
}
