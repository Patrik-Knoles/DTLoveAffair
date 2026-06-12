import { useState, useEffect } from 'react'
import { WEDDING } from '../config'

const BARS = Array.from({ length: 20 })

export default function Music({ audioRef, isPlaying, onToggle }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration * 100)
    }
    audio.addEventListener('timeupdate', update)
    return () => audio.removeEventListener('timeupdate', update)
  }, [audioRef])

  const handleSeek = e => {
    const audio = audioRef.current
    if (!audio?.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const { song } = WEDDING

  return (
    <section id="music">
      <div className="music-inner">
        <p className="section-label reveal">Our Song</p>
        <h2 className="section-title reveal">Soundtrack of Our <em>Love</em></h2>
        <div className="divider reveal"><span>✦</span></div>

        <div className="music-player reveal">
          <h3 className="music-title">{song.title}</h3>
          <p className="music-artist">{song.artist}</p>

          <div className={`wave-visualizer${isPlaying ? ' playing' : ''}`} id="wave-vis">
            {BARS.map((_, i) => <span key={i} className="wave-bar" />)}
          </div>

          <div className="music-progress" onClick={handleSeek}>
            <div className="music-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="music-controls">
            <button className="btn-play" onClick={onToggle} aria-label="Play / Pause">
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>

          <p className="music-quote">{song.quote}</p>
        </div>
      </div>
    </section>
  )
}
