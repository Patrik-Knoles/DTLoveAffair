import { GraduationCap, Gem } from 'lucide-react'
import { WEDDING } from '../config'

const TIMELINE = [
  {
    Icon:  GraduationCap,
    date:  'EKITI STATE UNIVERSITY',
    title: 'Where our paths first crossed',
    desc:  'Temiloluwa was already in 300 Level when Deborah arrived as a fresh undergraduate. What seemed like an ordinary campus meeting slowly became something neither of them could ignore.',
  },
  {
    date:  'FROM CAMPUS TO CHURCH',
    title: 'A connection unlike any other',
    desc:  'Casual conversations and random encounters grew into fellowship, shared faith, and a growing awareness that what they had was unusual — and worth nurturing.',
  },
  {
    date:  'BETWEEN LECTURES AND LIFE',
    title: 'The friendship that changed everything',
    desc:  'Between lectures, church services, long conversations, and shared laughter, they became each other\'s guides and greatest support — until friendship quietly became love.',
  },
  {
    Icon:  Gem,
    date:  'SHE SAID YES ✦',
    title: 'Forever found at EKSU',
    desc:  'Two students who loved God, met on campus, served Him, built themselves, and impacted lives — and found forever in each other. Glory be to God.',
  },
]

export default function LoveStory() {
  const { bride, groom } = WEDDING

  return (
    <section id="story">
      <div className="story-inner">

        <div className="story-img" data-aos="fade-right" data-aos-duration="900">
          <img src={WEDDING.images.storyPhoto} alt={`${bride.firstName} & ${groom.firstName}`} />
        </div>

        <div className="story-content" data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
          <p className="section-label">How it all began</p>
          <h2 className="section-title">Our <em>Love Story</em></h2>
          <div className="divider"><span>✦</span></div>

          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: '1rem', color: 'rgba(253,232,200,0.82)',
            marginBottom: '1.8rem', lineHeight: '1.7',
          }}>
            "Two students who loved God met on campus and found forever in each other — Glory be to God."
          </p>

          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" />
                <div>
                  <p className="timeline-date">
                    {item.Icon && (
                      <item.Icon
                        size={11}
                        strokeWidth={2}
                        style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.35em' }}
                      />
                    )}
                    {item.date}
                  </p>
                  <p className="timeline-title">{item.title}</p>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
