import { useState } from 'react'
import { WEDDING } from '../config'

const ITEMS = [
  {
    q: 'Can I bring a plus one?',
    a: 'Kindly note that this is an invitation-only event. Your invitation card indicates whether a plus one has been included. If you are unsure, please reach out to our contact persons before the day. We want to ensure a warm and well-organised celebration for everyone.',
  },
  {
    q: 'Are children allowed?',
    a: 'We adore little ones, but to ensure all our guests have the most comfortable experience, we kindly ask that children under 12 are not brought to the reception. We appreciate your understanding in making this a beautiful evening for everyone.',
  },
  {
    q: 'What should I wear?',
    a: `For the <strong>Church Wedding &amp; Reception</strong> (9:00am, Saturday 27th June), please come in your most stunning formal or classic attire. For the <strong>Engagement Ceremony</strong> (12:00pm), our colours of the day are <strong>Champagne Gold &amp; Ivory</strong> — come dressed to dazzle! Aso-ebi is available; contact <strong>Mr. Joseph</strong> on 08147843011 or <strong>Mr. Tunde</strong> on 08062132940 to get yours.`,
  },
  {
    q: 'Where are the venues?',
    a: 'The <strong>Church Wedding &amp; Reception</strong> holds at <strong>Gospel Apostolic Church, Ibafo Branch 2</strong>, Behind Oluwaseun Bakery, Sefu-Ota, Ibafo, Ogun State. The <strong>Engagement Ceremony</strong> holds at <strong>Doulos Hall</strong>, Oremeji Bus Stop, Ibafo, Ogun State. See the Locations section above for Google Maps links.',
  },
  {
    q: 'Is there a dress code for the church?',
    a: 'For the church ceremony, we ask that guests dress modestly and smartly — this is a house of worship as well as a celebration. Formal and classic attire is warmly encouraged.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = i => setOpenIdx(prev => (prev === i ? null : i))

  return (
    <section id="faq">
      <div className="faq-inner">
        <p className="section-label reveal">Questions &amp; Answers</p>
        <h2 className="section-title reveal">Frequently <em>Asked</em></h2>
        <div className="divider reveal"><span>✦</span></div>
        <p className="faq-subtitle reveal">Everything you need to know before the big day.</p>

        <div className="faq-list reveal">
          {ITEMS.map((item, i) => (
            <div className={`faq-item${openIdx === i ? ' open' : ''}`} key={i}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIdx === i}
              >
                <span>{item.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
