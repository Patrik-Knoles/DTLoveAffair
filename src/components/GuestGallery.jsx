import { Camera } from 'lucide-react'
import { WEDDING } from '../config'

export default function GuestGallery() {
  const g = WEDDING.guestGallery
  const params = new URLSearchParams({
    id:     g.id,
    bride:  g.bride,
    groom:  g.groom,
    date:   g.date,
    venue:  g.venue,
    max:    g.max,
    cloud:  g.cloud,
    preset: g.preset,
    api:    g.apiUrl,
  })
  const href = `https://dearcouplegallery.netlify.app/?${params.toString()}`

  return (
    <section id="upload-gallery">
      <div style={{ maxWidth: '600px', margin: '0 auto' }} className="reveal">
        <a className="gallery-upload-link" href={href} target="_blank" rel="noreferrer">
          <span className="gallery-upload-icon">
            <Camera size={42} strokeWidth={1.4} />
          </span>
          <div>
            <p className="gallery-upload-label">Guest Gallery</p>
            <p className="gallery-upload-title">Help us relive the moment</p>
            <p className="gallery-upload-sub">Upload your best shots from our big day here</p>
          </div>
          <span className="gallery-upload-btn">Upload Photos ↑</span>
        </a>
      </div>
    </section>
  )
}
