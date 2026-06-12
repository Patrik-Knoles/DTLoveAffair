import { WEDDING } from '../config'

export default function Footer() {
  const { bride, groom, displayDate, city, images } = WEDDING
  return (
    <>
      <footer>
        {images.logo && (
          <img src={images.logo} alt="DT Wedding Logo" className="footer-logo" />
        )}
        <p className="footer-names">
          {bride.firstName} <em>&amp;</em> {groom.firstName}
        </p>
        <p className="footer-date">{displayDate} · {city}</p>
        <div className="footer-divider"><span>✦</span></div>
      </footer>

      <div className="pta-bar">
        <img src="/images/pta-favicon.png" alt="Patrick the Assistant" className="pta-bar-icon" />
        <span>
          Made by{' '}
          <a href="https://patricktheassistant.com/" target="_blank" rel="noreferrer">
            Patrick the Assistant
          </a>
        </span>
      </div>
    </>
  )
}
