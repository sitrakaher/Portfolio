import Deconnexion from '@/app/Navigation/Deconnexion/deconnexion'
import Link from 'next/link'

const NavBar = () => {

    const menuItems = [
        {
            label:"Technologies",
            href:"/admin/Dashboard/DashboardTechnologies"
        },
        {
            label:"Projects",
            href:"/admin/Dashboard/DashboardProjects"
        },
        {
            label:"Contact",
            href:"/admin/Dashboard/DashboardContacts"
        },
    ]

  return (
    <div className='flex items-center bg-cyan-950 p-2 w-full justify-between gap-1'>
                <div>
                    {menuItems.map((menu, index) =>(
                        <Link key={index} href={menu.href} className='py-2 px-4 hover:underline text-white'>{menu.label}</Link>
                    ))}
                </div>
                <Deconnexion/>

            </div>
  )
}

export default NavBar