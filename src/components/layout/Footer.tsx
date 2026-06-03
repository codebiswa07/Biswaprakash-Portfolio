import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { FaDiscord, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-xl">
              Biswa<span className="text-primary">prakash</span>
            </p>
            <p className="text-subtext text-sm mt-1">Full Stack Developer · AI Enthusiast</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: <Github size={18} />, href: 'https://github.com/codebiswa07', label: 'GitHub' },
              { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/biswaprakash-sahoo-a0050a361', label: 'LinkedIn' },
              { icon: <Mail size={18} />, href: 'mailto:codebiswaprakash07@gmail.com', label: 'Email' },
              { icon: <FaDiscord size={20} />, href: 'https://discord.com/users/biswaprakash321', label: 'Discord' },
              { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/biswaprakash_2515/', label: 'Instagram' },
              { icon: <FaXTwitter size={20} />, href: 'https://X.com/biswaprakash077', label: 'X' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ y: -2, scale: 1.1 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-subtext hover:text-white hover:border-primary/40 transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-subtext text-sm flex items-center gap-1">
            Made with <Heart size={13} className="text-primary mx-0.5" fill="currentColor" /> in Odisha, India
          </p>
        </div>
      </div>
    </footer>
  )
}
