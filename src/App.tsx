import { useEffect } from 'react'
import { useAppStore } from './store'
import CustomCursor from './components/ui/CustomCursor'
import ParticleField from './components/ui/ParticleField'
import LoadingScreen from './components/sections/LoadingScreen'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import RoadmapSection from './components/sections/RoadmapSection'
import AchievementsSection from './components/sections/AchievementsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  const { isLoading } = useAppStore()

  // Disable default cursor
  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  return (
    <div className="relative min-h-screen bg-bg text-white overflow-x-hidden">
      {/* Loading screen */}
      <LoadingScreen />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Background particles */}
      {!isLoading && <ParticleField count={60} />}

      {/* Global ambient bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[800px] h-[600px] bg-primary/4 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[400px] bg-secondary/4 rounded-full blur-[120px]" />
      </div>

      {!isLoading && (
        <>
          <Navbar />
          <main role="main" aria-label="Portfolio content">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <RoadmapSection />
            <AchievementsSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
