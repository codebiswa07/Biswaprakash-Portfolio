import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Github, Linkedin, Mail, CheckCircle } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'


export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')


  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Get In Touch" title="Let's Connect" subtitle="Open for internships, collaborations, and interesting projects." center />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-3xl p-8 h-full">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-3xl" />

              <h3 className="font-display font-semibold text-xl text-white mb-2">Biswaprakash Sahoo</h3>
              <p className="text-subtext font-body mb-8 leading-relaxed">
                I'm currently looking for internship opportunities in full-stack development and AI. If you have a position that matches my skills, let's talk!
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: <Mail size={16} />, label: 'Email', value: 'codebiswaprakash07@email.com', href: 'mailto:codebiswaprakash07@email.com' },
                  { icon: <MapPin size={16} />, label: 'Location', value: 'BBSR, Odisha, India', href: '#' },
                  { icon: <Github size={16} />, label: 'GitHub', value: 'github.com/biswaprakash', href: 'https://github.com/codebiswa07' },
                  { icon: <Linkedin size={16} />, label: 'LinkedIn', value: 'linkedin.com/in/biswaprakash', href: 'https://linkedin.com/in/biswaprakash-sahoo-a0050a361' },
                ].map((item) => (
                  <a key={item.label} href={item.href}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/4 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-subtext">{item.label}</p>
                      <p className="text-sm font-body text-white">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { icon: <Github size={18} />, href: 'https://github.com/codebiswa07', label: 'GitHub' },
                  { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/biswaprakash-sahoo-a0050a361', label: 'LinkedIn' },
                  { icon: <Mail size={18} />, href: 'mailto:codebiswaprakash07@email.com', label: 'Email' },
                ].map((s) => (
                  <motion.a key={s.label} href={s.href} aria-label={s.label}
                    whileHover={{ y: -2, scale: 1.1 }}
                    className="w-11 h-11 glass rounded-xl flex items-center justify-center text-subtext hover:text-white hover:border-primary/30 transition-colors">
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              action="https://formsubmit.co/ajax/codebiswaprakash07@gmail.com"
              method="POST"
              className="glass rounded-3xl p-8 space-y-5"
            >
              <input type="hidden" name="_subject" value="New Portfolio Contact!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value="https://biswaprakash-portfolio.vercel.app/?success=true"
              />

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent rounded-t-3xl" />

              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-xs font-mono text-subtext uppercase tracking-wider mb-2">
                    {field.label}
                  </label>
                  <input
                    name={field.id}
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as 'name' | 'email']}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    required
                    className="w-full bg-gray-700 border border-white/8 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-subtext/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-subtext uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Let's build something amazing together..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full bg-gray-700 border border-white/8 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-subtext/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-body font-medium transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Send size={16} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
