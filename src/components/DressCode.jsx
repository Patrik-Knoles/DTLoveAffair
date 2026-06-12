import { WEDDING } from '../config'

export default function DressCode() {
  const { dressCode } = WEDDING

  return (
    <section id="dresscode">
      <div className="dresscode-inner">
        <p className="section-label reveal">What to Wear</p>
        <h2 className="section-title reveal">Dress <em>Code</em></h2>
        <div className="divider reveal"><span>✦</span></div>
        <p className="dresscode-note reveal">{dressCode.note}</p>

        <div className="dresscode-swatches stagger-reveal">
          {dressCode.swatches.map(s => (
            <div className="color-swatch" key={s.name}>
              <div className="swatch-circle" style={{ background: s.hex }} />
              <p className="swatch-name">{s.name}</p>
              <p className="swatch-hex">{s.hex}</p>
            </div>
          ))}
        </div>

        <div className="dresscode-events reveal">
          {dressCode.tags.map(t => (
            <div className="dresscode-tag" key={t.event}>
              <strong>{t.event}:</strong> {t.attire}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
