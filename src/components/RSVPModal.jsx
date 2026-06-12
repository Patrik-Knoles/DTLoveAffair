import { useState, useEffect, useRef } from 'react'
import { X, AlertTriangle, PartyPopper } from 'lucide-react'
import { WEDDING } from '../config'
import { COUNTRIES, DEFAULT_COUNTRY_IDX } from '../data/countries'

const flagSrc = iso => `https://flagcdn.com/w20/${iso}.png`

const INITIAL = { name: '', attending: '', plusone: 'Just me', notes: '' }

export default function RSVPModal({ isOpen, onClose }) {
  const [form, setForm]             = useState(INITIAL)
  const [countryIdx, setCountryIdx] = useState(DEFAULT_COUNTRY_IDX)
  const [phoneNum, setPhoneNum]     = useState('')
  const [dropOpen, setDropOpen]     = useState(false)
  const [loading, setLoading]       = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [toast, setToast]           = useState(null)
  const toastTimer                  = useRef(null)
  const dropdownRef                 = useRef(null)

  const country = COUNTRIES[countryIdx]

  // Close modal on Escape
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') { setDropOpen(false); onClose() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const showToast = (msg, type = 'warn') => {
    clearTimeout(toastTimer.current)
    setToast({ msg, type })
    toastTimer.current = setTimeout(() => setToast(null), 3800)
  }

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handlePhoneInput = e => {
    const digits = e.target.value.replace(/\D/g, '')
    setPhoneNum(digits.slice(0, country.digits))
  }

  const selectCountry = i => {
    setCountryIdx(i)
    setPhoneNum('')
    setDropOpen(false)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) { showToast('Please enter your full name.'); return }
    if (!phoneNum)         { showToast('Please enter your phone number.'); return }
    if (phoneNum.length !== country.digits) {
      showToast(`Please enter all ${country.digits} digits for ${country.name} (${country.code}).`)
      return
    }
    if (!form.attending) { showToast("Please let us know if you'll attend."); return }

    setLoading(true)
    try {
      await fetch(WEDDING.rsvpScriptUrl, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },  // avoids CORS preflight
        body:    JSON.stringify({ ...form, phone: country.code + phoneNum }),
      })
      setSubmitted(true)
    } catch {
      showToast('Something went wrong. Please try again or contact us directly.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    clearTimeout(toastTimer.current)
    setTimeout(() => {
      setForm(INITIAL); setPhoneNum(''); setCountryIdx(DEFAULT_COUNTRY_IDX)
      setDropOpen(false); setSubmitted(false); setToast(null)
    }, 400)
  }

  const { bride, groom, displayDate, city } = WEDDING

  return (
    <>
      {toast && (
        <div className={`rsvp-toast rsvp-toast--${toast.type}`} role="alert">
          <span className="rsvp-toast-icon">
            {toast.type === 'error' ? <X size={15} /> : <AlertTriangle size={15} />}
          </span>
          <span className="rsvp-toast-msg">{toast.msg}</span>
          <button
            className="rsvp-toast-close"
            onClick={() => { clearTimeout(toastTimer.current); setToast(null) }}
            aria-label="Dismiss"
          ><X size={13} /></button>
        </div>
      )}

      <div
        className={`rsvp-overlay${isOpen ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) handleClose() }}
      >
        <div className="rsvp-modal" id="rsvp-modal">

          <div className="rsvp-modal-header">
            <button className="rsvp-close" onClick={handleClose} aria-label="Close"><X size={15} /></button>
            <p className="rsvp-modal-eyebrow">Wedding RSVP</p>
            <p className="rsvp-modal-names">
              {bride.firstName} <em>&amp;</em> {groom.firstName}
            </p>
            <p className="rsvp-modal-date">{displayDate} · {city}</p>
          </div>

          <div className={`rsvp-form-state${submitted ? ' hide' : ''}`}>
            <div className="rsvp-form-body">

              <div className="rsvp-field">
                <label className="rsvp-label" htmlFor="rsvp-name">
                  Your Full Name <span className="req">*</span>
                </label>
                <input
                  id="rsvp-name" className="rsvp-input" type="text"
                  placeholder="e.g. Adaeze Williams"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </div>

              {/* ── Phone field ── */}
              <div className="rsvp-field">
                <label className="rsvp-label" htmlFor="rsvp-phone">
                  Phone Number <span className="req">*</span>
                </label>
                <div className="phone-field-wrap">

                  {/* Country code custom dropdown */}
                  <div className="phone-code-wrap" ref={dropdownRef}>
                    <button
                      type="button"
                      className="phone-code-btn"
                      onClick={() => setDropOpen(o => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={dropOpen}
                    >
                      <img
                        src={flagSrc(country.iso)}
                        alt={country.name}
                        className="phone-flag"
                        width="20"
                        height="14"
                      />
                      <span>{country.code}</span>
                      <span className="phone-caret">▾</span>
                    </button>

                    {dropOpen && (
                      <ul className="phone-dropdown" role="listbox">
                        {COUNTRIES.map((c, i) => (
                          <li
                            key={i}
                            role="option"
                            aria-selected={i === countryIdx}
                            className={`phone-dropdown-item${i === countryIdx ? ' active' : ''}`}
                            onClick={() => selectCountry(i)}
                          >
                            <img
                              src={flagSrc(c.iso)}
                              alt={c.name}
                              className="phone-flag"
                              width="20"
                              height="14"
                            />
                            <span className="phone-dropdown-code">{c.code}</span>
                            <span className="phone-dropdown-name">{c.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Number input */}
                  <input
                    id="rsvp-phone"
                    className="phone-num-input"
                    type="tel"
                    inputMode="numeric"
                    placeholder={'X'.repeat(country.digits)}
                    value={phoneNum}
                    onChange={handlePhoneInput}
                    maxLength={country.digits}
                  />
                </div>
                <p className="phone-hint">
                  {country.digits} digits · no leading zero · {phoneNum.length}/{country.digits}
                </p>
              </div>

              <div className="rsvp-field">
                <label className="rsvp-label">
                  Will you attend? <span className="req">*</span>
                </label>
                <div className="rsvp-options">
                  {[
                    { value: "Yes, I'll be there!", label: "Yes, I'll be there!", Icon: PartyPopper },
                    { value: 'Regretfully unable',  label: 'Regretfully unable',  Icon: null },
                    { value: 'Not yet sure',         label: 'Not yet sure',         Icon: null },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`rsvp-option${form.attending === opt.value ? ' checked' : ''}`}
                    >
                      <input
                        type="radio" name="attending" value={opt.value}
                        checked={form.attending === opt.value}
                        onChange={e => set('attending', e.target.value)}
                      />
                      {opt.Icon && <opt.Icon size={14} strokeWidth={1.8} style={{ flexShrink: 0 }} />}
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rsvp-field">
                <label className="rsvp-label" htmlFor="rsvp-plusone">
                  Will you bring a plus one?
                </label>
                <select
                  id="rsvp-plusone" className="rsvp-select"
                  value={form.plusone}
                  onChange={e => set('plusone', e.target.value)}
                >
                  {['Just me', '1 guest', '2 guests', '3 guests'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="rsvp-field">
                <label className="rsvp-label" htmlFor="rsvp-notes">
                  Your best wishes mean a lot to us
                </label>
                <textarea
                  id="rsvp-notes" className="rsvp-textarea"
                  placeholder="Leave a note for the couple"
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                />
              </div>

              <button
                className="btn-rsvp-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Confirm My Attendance ✦'}
              </button>
            </div>
          </div>

          <div className={`rsvp-thankyou${submitted ? ' show' : ''}`}>
            <div className="thankyou-icon"><PartyPopper size={48} strokeWidth={1.4} /></div>
            <h3 className="thankyou-title">Thank you!</h3>
            <p className="thankyou-msg">
              Your RSVP has been received. We can't wait to celebrate with you!
            </p>
            <p className="thankyou-names">{bride.firstName} &amp; {groom.firstName}</p>
          </div>

        </div>
      </div>
    </>
  )
}
