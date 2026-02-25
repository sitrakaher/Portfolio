import ContactView from '@/app/composants/contact/Contact.view'
import Home from '@/app/composants/Hero/Hero'
import ProjectView from '@/app/composants/Project/Project.view'
import SkillsSection from '../composants/Skills/SkillsSection'

const PortFolioView = () => {
  return (
    <div>
      <Home/>
      <SkillsSection/>
      <ProjectView/>
      <ContactView/>
    </div>
      
  )
}

export default PortFolioView