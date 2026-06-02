import { motion } from 'framer-motion'
import { useAppStore } from '../../store'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  className?: string
  icon?: React.ReactNode
}

export default function Button({ children, variant = 'primary', size = 'md', onClick, href, className = '', icon }: ButtonProps) {
  const { setCursorVariant } = useAppStore()

  const base = 'inline-flex items-center gap-2 font-body font-medium rounded-xl transition-all duration-300 select-none relative overflow-hidden'
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 glow-primary',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20',
    ghost: 'text-white hover:text-secondary',
    outline: 'border border-primary/50 text-primary hover:bg-primary/10',
  }

  const content = (
    <motion.span
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setCursorVariant('hovered')}
      onMouseLeave={() => setCursorVariant('default')}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.span>
  )

  if (href) return <a href={href}>{content}</a>
  return content
}
