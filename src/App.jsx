import { useState } from 'react'
import { houses, featureIcons } from './data'
import { Waves, Wine, Anchor, Home, Flower2, Bell, Sun, Flame, ShieldCheck, Leaf, Building2, UtensilsCrossed, CloudSun, Sparkles, ArrowUpDown, Flower, Gem, Car, HeartPulse, Clapperboard, X } from 'lucide-react'
import './App.css'

// Prevent tree-shaking by explicitly referencing all icons
const _icons = [Waves, Wine, Anchor, Home, Flower2, Bell, Sun, Flame, ShieldCheck, Leaf, Building2, UtensilsCrossed, CloudSun, Sparkles, ArrowUpDown, Flower, Gem, Car, HeartPulse, Clapperboard]

const ICON_MAP = {
  waves: Waves,
  wine: Wine,
  anchor: Anchor,
  home: Home,
  'flower-2': Flower2,
  bell: Bell,
  sun: Sun,
  flame: Flame,
  'shield-check': ShieldCheck,
  leaf: Leaf,
  'building-2': Building2,
  'utensils-crossed': UtensilsCrossed,
  'cloud-sun': CloudSun,
  sparkles: Sparkles,
  'arrow-up-down': ArrowUpDown,
  flower: Flower,
  gem: Gem,
  car: Car,
  'heart-pulse': HeartPulse,
  clapperboard: Clapperboard,
}

function FeatureIcon({ name, size = 14 }) {
  const IconComponent = ICON_MAP[name]
  return IconComponent ? <IconComponent size={size} strokeWidth={1.5} /> : null
}

function App() {
  const [selected, setSelected] = useState(new Set())
  const [currentFilter, setCurrentFilter] = useState('all')
  const [modalHouse, setModalHouse] = useState(null)

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = currentFilter === 'all' ? houses : houses.filter(h => h.type === currentFilter)

  return (
    <>
      <nav>
        <div className="logo">Palos Verdes Estates</div>
        <div className="nav-links">
          <a href="#houses">The Collection</a>
          <a href="#" onClick={(e) => { e.preventDefault(); if (selected.size === 0) alert('Your shortlist is empty. Start browsing!'); else alert('Your Shortlisted Estates:\n\n' + [...selected].map(id => { const h = houses.find(x => x.id === id); return `• ${h.address} — ${h.price}`; }).join('\n')); }}>My Shortlist</a>
          <div className="selected-count">{selected.size}</div>
        </div>
      </nav>

      <section className="hero">
        <p className="hero-eyebrow">Welcome to Wisteria Lane's finest rival</p>
        <h1>Every great drama<br />needs a grand stage.</h1>
        <p className="hero-sub">Oceanfront estates, cliffside villas, and the kind of curb appeal that starts neighborhood gossip. Find your Palos Verdes forever home.</p>
        <div className="filters">
          {['all', 'house', 'condo', 'townhouse'].map(type => (
            <button key={type} className={`filter-btn ${currentFilter === type ? 'active' : ''}`} onClick={() => setCurrentFilter(type)}>
              {type === 'all' ? 'All Estates' : type === 'house' ? 'Estates' : type === 'condo' ? 'Villas' : 'Townhomes'}
            </button>
          ))}
        </div>
      </section>

      <section className="houses-section" id="houses">
        <div className="houses-grid">
          {filtered.map(h => (
            <div key={h.id} className={`house-card ${selected.has(h.id) ? 'selected' : ''}`} onClick={() => setModalHouse(h)}>
              <div className="house-img-wrapper">
                {h.id === 9 && <span className="residence-tag">Famous Residence</span>}
                <img className="house-img" src={h.image} alt={h.address} loading="lazy" style={{ backgroundColor: '#f5efe8' }} />
              </div>
              <div className="house-info">
                <div className="house-price">{h.price}</div>
                <div className="house-address">{h.address}</div>
                <div className="house-features">
                  <span className="feature"><strong>{h.beds}</strong> Beds</span>
                  <span className="feature"><strong>{h.baths}</strong> Baths</span>
                  <span className="feature"><strong>{h.sqft}</strong> ft²</span>
                </div>
                <div className="house-icons">
                  {h.features.map(f => (
                    <span key={f} className="icon-badge" title={featureIcons[f].label}>
                      <FeatureIcon name={featureIcons[f].icon} /> {featureIcons[f].label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalHouse && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) setModalHouse(null); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setModalHouse(null)} aria-label="Close">
              <X size={18} strokeWidth={2} />
            </button>
            <div className="modal-body">
              <div className="modal-media">
                <img src={modalHouse.image} style={{ width: '100%', borderRadius: '12px', height: '300px', objectFit: 'cover' }} alt={modalHouse.address} />
              </div>
              <h2>{modalHouse.address}</h2>
              <div className="price">{modalHouse.price}</div>
              <div className="details-grid">
                <div className="detail-item"><div className="label">Bedrooms</div><div className="value">{modalHouse.beds}</div></div>
                <div className="detail-item"><div className="label">Bathrooms</div><div className="value">{modalHouse.baths}</div></div>
                <div className="detail-item"><div className="label">Square Feet</div><div className="value">{modalHouse.sqft}</div></div>
                <div className="detail-item"><div className="label">Year Built</div><div className="value">{modalHouse.year}</div></div>
                <div className="detail-item"><div className="label">Garage</div><div className="value">{modalHouse.garage}</div></div>
                <div className="detail-item"><div className="label">Type</div><div className="value">{modalHouse.type.charAt(0).toUpperCase() + modalHouse.type.slice(1)}</div></div>
              </div>
              <p className="description">{modalHouse.description}</p>
              <button className={`select-btn ${selected.has(modalHouse.id) ? 'selected' : ''}`} onClick={() => toggleSelect(modalHouse.id)}>
                {selected.has(modalHouse.id) ? '✓ Added to Shortlist' : 'Add to My Shortlist'}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer><p>The most exclusive address in Palos Verdes. © 2026</p></footer>
    </>
  )
}

export default App
