import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import MusicFab      from './components/MusicFab'
import Nav           from './components/Nav'
import Hero          from './components/Hero'
import OurStory      from './components/OurStory'
import LoveStory     from './components/LoveStory'
import Schedule      from './components/Schedule'
import Locations     from './components/Locations'
import DressCode     from './components/DressCode'
import GuestGallery  from './components/GuestGallery'
import Music         from './components/Music'
import RSVPSection   from './components/RSVPSection'
import Gallery       from './components/Gallery'
import Gift          from './components/Gift'
import Contacts      from './components/Contacts'
import FAQ           from './components/FAQ'
import Footer        from './components/Footer'
import RSVPModal     from './components/RSVPModal'
import Lightbox      from './components/Lightbox'
import GuestGalleryPage from './pages/GuestGalleryPage'

function MainSite() {
  const [isPlaying, setIsPlaying]     = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [rsvpOpen, setRsvpOpen]       = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    AOS.init({ duration: 820, once: true, offset: 80, easing: 'ease-out-cubic' })
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal, .stagger-reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const play = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
    document.addEventListener('click', play, { once: true })
    return () => document.removeEventListener('click', play)
  }, [])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isPlaying])

  const openLightbox  = useCallback(src => setLightboxSrc(src),  [])
  const closeLightbox = useCallback(()  => setLightboxSrc(null), [])
  const openRsvp      = useCallback(()  => setRsvpOpen(true),    [])
  const closeRsvp     = useCallback(()  => setRsvpOpen(false),   [])

  return (
    <>
      <audio ref={audioRef} id="bg-audio" loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <MusicFab isPlaying={isPlaying} onToggle={toggleMusic} />
      <Nav />
      <Hero />
      <OurStory />
      <LoveStory />
      <Schedule />
      <Locations />
      <DressCode />
      <GuestGallery />
      <Music audioRef={audioRef} isPlaying={isPlaying} onToggle={toggleMusic} />
      <RSVPSection onOpen={openRsvp} />
      <Gift />
      <Gallery onOpen={openLightbox} />
      <Contacts />
      <FAQ />
      <Footer />

      <RSVPModal isOpen={rsvpOpen} onClose={closeRsvp} />
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={closeLightbox} />}
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<MainSite />} />
      <Route path="/gallery" element={<GuestGalleryPage />} />
    </Routes>
  )
}
