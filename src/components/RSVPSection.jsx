import { WEDDING } from '../config'

export default function RSVPSection({ onOpen }) {
  return (
    <section id="rsvp">
      <div className="rsvp-inner">
        <p className="section-label reveal">Kindly Reply</p>
        <h2 className="section-title reveal">Your <em>RSVP</em></h2>
        <div className="divider reveal"><span>✦</span></div>
        <p className="rsvp-body-text reveal">
          Your presence is the greatest gift. Please let us know you're coming
          <br />so we can celebrate together in the most joyful way.
        </p>
        <div className="reveal">
          <button className="btn-rsvp-open" onClick={onOpen}>
            RSVP — Tap to Register
          </button>
          <p className="rsvp-deadline">Please respond by {WEDDING.rsvpDeadline}</p>
        </div>
      </div>
    </section>
  )
}
