export default function MusicFab({ isPlaying, onToggle }) {
  return (
    <button
      id="music-fab"
      className={isPlaying ? 'playing' : ''}
      onClick={onToggle}
      aria-label="Toggle music"
    >
      <span className="fab-icon">🎵</span>
      <div className="fab-wave-bars">
        <span className="fab-wave-bar" />
        <span className="fab-wave-bar" />
        <span className="fab-wave-bar" />
        <span className="fab-wave-bar" />
      </div>
    </button>
  )
}
