"use client"
import "../../../app/globals.css";
import { api} from '@/lib/api';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { toast } from "react-toastify";

const LoginView = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (e:React.SubmitEvent<HTMLFormElement>) =>{
  e.preventDefault();
    try {
      const res = await api.post("/auth/login", {email, password});
      localStorage.setItem("token", res.data.token);
      router.push("/admin/Dashboard/DashboardTechnologies");
    } catch {
      toast.error("ACCES REFUSE");
    }
  }
  return (
    <div className="bg-cyan-950 flex flex-col min-h-screen items-center justify-center gap-10 text-white">
      <h1 className="uppercase text-xl md:text-3xl font-bold text-center px-10">Espace réservé aux Administrateurs</h1>
        <form  method="post" onSubmit={login} className="flex flex-col md:w-xl gap-2">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            placeholder='Email' 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            className="p-4 focus:outline-none focus:bg-cyan-800 focus:shadow-cyan-800 border-b"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-semibold">Mot de passe</label>
          <input 
            type="password" 
            name="password"
            id="password"
            placeholder='Mot de passe' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className="p-4 focus:outline-none focus:bg-cyan-800 focus:shadow-cyan-800 border-b"
          />
        </div>
      <button type="submit" className="bg-linear-to-r from-cyan-800 to-cyan-200 cursor-pointer text-xl font-bold text-white p-4 rounded">Se connecter</button>
        </form>
    </div>
  )
}

export default LoginView