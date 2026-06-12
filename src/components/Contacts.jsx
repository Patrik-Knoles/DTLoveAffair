import { WEDDING } from '../config'

export default function Contacts() {
  return (
    <section id="contacts">
      <div className="contacts-inner">
        <p className="section-label reveal">Get In Touch</p>
        <h2 className="section-title reveal">Contact the <em>Families</em></h2>
        <div className="divider reveal"><span>✦</span></div>
        <p className="contacts-subtitle reveal">
          Have questions or need help with directions? Reach out to any of our family contacts —
          we'd love to hear from you.
        </p>

        <div className="contacts-grid stagger-reveal">
          {WEDDING.contacts.map(c => (
            <div className="contact-card" key={c.name}>
              <div className="contact-avatar">{c.initial}</div>
              <p className="contact-name">{c.name}</p>
              <p className="contact-role">{c.role}</p>
              {c.tel ? (
                <a className="contact-phone" href={`tel:${c.tel}`}>{c.display}</a>
              ) : (
                <span className="contact-phone">{c.display}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
