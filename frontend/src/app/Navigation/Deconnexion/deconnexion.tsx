import { useRouter } from "next/navigation";

const Deconnexion = ()=>{
    
    const router = useRouter();
    const handleClick = ()=>{
        localStorage.removeItem("token");
        router.push('/admin/Login/login.container');
    };

    return <div>
        <button onClick={handleClick} className="font-bold bg-amber-500 p-2 rounded text-white">Déconnexion</button>
    </div>
}

export default Deconnexion;