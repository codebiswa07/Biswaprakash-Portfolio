import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  setLoading: (v: boolean) => void
  activeSection: string
  setActiveSection: (s: string) => void
  cursorVariant: 'default' | 'hovered' | 'text'
  setCursorVariant: (v: 'default' | 'hovered' | 'text') => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setLoading: (v) => set({ isLoading: v }),
  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),
  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),
}))
