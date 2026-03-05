import ContactView from '@/app/composants/contact/Contact.view'
import Home from '@/app/composants/Hero/Hero'
import ProjectView from '@/app/composants/Project/Project.view'
import SkillsSection from '../composants/Skills/SkillsSection'
import Contact from '../composants/contact/contact'

const PortFolioView = () => {
  return (
    <div>
      <Home/>
      <SkillsSection/>
      <ProjectView/>
      <Contact/>
      {/* <ContactView/> */}
    </div>
      
  )
}

export default PortFolioView