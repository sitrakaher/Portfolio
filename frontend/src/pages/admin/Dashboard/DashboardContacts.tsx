"use client"
import { api } from '@/lib/api';
import { useEffect, useState } from 'react'
import "../../../app/globals.css";
import { useRouter } from 'next/navigation';
import NavBar from '../../../app/admin/contacts/AdminNavigation/navBar';

type Contacts = {
    id:string;
    email:string;
    message:string;
    isRead:boolean;
    isReplied:boolean;
}
const Contact = () => {
    const [contacts, setContacts] = useState<Contacts[]>([]);
    const router = useRouter();

    const loadContact = async () =>{
        try {
            const res = await api.get('/contacts');
            setContacts(res.data);
        } catch (error) {
            alert("Erreur du récupération")
            console.log(error);  
        }
    }

    useEffect(()=>{
        loadContact();
    },[])
    
    const handleDelete = async (id:any) =>{
        if(window.confirm('Vous voulez vraiment cette message')){
            try {
                await api.delete(`/contacts/supprimer/${id}`)
                loadContact();  
            } catch (error) {
                alert('Erreur lors du suppression')
                console.log(error);
            }
        }
    }

  return (
    <div className='relative'>
        <NavBar/>
        <div className='px-20 py-10'>
        <h1 className="uppercase text-3xl font-bold">DashBord Admin Contact</h1>
        <div className='p-10'>
            {contacts.map((contact)=>(
                <div className='gap-4 flex w-full' key={contact.id}>
                    <div>
                        <button onClick={()=>handleDelete(contact.id)} className="bg-red-500 hover:bg-red-600 p-2 text-white font-bold rounded cursor-pointer">Supprimer</button>
                    </div>
                    <div onClick={()=>router.push(`/admin/contacts/${contact.id}`)} id='id' className='relative hover:bg-gray-200 h-24 w-full cursor-pointer border-b p-2 mt-2 flex  justify-between'>
                        <div>
                            <h2 className='font-bold'>{contact.email}</h2>
                            <p className='overflow-hidden text-ellipsis whitespace-nowrap w-5xl'>{contact.message}</p>
                        </div>
                        <div className='absolute top-0 right-0 flex items-center justify-center gap-2'>
                            <span>{contact.isRead === true ? <p>Lu</p> : <p className='text-red-500'>Non lu</p>}</span> /
                            <span>{contact.isReplied === true ? <p>Répondu</p>: <p className='text-red-500'>Non Répondu</p>}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default Contact