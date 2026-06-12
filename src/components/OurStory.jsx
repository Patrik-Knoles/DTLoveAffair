import { useState, useEffect } from 'react'
import { WEDDING } from '../config'

export default function OurStory() {
  const [current, setCurrent] = useState(0)
  const { slideshow } = WEDDING.images

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % slideshow.length), 4000)
    return () => clearInterval(id)
  }, [slideshow.length])

  const { bride, groom } = WEDDING

  return (
    <section id="couple">
      <div className="couple-header" data-aos="fade-up" data-aos-duration="800">
        <p className="section-label">The Happy Couple</p>
        <h2 className="section-title">Our <em>Story</em></h2>
        <div className="divider"><span>✦</span></div>
        <p className="couple-tagline">Two hearts, one beautiful journey.</p>
        <p style={{
          marginTop: '1.2rem', fontStyle: 'normal',
          fontSize: 'clamp(0.82rem,1.6vw,0.95rem)', lineHeight: '1.8',
          color: 'var(--gray)', maxWidth: '580px',
          marginLeft: 'auto', marginRight: 'auto',
          fontFamily: 'var(--font-sans)',
        }}>
          {bride.firstName} {bride.lastName} and {groom.firstName} {groom.lastName} met within
          the beautiful halls of Ekiti State University — two young hearts who loved God, who in
          each other found a guide, a companion, and a forever. What began as friendship between
          lectures and church fellowship blossomed into a love that was pure, intentional, and
          unmistakably God-ordained. We would be so honoured to have you join us as we begin this
          beautiful forever together.
        </p>
      </div>

      <div className="couple-slideshow" data-aos="fade-up" data-aos-duration="900">
        {slideshow.map((src, i) => (
          <div key={src} className={`slide-item${i === current ? ' active' : ''}`}>
            <img src={src} alt={`${bride.firstName} & ${groom.firstName}`} />
          </div>
        ))}
      </div>
    </section>
  )
}
