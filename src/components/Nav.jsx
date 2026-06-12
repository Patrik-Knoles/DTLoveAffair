import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled]    = useState(false)
  const [activeSection, setActive] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const handler = () => {
      setScrolled(window.scrollY > 80)
      let current = 'hero'
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 220) current = s.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const link = (id, label, extra = '') => (
    <a
      href={`#${id}`}
      className={`nav-link${extra}${activeSection === id ? ' active' : ''}`}
    >
      {label}
    </a>
  )

  return (
    <nav className={`nav-wrapper${scrolled ? ' scrolled' : ''}`} id="main-nav" aria-label="Site navigation">
      <div className="nav-pill">
        {link('hero',      'Home')}
        {link('couple',    'Our Story', ' hide-mobile')}
        {link('schedule',  'Events',    ' hide-mobile')}
        {link('locations', 'Location',  ' hide-mobile')}
        {link('gallery',   'Gallery',   ' hide-mobile')}
        <a href="#rsvp" className="nav-link nav-cta">RSVP</a>
      </div>
    </nav>
  )
}
