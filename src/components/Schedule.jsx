import {
  Calendar, Clock, Church, MapPin, Shirt, Wine, PartyPopper, Landmark,
} from 'lucide-react'
import { WEDDING } from '../config'

const ICON_MAP = {
  '📅': Calendar,
  '🕘': Clock,
  '🕛': Clock,
  '⛪': Church,
  '📍': MapPin,
  '👗': Shirt,
  '🥂': Wine,
  '🎉': PartyPopper,
  '🏛️': Landmark,
}

function DetailIcon({ name }) {
  const Icon = ICON_MAP[name]
  return Icon
    ? <Icon size={14} strokeWidth={1.7} style={{ flexShrink: 0, marginTop: '0.1em' }} />
    : <span>{name}</span>
}

export default function Schedule() {
  return (
    <section id="schedule">
      <div className="schedule-inner">
        <p className="section-label reveal">Program of Events</p>
        <h2 className="section-title reveal">Our Celebration <em>Schedule</em></h2>
        <div className="divider reveal"><span>✦</span></div>

        <div className="schedule-grid stagger-reveal">
          {WEDDING.events.map(evt => (
            <div className="event-card" key={evt.num}>
              <span className="event-num">{evt.num}</span>
              <p className="event-category">{evt.category}</p>
              <h3 className="event-title">{evt.title}</h3>
              <ul className="event-details">
                {evt.details.map((d, i) => (
                  <li key={i}><DetailIcon name={d.icon} /> {d.text}</li>
                ))}
              </ul>
              <a className="btn-cal" href={evt.calendarUrl} target="_blank" rel="noreferrer">
                + Add to Calendar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
