import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft, Camera, Upload, X, ChevronLeft, ChevronRight, LogOut, ImageOff,
} from 'lucide-react'
import { WEDDING } from '../config'
import '../styles/gallery.css'

const cfg         = WEDDING.guestGallery
const SESSION_KEY = `dt_gallery_${cfg.id}`
const MAX         = cfg.max || 20
const ALLOWED     = new Set(['image/jpeg','image/png','image/webp','image/heic','image/heif'])

// ── API helpers ──────────────────────────────────────────────────────────────

async function apiGet(action, extra = {}) {
  const qs  = new URLSearchParams({ action, wedding_id: cfg.id, ...extra })
  const res = await fetch(`${cfg.apiUrl}?${qs}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

async function apiPost(payload) {
  return fetch(cfg.apiUrl, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body:    JSON.stringify(payload),
  })
}

async function cloudinaryUpload(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const fd  = new FormData()
    fd.append('file',          file)
    fd.append('upload_preset', cfg.preset)
    fd.append('folder',        `weddings/${cfg.id}`)
    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    })
    xhr.addEventListener('load', () => {
      try {
        const data = JSON.parse(xhr.responseText)
        data.error ? reject(new Error(data.error.message)) : resolve(data.secure_url)
      } catch { reject(new Error('Invalid upload response')) }
    })
    xhr.addEventListener('error', () => reject(new Error('Upload failed')))
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cfg.cloud}/image/upload`)
    xhr.send(fd)
  })
}

// ── Component ────────────────────────────────────────────────────────────────

export default function GuestGalleryPage() {
  const [phase,       setPhase]       = useState('login')
  const [guest,       setGuest]       = useState(null)
  const [form,        setForm]        = useState({ firstName:'', lastName:'', phone:'' })
  const [uploadCount, setUploadCount] = useState(0)
  const [photos,      setPhotos]      = useState([])
  const [uploading,   setUploading]   = useState(false)
  const [progress,    setProgress]    = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [filter,      setFilter]      = useState('all')
  const [toast,       setToast]       = useState(null)
  const [dragging,    setDragging]    = useState(false)
  const [loginBusy,   setLoginBusy]   = useState(false)
  const fileRef  = useRef(null)
  const toastRef = useRef(null)
  const pollRef  = useRef(null)

  // Restore session
  useEffect(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
      if (s?.phone) {
        setGuest(s)
        setUploadCount(s.uploadCount ?? 0)
        setPhase('gallery')
      }
    } catch {}
  }, [])

  // Poll photos every 6 s in gallery phase
  useEffect(() => {
    if (phase !== 'gallery') return
    loadPhotos()
    pollRef.current = setInterval(loadPhotos, 6000)
    return () => clearInterval(pollRef.current)
  }, [phase])

  // Keyboard nav in lightbox
  useEffect(() => {
    const displayed = filter === 'mine'
      ? photos.filter(p => p.phone === guest?.phone)
      : photos
    const h = e => {
      if (lightboxIdx === null) return
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % displayed.length)
      if (e.key === 'ArrowLeft')  setLightboxIdx(i => (i - 1 + displayed.length) % displayed.length)
      if (e.key === 'Escape')     setLightboxIdx(null)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lightboxIdx, photos, filter, guest])

  const showToast = (msg, type = 'info') => {
    clearTimeout(toastRef.current)
    setToast({ msg, type })
    toastRef.current = setTimeout(() => setToast(null), 4000)
  }

  const loadPhotos = async () => {
    try {
      const d = await apiGet('get_photos')
      if (Array.isArray(d.photos)) setPhotos(d.photos)
    } catch { /* silently ignore — backend may not be configured yet */ }
  }

  const handleLogin = async () => {
    const { firstName, lastName, phone } = form
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      showToast('Please fill in all fields.', 'warn')
      return
    }
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 6) {
      showToast('Please enter a valid phone number.', 'warn')
      return
    }
    setLoginBusy(true)
    let count = 0
    try {
      const d = await apiGet('get_count', { phone: cleanPhone })
      count = Number(d.count) || 0
    } catch { /* backend not ready — proceed with count 0 */ }
    const g = {
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      phone:     cleanPhone,
      uploadCount: count,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(g))
    setGuest(g)
    setUploadCount(count)
    setPhase('gallery')
    setLoginBusy(false)
  }

  const handleFiles = async files => {
    if (!files?.length) return
    const remaining = MAX - uploadCount
    if (remaining <= 0) {
      showToast(`You've reached the ${MAX}-photo limit.`, 'warn')
      return
    }
    const valid = Array.from(files)
      .filter(f => ALLOWED.has(f.type.toLowerCase()))
      .slice(0, Math.min(5, remaining))
    if (!valid.length) {
      showToast('Please choose JPG, PNG, WEBP, or HEIC photos only.', 'warn')
      return
    }
    setUploading(true)
    setProgress(0)
    let done = 0
    for (const file of valid) {
      try {
        const url = await cloudinaryUpload(file, p =>
          setProgress(Math.round(((done + p / 100) / valid.length) * 100))
        )
        await apiPost({
          action:      'add_photo',
          wedding_id:  cfg.id,
          first_name:  guest.firstName,
          last_name:   guest.lastName,
          phone:       guest.phone,
          photo_url:   url,
        })
        done++
        const newCount = uploadCount + done
        setUploadCount(newCount)
        const g = { ...guest, uploadCount: newCount }
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(g))
        setPhotos(prev => [
          { url, name: `${guest.firstName} ${guest.lastName}`, phone: guest.phone },
          ...prev,
        ])
      } catch (err) {
        showToast(`Could not upload ${file.name}. ${err.message}`, 'error')
      }
    }
    setUploading(false)
    setProgress(0)
    if (done > 0) showToast(`${done} photo${done !== 1 ? 's' : ''} added — thank you! ✦`, 'success')
  }

  const signOut = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setGuest(null)
    setForm({ firstName:'', lastName:'', phone:'' })
    setUploadCount(0)
    setPhotos([])
    setPhase('login')
    setFilter('all')
  }

  const displayed = filter === 'mine'
    ? photos.filter(p => p.phone === guest?.phone)
    : photos

  const shiftLb = d =>
    setLightboxIdx(i => (i + d + displayed.length) % displayed.length)

  const { bride, groom, displayDate, city } = WEDDING

  return (
    <div className="gpage">

      {/* ── Toast ── */}
      {toast && (
        <div className={`gpage-toast gpage-toast--${toast.type}`}>
          <span>{toast.msg}</span>
          <button onClick={() => setToast(null)}><X size={13} /></button>
        </div>
      )}

      {/* ── Header ── */}
      <header className="gpage-header">
        <a href="/" className="gpage-back">
          <ArrowLeft size={14} /> Back to site
        </a>
        <div className="gpage-header-body">
          <p className="gpage-eyebrow">Guest Album</p>
          <h1 className="gpage-couple">
            {bride.firstName} <em>&amp;</em> {groom.firstName}
          </h1>
          <p className="gpage-meta">{displayDate} · {city}</p>
        </div>
      </header>

      {/* ── LOGIN ── */}
      {phase === 'login' && (
        <main className="gpage-main">
          <div className="gpage-login-wrap">
            <div className="gpage-login-card">
              <div className="gpage-login-icon">
                <Camera size={26} strokeWidth={1.4} />
              </div>
              <h2 className="gpage-login-title">Join the album</h2>
              <p className="gpage-login-sub">
                Share your favourite moments from our special day — we'd love to see them!
              </p>
              {[
                { key:'firstName', label:'First Name',    placeholder:'e.g. Adaeze'       },
                { key:'lastName',  label:'Last Name',     placeholder:'e.g. Williams'      },
                { key:'phone',     label:'Phone Number',  placeholder:'Your phone number'  },
              ].map(({ key, label, placeholder }) => (
                <div className="gpage-field" key={key}>
                  <label className="gpage-label">{label}</label>
                  <input
                    className="gpage-input"
                    type={key === 'phone' ? 'tel' : 'text'}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              ))}
              <button
                className="gpage-login-btn"
                onClick={handleLogin}
                disabled={loginBusy}
              >
                {loginBusy ? 'Checking…' : 'Enter the Album →'}
              </button>
              <p className="gpage-privacy">
                Your details are only used to track your upload limit and credit your photos.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* ── GALLERY ── */}
      {phase === 'gallery' && guest && (
        <main className="gpage-main">

          {/* Top bar */}
          <div className="gpage-topbar">
            <span className="gpage-guest-badge">Hi, {guest.firstName}!</span>
            <div className="gpage-quota">
              <span className="gpage-quota-label">{uploadCount} / {MAX} photos</span>
              <div className="gpage-quota-track">
                <div
                  className="gpage-quota-fill"
                  style={{ width: `${Math.min((uploadCount / MAX) * 100, 100)}%` }}
                />
              </div>
            </div>
            <button className="gpage-signout" onClick={signOut}>
              <LogOut size={13} /> Sign out
            </button>
          </div>

          {/* Upload zone */}
          {uploadCount < MAX && (
            <div
              className={`gpage-dropzone${dragging ? ' dragging' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => {
                e.preventDefault()
                setDragging(false)
                handleFiles(e.dataTransfer.files)
              }}
              onClick={() => !uploading && fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,.heic,.heif"
                style={{ display: 'none' }}
                onChange={e => handleFiles(e.target.files)}
              />
              {uploading ? (
                <>
                  <div className="gpage-drop-icon"><Upload size={26} /></div>
                  <p className="gpage-drop-title">Uploading…</p>
                  <div className="gpage-progress-bar">
                    <div className="gpage-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="gpage-drop-hint">{progress}%</p>
                </>
              ) : (
                <>
                  <div className="gpage-drop-icon"><Upload size={26} /></div>
                  <p className="gpage-drop-title">Add your photos</p>
                  <p className="gpage-drop-hint">
                    JPG · PNG · WEBP · HEIC &nbsp;·&nbsp; up to 5 at once
                  </p>
                  <button
                    className="gpage-choose-btn"
                    onClick={e => { e.stopPropagation(); fileRef.current?.click() }}
                  >
                    Choose Photos
                  </button>
                </>
              )}
            </div>
          )}

          {/* Photos header + filter */}
          <div className="gpage-photos-header">
            <h2 className="gpage-photos-title">
              Memories
              {photos.length > 0 && <span className="gpage-live-dot" />}
            </h2>
            <div className="gpage-filter-tabs">
              {[['all','All Photos'],['mine','Mine']].map(([val, label]) => (
                <button
                  key={val}
                  className={`gpage-filter-tab${filter === val ? ' active' : ''}`}
                  onClick={() => setFilter(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid / empty state */}
          {displayed.length === 0 ? (
            <div className="gpage-empty">
              <ImageOff size={38} strokeWidth={1.2} />
              <p>
                {filter === 'mine'
                  ? "You haven't added any photos yet."
                  : 'No photos yet — be the first to share!'}
              </p>
            </div>
          ) : (
            <div className="gpage-grid">
              {displayed.map((p, i) => (
                <div
                  className="gpage-grid-item"
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                >
                  <img src={p.url} alt={`Photo by ${p.name}`} loading="lazy" />
                  <div className="gpage-grid-overlay">
                    <span className="gpage-grid-credit">{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && displayed[lightboxIdx] && (
        <div className="gpage-lightbox" onClick={() => setLightboxIdx(null)}>
          <button className="gpage-lb-close" onClick={() => setLightboxIdx(null)}>
            <X size={18} />
          </button>
          {displayed.length > 1 && (
            <button
              className="gpage-lb-nav gpage-lb-prev"
              onClick={e => { e.stopPropagation(); shiftLb(-1) }}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <img
            src={displayed[lightboxIdx].url}
            alt=""
            className="gpage-lb-img"
            onClick={e => e.stopPropagation()}
          />
          {displayed.length > 1 && (
            <button
              className="gpage-lb-nav gpage-lb-next"
              onClick={e => { e.stopPropagation(); shiftLb(1) }}
            >
              <ChevronRight size={20} />
            </button>
          )}
          <p className="gpage-lb-credit">
            Shared by {displayed[lightboxIdx].name}
          </p>
        </div>
      )}

    </div>
  )
}
