interface HHHeaderProps {
  onCartOpen: () => void;
}

export function HHHeader({ onCartOpen }: HHHeaderProps) {
  return (
    <header className="hh-header">
      <div className="hh-header-inner">
        {/* BUG: nav links in a plain div, not a <nav> element — bug-35 */}
        <div className="hh-nav-links">
          <a href="/haunted-hollow">Home</a>
          <a href="/haunted-hollow#shop">Shop</a>
          <a href="/haunted-hollow#about">About</a>
          <a href="/haunted-hollow#journal">Journal</a>
        </div>

        <a href="/haunted-hollow" className="hh-wordmark">
          Haunted Hollow
        </a>

        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {/* BUG: search button — icon only, no accessible name — bug-09 */}
          <button className="hh-icon-btn" data-hh-id="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>

          {/* BUG: cart button — icon only, no accessible name — bug-08 */}
          <button className="hh-icon-btn" data-hh-id="cart-btn" onClick={onCartOpen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
