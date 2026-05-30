import Hero from '../components/Hero'
import CarScene from '../components/CarScene'
import SectionDivider from '../components/SectionDivider'
import AboutFacts from '../components/AboutFacts'
import JoinSteps from '../components/JoinSteps'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider from="#0a0a0f" />
      <CarScene />
      <SectionDivider from="#0a0a0f" flip />
      <AboutFacts />
      <JoinSteps />
    </>
  )
}
