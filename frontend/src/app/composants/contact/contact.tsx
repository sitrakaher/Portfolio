"use client"

import { api } from "@/lib/api";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Schéma de validation : Plus besoin de Regex manuelle pour l'email !
const contactSchema = z.object({
  email: z.string().min(1, "L'email est requis").email("Adresse email invalide"),
  message: z.string().min(5, "Le message doit contenir au moins 5 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contacts = [
  { icon: "/assets/phon.png", type: "PAR TELEPHONE", description: "+261 33 14 662 39" },
  { icon: "/assets/gmails.png", type: "PAR EMAIL", description: "heriniainasitraka222@gmail.com" },
];

const Contact = () => {
  // 2. Initialisation du formulaire
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // 3. Fonction d'envoi
  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.post('/contacts/message', data);
      toast.success("Message envoyé avec succès");
      reset(); // Réinitialise le formulaire
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
      console.error(error);
    }
  };

  const ContactItem = ({ icon, type, description }: any) => (
    <div className="flex flex-col gap-2 justify-center items-center md:items-start text-center md:text-start">
      <Image src={icon} alt={type} width={32} height={32} />
      <div className="flex flex-col">
        <span>{type}</span>
        <span>
          {type === "PAR EMAIL" ? (
            <a href={`mailto:${description}`} className="hover:underline focus:underline">{description}</a>
          ) : (
            <a href={`tel:${description.replace(/\s+/g, '')}`} className="hover:underline focus:underline">{description}</a>
          )}
        </span>
      </div>
    </div>
  );

  return (
    <section id='contact' className='bg-cyan-950 lg:p-20 md:p-10 mt-10 p-10 min-h-svh scroll-mt-20 text-white'>
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className="flex items-center justify-center gap-4">
          <Image src="/assets/chats.png" alt="contact" width={46} height={46} />
          <h2 className='text-3xl font-bold md:text-4xl'>Me Contacter</h2>
        </div>

        <div className="text-center">
          <h2 className="font-semibold text-lg">Vous avez une idée de projet ou souhaitez en savoir plus?</h2>
          <p className="text-gray-300">Je me ferai un plaisir de vous répondre le plus rapidement possible. À très vite !</p>
        </div>

        <div className="flex flex-col md:flex-row font-semibold md:justify-between gap-6 md:w-xl">
          {contacts.map((contact, index) => <ContactItem key={index} {...contact} />)}
        </div>

        <div id='contactObserver' className="w-full flex justify-center">
          {/* handleSubmit bloque l'envoi si Zod trouve une erreur */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-6 gap-4 md:w-2xl w-full' noValidate>
            
            {/* CHAMP EMAIL */}
            <div className="flex flex-col gap-1">
              <input 
                {...register("email")} // Remplace value et onChange
                type="email" 
                placeholder='Votre email' 
                className={`border-b p-4 focus:outline-none focus:bg-cyan-800 transition-colors ${
                  errors.email ? "border-b-red-500 shadow-[0_4px_10px_rgba(239,68,68,0.2)]" : "border-b-cyan-500"
                }`}
              />
              {errors.email && <span className="text-red-500 text-sm ml-2 italic">{errors.email.message}</span>}
            </div>

            {/* CHAMP MESSAGE */}
            <div className="flex flex-col gap-1">
              <textarea 
                {...register("message")}
                placeholder='Votre message ici' 
                rows={4}
                className={`border-b p-4 focus:outline-none focus:bg-cyan-800 transition-colors ${
                  errors.message ? "border-b-red-500 shadow-[0_4px_10px_rgba(239,68,68,0.2)]" : "border-b-cyan-500"
                }`}
              />
              {errors.message && <span className="text-red-500 text-sm ml-2 italic">{errors.message.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className='bg-linear-to-r from-cyan-800 to-cyan-600 text-white px-6 p-4 rounded text-center font-semibold text-lg hover:brightness-110 disabled:opacity-50 transition-all'
            >
              {isSubmitting ? "Envoi..." : "Contacter"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact;

