"use client"

import { api } from "@/lib/api";
import Image from "next/image";
import { useState } from "react"
import { toast } from "react-toastify";

const contacts = [
  {
    icon:"/assets/phon.png",
    type:"PAR TELEPHONE",
    description:"+261 33 14 662 39"
  },
  {
    icon:"/assets/gmails.png",
    type:"PAR EMAIL",
    description:"heriniainasitraka222@gmail.com"
  },
]

const Contact = () => {

  const [formData, setFormData]=useState({
    email:"",
    message:"",
  });

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev =>({...prev, [e.target.name]: e.target.value}));
  };

  const handlesubmit = async (e:React.SubmitEvent) =>{
    e.preventDefault();
    setErrors("");
    setSuccess(false);

    if (!formData.email || !formData.message) {
      setErrors("Tous les champs sont requise");
      setSuccess(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)){
      setErrors('addresse email invalide.');
      return;
    }

    setLoading(true);

    try{
      await api.post('/contacts/message', formData);
      setSuccess(true);
      toast.success("Message envoyé avec succès")
      setFormData({email:"", message:""})
    }catch(error){
      toast.error("Erreur lors de l'envoi du message")
      console.error(error);
    } finally{
      setLoading(false);
    }
  }

  const ContactItem = ({icon, type, description}:any)=>(
    <div>
      <Image src={icon} alt={type} width={32} height={32}/>
      <span>{type}</span>
      <span>
        {type === "PAR EMAIL" ? 
        (
          <a href={`mailto:${description}`} className="hover:underline focus:underline">{description}</a>
          ):(
          <a href={`tel:${description.replace(/\s+/g, '')}`} className="hover:underline focus:underline">{description}</a>
        )}
      </span>
    </div>
  );
  
  return (
    <section id='contact' className='bg-cyan-950 lg:p-20 md:p-10 mt-10 p-10 min-h-svh scroll-mt-20 text-white'>
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className="flex items-center justify-center gap-4">
          <Image src="/assets/chats.png" alt="contact" width={46} height={46}/> 
          <h2  className='flex justify-center items-center text-3xl font-bold md:text-4xl'>Me Contacter</h2>
        </div>
        <div className="text-center">
          <h2 className="font-semibold text-lg">Vous avez une idée de projet ou souhaitez en savoir plus?</h2>
          <p className="text-gray-300">Je me ferai un plaisir de vous repondre le plus rapidement possible. A très  vite !</p>
        </div>
        <div className="flex flex-col md:flex-row font-semibold md:justify-between gap-6 md:w-xl">
            {contacts.map((contact, index) => <ContactItem key={index} {...contact}/>)} 
        </div>
        <div id='contactObserver' className={`flex-1`}>
            {
            // (
            //   <div className="flex items-center mb-4">
            //     <span className="p-4 rounded-l bg-green-500 text-white">Message envoyé avec success!</span>
            //     <button className="p-4 rounded-r bg-gray-200 hover:bg-gray-300" onClick={()=>setSuccess(false)}>X</button>
            //   </div>)
              }
            {errors && <span className="text-red-500">Tous les champs sont requis</span>}
            <form action="" onSubmit={handlesubmit} className='flex flex-col p-6 gap-2 md:w-2xl'>
              <input type="email" name='email' 
                className='border-b-cyan-500 border-b p-4 focus:outline-none focus:shadow-2xl focus:bg-cyan-800'
                placeholder='Votre email' 
                value={formData.email} 
                onChange={handleChange}
              />
              <textarea name="message" 
                className='border-b-cyan-500 border-b p-4 focus:outline-none focus:shadow-2xl focus:bg-cyan-800' 
                placeholder='Votre message ici' 
                value={formData.message} 
                onChange={handleChange}
              />
              <button type="submit" disabled={loading} className='bg-linear-to-r from-cyan-800 to-cyan-200 text-white px-6 p-4 rounded text-center font-semibold text-lg'>
                {loading ? "Envoi..." : "Contacter"}
              </button>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
