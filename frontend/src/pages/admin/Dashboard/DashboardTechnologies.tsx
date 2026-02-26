"use client"
import "../../../app/globals.css";
import { api } from '@/lib/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import NavBar from "../AdminNavigation/navBar";

type Technology = {
    id:string;
    title:string;
    href:string;
    description:string;
    level:number;
    isFavorite:boolean;
}

const Technologies = () => {

    const router = useRouter();
    const [technology, setTechnology]=useState<Technology[]>([]);
    const [modal, setModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState(false);
    const [formData, setFormData] = useState({
        title:"",
        href:"",
        level:"",
        description:"",
        isFavorite:false,
    });
    
    const loadTechno = async () =>{
        const res = await api.get("/technologies");
        setTechnology(res.data);
    };

    useEffect(()=>{
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/admin/login");
            return;
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        loadTechno();
    },[]);

    const handleAjout = () =>{
        setFormData({title:"", href:"", level:"", description:"", isFavorite:false});
        setEditingId(null);
        setIsEditing(false);
        setModal(true);
    }

    const deleteTechno = async (id:string) =>{
        if(window.confirm("Voulez vous vraiment supprimer ce langage?")){
            try{
                await api.delete(`/technologies/supprimer/${id}`);
                loadTechno();
            }catch (error: any) {
            console.error("AXIOS ERROR:", error.response?.data || error.message);
            }

        }
    }

    const updateTechno = (techno:any) =>{
        setFormData({
            title: techno.title,
            level: techno.level,
            href:techno.href,
            description:techno.description,
            isFavorite:techno.isFavorite,
        })
        setEditingId(techno.id);
        setIsEditing(true);
        setModal(true);
    }

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        const title = formData.title;
        const href = formData.href;
        const level = formData.level;
        const description = formData.description;
        const isFavorite = formData.isFavorite;
        
        const techno = {
            title: title,
            href: href,
            level: Number(level),
            description:description,
            isFavorite:Boolean(isFavorite)

        };
        try {
            if (!title || !href || !level || !description) {
            setErrors(true);
        }else{
            if(isEditing){
                await api.put(`/technologies/modifier/${editingId}`, techno);
            }
            else{
                await api.post("/technologies/ajouter", techno);
            }
            loadTechno();
            setFormData({title:"", href:"", level:"", description:"", isFavorite:false});
            setModal(false);
            setErrors(false);
            setEditingId(null);
            setIsEditing(false);

        }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <main id='technologies' className="relative">
        <NavBar/>
		<div className="px-20 py-10">
        <h1 className="uppercase text-3xl font-bold">DashBord Admin Technologies</h1>
        <button className=" mx-4 my-2 bg-emerald-500 p-2 text-white font-bold rounded" onClick={handleAjout}>Ajouter +</button>
        {errors && <span className="bg-red-500 text-white p-4 rounded">Tous les champs sont obligatoire</span>}
        {modal && <form className="flex flex-col" onSubmit={handleSubmit}>
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
                        <label htmlFor="level">Niveau</label>
                        <input 
                            type="number" 
                            name="level" 
                            id="level" 
                            value={formData.level} 
                            onChange={(e) => setFormData({...formData, level: (e.target.value)})}
                            className="border-b focus:outline-none focus:bg-cyan-300 focus:shadow-cyan-300"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="href">Lien</label>
                        <input 
                            type="text" 
                            name="href" 
                            id="href" 
                            value={formData.href} 
                            onChange={(e) => setFormData({...formData, href: e.target.value})}
                            className="border-b focus:outline-none focus:bg-gray-300 focus:shadow-cyan-300"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            name="description" 
                            id="description" 
                            value={formData.description} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="border-b focus:outline-none focus:bg-cyan-300 focus:shadow-cyan-300"
                        />
                    </div>
                    <div>
                        <input type="checkbox" name="isFavorite" checked={formData.isFavorite} onChange={(e)=> setFormData({...formData, isFavorite:e.target.checked})}/>
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
                </form>}
        <table>
            <thead>
                <tr>
                    <th className="px-4 py-2 text-center">Title</th>
                    <th className="px-4 py-2 text-center">Link</th>
                    <th className="px-4 py-2 text-center">Level</th>
                    <th className="px-4 py-2 text-center">description</th>
                    <th className="px-4 py-2 text-center">Favoris</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {technology.map((techno)=>(
                    <tr key={techno.id} className="border-t border-gray-200">
                        <td className="text-center py-2 px-4">{techno.title}</td>
                        <td className="text-center py-2 px-4">{techno.href}</td>
                        <td className="text-center py-2 px-4">{techno.level}</td>
                        <td className="text-center py-2 px-4">{techno.description}</td>
                        <td className="text-center py-2 px-4">{techno.isFavorite ? "oui" :"non"}</td>
                        <td className="px-4 py-2 gap-1 flex">
                            <button onClick={()=>deleteTechno(techno.id)} className="bg-red-500 hover:bg-red-600 p-2 text-white font-bold rounded cursor-pointer">Supprimer</button>
                            <button onClick={() => updateTechno(techno)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-2 rounded cursor-pointer">Modifier</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        
    </main>
  )
}

export default Technologies