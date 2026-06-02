export interface Project {
  logo?: string
  id: string
  title: string
  description: string
  longDescription: string
  image?: string
  stack: string[]
  demoUrl?: string
  githubUrl?: string
  color: string
  featured: boolean
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'programming' | 'database' | 'design' | 'tools' | 'concepts'
  icon?: string
  color: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  icon: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  date?: string
}
