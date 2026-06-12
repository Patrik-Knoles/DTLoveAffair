import { useState, useEffect, Fragment } from 'react'
import { WEDDING } from '../config'

const UNITS = ['days', 'hours', 'mins', 'secs']

export default function Hero() {
  const [cd, setCd] = useState({ days: '--', hours: '--', mins: '--', secs: '--' })

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING.weddingDate - new Date()
      if (diff <= 0) {
        setCd({ days: '00', hours: '00', mins: '00', secs: '00' })
        return
      }
      setCd({
        days:  String(Math.floor(diff / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        mins:  String(Math.floor((diff % 3600000)  / 60000)).padStart(2, '0'),
        secs:  String(Math.floor((diff % 60000)    / 1000)).padStart(2, '0'),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero">
      <div id="hero-bg" style={{ backgroundImage: `url('${WEDDING.images.heroBg}')` }} />
      <div className="hero-content">
        <p className="hero-eyebrow">{WEDDING.appName}</p>
        <span className="hero-name n1">{WEDDING.bride.firstName}</span>
        <span className="hero-amp">&amp;</span>
        <span className="hero-name n2">{WEDDING.groom.firstName}</span>
        <p className="hero-surnames">
          {WEDDING.bride.lastName}&nbsp;✦&nbsp;{WEDDING.groom.lastName}
        </p>
        <p className="hero-date">
          {WEDDING.displayDate}&ensp;·&ensp;{WEDDING.city}
        </p>
        <p className="hero-hosts">
          {WEDDING.hosts}
          <br />joyfully invite you to celebrate
        </p>

        <div className="countdown-wrap">
          <div className="countdown-glass">
            {UNITS.map((unit, i) => (
              <Fragment key={unit}>
                {i > 0 && <span className="countdown-sep">:</span>}
                <div className="countdown-unit">
                  <span className="countdown-num">{cd[unit]}</span>
                  <span className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
                </div>
              </Fragment>
            ))}
          </div>
          <a href="#rsvp" className="btn-rsvp-hero">RSVP Now</a>
        </div>

        <p className="scroll-hint">Scroll ↓</p>
      </div>
    </section>
  )
}
