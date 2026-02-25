import Navbar from './NavBar'
import Footer from './Footer'

interface Props{
    children:React.ReactNode;
}
const Layout = ({children}:Props) => {
  return (
    <>
        <Navbar/>
        {children}
        <Footer/>
    </>
  )
}

export default Layout;
