"use client"
import { api } from '@/lib/api';
import NavBar from '@/pages/admin/AdminNavigation/navBar';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface Messages {
    id:string;
    email:string;
    message:string;
}
const MessageDetailPage = () => {

    const [messages, setMessages] = useState<Messages | null>(null);
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const router = useRouter();

    useEffect(()=>{
        if(!id) return;
        const fetchMessage = async () =>{
            try {
            const res = await api.get(`/contacts/${id}`);
            setMessages(res.data);
            } catch (error) {
                console.error(error);
                alert('Erreurs lors du chargement')
            }
        };

        fetchMessage();
    }, [id]);

    const handleRepondre = ()=>{
        setModal(true)
    }

    const handleSubmit = async (e:React.SubmitEvent) =>{
        e.preventDefault();
        try {
            await api.post(`/contacts/message/${id}/reply`, {message});
            setModal(false);
        } catch (error) {
            console.log(error);
            alert("Le serveur ne réponds pas")
        }

    }

    return (
        <div>

        <NavBar/>
    <div className='relative h-screen p-10'>
        
        <button className='flex items-start font-bold bg-gray-500 p-2 mb-5  text-white rounded-full hover:scale-105 cursor-pointer' onClick={()=>router.push('/admin/Dashboard/DashboardContacts')}>{"<"}</button>
        <div className='relative p-20 flex justify-center items-center'>
            <div className='relative w-full flex flex-col items-start justify-center p-10 border rounded'>     
                <h1 className='flex items-start border-b font-bold'>{messages?.email}</h1>
                <p>{messages?.message}</p>
                <button className='absolute top-0 right-0 m-2 bg-emerald-500 text-white p-2 rounded cursor-pointer' onClick={handleRepondre}>Répondre</button>
            </div>
            {modal && (
            <form action="" onSubmit={handleSubmit} className='absolute bg-gray-300 rounded p-10 m-20 flex flex-col items-center justify-center w-2xl'>
                <h1 className='text-2xl lg:w-4xl flex items-center justify-center'>Répondre aux messages</h1>
                {/* <div className='border-b w-full flex flex-col p-5'>
                    <label htmlFor="objet">Objet</label>
                    <input type="text" id='objet' className='border-b p-2 focus:bg-gray-200 focus:outline-none'/>
                </div> */}
                <div className='w-full flex flex-col p-5'>
                    <label htmlFor="message">Message</label>
                    <textarea id='objet' className='border-b focus:bg-gray-200 focus:outline-none' value={message} onChange={e =>setMessage(e.target.value)}/>
                </div>
                <div className='flex gap-1'>
                    <button onClick={()=>{setModal(false); setMessage('')}} className='bg-amber-500 text-white py-2 px-4 rounded'>Annuler</button>
                    <button type="submit" className='bg-emerald-500 text-white py-2 px-4 rounded'>Envoyer</button>
                </div>
            </form>
        )}
        </div>
    </div>
        </div>
  )
}

export default MessageDetailPage;