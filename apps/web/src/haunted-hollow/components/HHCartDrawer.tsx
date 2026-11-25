interface HHCartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function HHCartDrawer({ open, onClose }: HHCartDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="hh-cart-overlay" onClick={onClose} />
      <div className="hh-cart-drawer" role="dialog" aria-modal="true">
        <div className="hh-cart-header">
          <h2 style={{ fontSize: '18px', fontVariant: 'small-caps', margin: 0 }}>
            Your Basket
          </h2>
          {/* BUG: close button — X SVG, no accessible name — bug-14 */}
          <button className="hh-cart-close" data-hh-id="cart-close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <p style={{ color: '#888', fontSize: '14px' }}>Your basket is empty.</p>
        <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>
          Explore our{' '}
          <a href="/haunted-hollow#shop" style={{ color: '#6b4c2a' }}>
            full collection
          </a>{' '}
          of curiosities.
        </p>
      </div>
    </>
  );
}
