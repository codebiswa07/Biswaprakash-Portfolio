import { useEffect, useRef } from 'react'

export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}
