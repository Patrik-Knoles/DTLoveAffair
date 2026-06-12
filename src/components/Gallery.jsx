import { ZoomIn } from 'lucide-react'
import { WEDDING } from '../config'

export default function Gallery({ onOpen }) {
  return (
    <section id="gallery">
      <div className="gallery-inner">
        <p className="section-label reveal">Photo Album</p>
        <h2 className="section-title reveal">Our <em>Memories</em></h2>
        <div className="divider reveal"><span>✦</span></div>
        <p className="gallery-description reveal">
          Every photo, a chapter. Every smile, a promise. Tap any image to view it.
        </p>

        <div className="gallery-grid reveal">
          {WEDDING.images.gallery.map((src, i) => (
            <div
              className="gallery-item"
              key={i}
              onClick={() => onOpen(src)}
            >
              <img src={src} alt={`${WEDDING.bride.firstName} & ${WEDDING.groom.firstName}`} loading="lazy" />
              <div className="gallery-overlay"><span><ZoomIn size={26} color="white" strokeWidth={1.5} /></span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
