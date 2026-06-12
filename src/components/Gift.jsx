import { useState } from 'react'
import { Copy, Check, Landmark } from 'lucide-react'
import { WEDDING } from '../config'

const ACCOUNTS = [
  {
    bank: 'Access Bank',
    number: '1415387603',
    name: 'Deborah Blessing Adeniyi',
  },
  {
    bank: 'GT Bank',
    number: '0218176406',
    name: 'Adeleye Temiloluwa Oluwaseyi',
  },
]

export default function Gift() {
  const [copied, setCopied] = useState(null)
  const { bride, groom } = WEDDING

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 2200)
    })
  }

  return (
    <section id="gift">
      <div className="gift-inner">
        <p className="section-label reveal">With All Our Gratitude</p>
        <h2 className="section-title reveal">A Gift of <em>Love</em></h2>
        <div className="divider reveal"><span>✦</span></div>

        <p className="gift-message reveal">
          Your presence at our wedding is, truly, the most beautiful and cherished gift we could
          ever ask for — and we are so deeply grateful that you are choosing to share this
          sacred day with us.
        </p>
        <p className="gift-message reveal" style={{ marginTop: '0.9rem' }}>
          However, if it is on your heart to bless us as we begin this beautiful new chapter
          together, we would be deeply honoured and touched by your generous love and kindness.
          Kindly note that we can only accept monetary gifts at this time — below are our account details.
        </p>

        <div className="gift-accounts stagger-reveal">
          {ACCOUNTS.map((acc, i) => (
            <div className="gift-card" key={i}>
              <div className="gift-bank-icon-wrap">
                <Landmark size={22} strokeWidth={1.5} />
              </div>
              <p className="gift-bank">{acc.bank}</p>
              <p className="gift-account-number">{acc.number}</p>
              <p className="gift-account-name">{acc.name}</p>
              <button
                className={`gift-copy-btn${copied === i ? ' copied' : ''}`}
                onClick={() => copy(acc.number, i)}
                aria-label="Copy account number"
              >
                {copied === i ? <Check size={13} /> : <Copy size={13} />}
                {copied === i ? 'Copied!' : 'Copy Number'}
              </button>
            </div>
          ))}
        </div>

        <p className="gift-footer reveal">
          Thank you so much — from the very bottom of our hearts. Every act of love and
          generosity is deeply appreciated, and we are so blessed to have you in our lives.
          <br />
          <em style={{ color: 'var(--orange-dk)', fontStyle: 'normal', fontWeight: 600, marginTop: '0.6rem', display: 'inline-block' }}>
            — {bride.firstName} &amp; {groom.firstName}
          </em>
        </p>
      </div>
    </section>
  )
}
