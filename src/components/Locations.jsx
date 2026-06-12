import { Church, Landmark, MapPin } from 'lucide-react'
import { WEDDING } from '../config'

const ICON_MAP = {
  '⛪': Church,
  '🏛️': Landmark,
}

function VenueIcon({ emoji, size = 20 }) {
  const Icon = ICON_MAP[emoji]
  return Icon ? <Icon size={size} strokeWidth={1.5} /> : <span>{emoji}</span>
}

export default function Locations() {
  const venues = WEDDING.locations

  return (
    <section id="locations">
      <div className="locations-inner">
        <p className="section-label reveal">Getting There</p>
        <h2 className="section-title reveal">Event <em>Locations</em></h2>
        <div className="divider reveal"><span>✦</span></div>

        <div className="locations-grid stagger-reveal">
          {venues.map((loc, i) => (
            <div className="location-card" key={i}>
              <span className="location-num">{String(i + 1).padStart(2, '0')}</span>
              {/* Header: icon box + label + name */}
              <div className="location-card-header">
                <div className="location-icon-box">
                  <VenueIcon emoji={loc.icon} size={20} />
                </div>
                <div className="location-header-text">
                  <p className="location-label">{loc.label}</p>
                  <p className="location-name">{loc.name}</p>
                </div>
              </div>

              {/* Address rows with pin icon */}
              <ul className="location-details">
                {loc.address.map((line, j) => (
                  <li key={j}>
                    <MapPin size={13} strokeWidth={1.7} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              {loc.mapsUrl && (
                <a className="location-link" href={loc.mapsUrl} target="_blank" rel="noreferrer">
                  Open in Google Maps →
                </a>
              )}
            </div>
          ))}
        </div>

        {venues.filter(v => v.mapsEmbed).map(v => (
          <div key={v.name} className="reveal" style={{ marginTop: '2.5rem' }}>
            <p className="map-section-label">
              <VenueIcon emoji={v.icon} size={12} /> {v.label}
            </p>
            <div className="map-wrapper">
              <iframe
                title={v.name}
                src={v.mapsEmbed}
                width="100%"
                height="320"
                style={{ display: 'block', border: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
