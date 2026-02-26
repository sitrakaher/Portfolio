"use client"
import "../../../app/globals.css";
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/router';
import NavBar from "../AdminNavigation/navBar";

type Projects = {
    id:string,
    title:string,
    github:string,
    lienProjet:string,
    image:string,
    type:string,
    technologieIds:string[],
    technologies:Technologies[];
}

type Technologies = {
    id:string,
    title:string,
    href:string,
}

const Project = () => {

    const [projects, setProjects] = useState<Projects[]>([]);
    const [technologies, setTechnologies] =useState<Technologies[]>([]);
    const [modal, setModal]=useState(false);
	const [errors, setErrors]= useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingId, setIsEditingId] = useState(null);
	const [formData, setFormData] = useState(
		{
			title:"",
			github:"",
			lienProjet:"",
			image:"",
			type:"",
            technologieIds:[] as string[]
		}
	)
    const router = useRouter();

    const loadProject = async ()=>{
        const res = await api.get('/projects');
        setProjects(res.data);
    };

    const loadTechno = async () =>{
        const res = await api.get('/technologies');
        setTechnologies(res.data);
    }

    useEffect(()=>{

        const token = localStorage.getItem('token');

        if(!token) {
            router.push('/admin/login');
            return;
        }
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        loadProject();
        loadTechno();
    },[])

    if (!projects || !technologies) {
        return <p>chargmenet</p>
    }

    const technoDisponibles = (technologies).filter(
        (tech)=> !(formData.technologieIds || []).includes(tech.id)
    );

    const handleAjout = ()=>{
		setFormData({title:"", github:"", lienProjet:"", image:"", type:'', technologieIds:[]})
		setIsEditingId(null);
		setIsEditing(false);
		setModal(true);
    }

	const handleUpdate = (project:any) =>{
		setFormData({
			title:project.title,
			github:project.github,
			lienProjet:project.lienProjet,
			image:project.image,
			type:project.type,
            technologieIds:project.technologieIds || []
		})
		setIsEditing(true);
		setIsEditingId(project.id);
		setModal(true);
	}

	const handleSubmit = async (e:any) =>{
		e.preventDefault();
		const title = formData.title;
        const github = formData.github;
        const lienProjet = formData.lienProjet;
        const image = formData.image;
        const type = formData.type;
        const technologieIds = formData.technologieIds;

		const project = {
			title:title,
			github:github,
			lienProjet:lienProjet,
			image:image,
			type:type,
            technologieIds:technologieIds,
		}

		try {
			if (!title || !github || !lienProjet || !image) {
                setErrors(true);
			}
            else if(isEditing){
				await api.put(`/projects/modifier/${isEditingId}`, project);
			}
			else{
				await api.post("/projects/ajouter", project);
			}
			loadProject();
			setFormData({title:"", github:"", lienProjet:"", image:"", type:"", technologieIds:[]});
			setModal(false);
			setErrors(false);
			setIsEditing(false);
			setIsEditingId(null);
		} catch (error) {
			console.log(error);
		}
	}

	const handleDelete = async (id:string) =>{
		if(window.confirm("Voulez vous vraiment supprimer ce Projet")){
			try{
				await api.delete(`/projects/supprimer/${id}`);
				loadProject();
			}catch (error){
				console.log(error);	
			}
		}
	}

  return (
    <div>
        <NavBar/>
        <div className="px-20 py-10">
            <h1 className="uppercase text-3xl font-bold">DashBord Admin projects</h1>
            <button className=" mx-4 my-2 bg-emerald-500 p-2 text-white font-bold rounded" onClick={handleAjout}>Ajouter +</button>
            {modal && 
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <label htmlFor="title">Titre </label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="border-b focus:outline-none focus:bg-cyan-300 focus:shadow-cyan-300"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="level">Github</label>
                    <input 
                        type="text" 
                        name="github" 
                        id="github" 
                        value={formData.github} 
                        onChange={(e) => setFormData({...formData, github: (e.target.value)})}
                        className="border-b focus:outline-none focus:bg-cyan-300 focus:shadow-cyan-300"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="lienProjet">Projet</label>
                    <input 
                        type="text" 
                        name="lienProjet" 
                        id="lienProjet" 
                        value={formData.lienProjet} 
                        onChange={(e) => setFormData({...formData, lienProjet: e.target.value})}
                        className="border-b focus:outline-none focus:bg-gray-300 focus:shadow-cyan-300"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="image">Image</label>
                    <input 
                        type="text" 
                        name="image" 
                        id="image" 
                        value={formData.image} 
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="border-b focus:outline-none focus:bg-cyan-300 focus:shadow-cyan-300"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="type">Type</label>
                    <input 
                        type="text" 
                        name="type" 
                        id="image" 
                        value={formData.type} 
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="border-b focus:outline-none focus:bg-cyan-300 focus:shadow-cyan-300"
                    />
                </div>
                <div>
                    <select value="" onChange={(e)=>{
                        const id = e.target.value;
                        if (!id) return;
                        if (!formData.technologieIds.includes(id)) {
                            setFormData({
                                ...formData, technologieIds:[...formData.technologieIds, id]
                            });
                        }
                        }}>
                        <option value="" className="border-b">--ajouter une technologies</option>
                        {
                            technoDisponibles.map((tech)=>(
                                <option key={tech.id} value={tech.id} className="border-b">{tech.title}</option>
                            ))
                        }
                    </select>
                    <div className="flex flex-col w-fit">
                        {formData.technologieIds.map(id=>{
                            const t = technologies.find(tech => tech.id === id);
                            return(
                                <span key={id} className="border-b border-gray-300 gap-4 flex items-center p-1">
                                    {t?.title}
                                    <button type="button" className="text-white text-xl flex items-center bg-red-400 rounded-full px-2 scale-105" onClick={()=>{
                                        setFormData({...formData, technologieIds: formData.technologieIds.filter(i=>i !== id)})
                                    }}>x</button>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <button type="submit" className=" mx-4 my-2 bg-amber-500 p-2 text-white font-bold rounded">{isEditing ? "Modifier" : "Ajouter"}</button>
                    <button
                    type="button"
                    className="bg-gray-500 p-2 text-white rounded"
                    onClick={() => {setModal(false); setErrors(false);}}
                >
                    Annuler
                </button>
                </div>
            </form>
            }
            <table>
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center">Title</th>
                        <th className="px-4 py-2 text-center">GitHub</th>
                        <th className="px-4 py-2 text-center">Lien</th>
                        <th className="px-4 py-2 text-center">Image</th>
                        <th className="px-4 py-2 text-center">Type</th>
                        <th className="px-4 py-2 text-center">Technologies</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {projects.map((project)=>(
                    <tr key={project.id} className="border-t border-gray-200">
                        <td className='text-center py-2 px-4'>{project.title}</td>
                        <td className='text-center py-2 px-4'>{project.github}</td>
                        <td className='text-center py-2 px-4'>{project.lienProjet}</td>
                        <td className='text-center py-2 px-4'>{project.image}</td>
                        <td className='text-center py-2 px-4'>{project.type}</td>
                        <td className='text-center py-2 px-4'>{project.technologies?.map((t:any) => t.title).join(", ") || "Aucune"}</td>
                        <td className="px-4 py-2 gap-1 flex">
                            <button onClick={()=>handleDelete(project.id)} className="bg-red-500 hover:bg-red-600 p-2 text-white font-bold rounded cursor-pointer">Supprimer</button>
                            <button onClick={()=>handleUpdate(project)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-2 rounded cursor-pointer">Modifier</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
)
}

export default Project