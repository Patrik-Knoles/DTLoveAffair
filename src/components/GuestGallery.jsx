import { Camera } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function GuestGallery() {
  return (
    <section id="upload-gallery">
      <div style={{ maxWidth: '600px', margin: '0 auto' }} className="reveal">
        <Link className="gallery-upload-link" to="/gallery">
          <span className="gallery-upload-icon">
            <Camera size={42} strokeWidth={1.4} />
          </span>
          <div>
            <p className="gallery-upload-label">Guest Gallery</p>
            <p className="gallery-upload-title">Help us relive the moment</p>
            <p className="gallery-upload-sub">Upload your best shots from our big day here</p>
          </div>
          <span className="gallery-upload-btn">Upload Photos ↑</span>
        </Link>
      </div>
    </section>
  )
}
