export function HHFooter() {
  return (
    <footer className="hh-footer">
      <div className="hh-footer-inner">
        {/* BUG: footer links with tiny target size — bug-26 */}
        <div className="hh-footer-links">
          <a href="/haunted-hollow">Home</a>
          <span>·</span>
          <a href="/haunted-hollow#shop">Shop</a>
          <span>·</span>
          <a href="/haunted-hollow#about">About</a>
          <span>·</span>
          <a href="/haunted-hollow/checkout">Shipping &amp; Returns</a>
          <span>·</span>
          {/* BUG: "click here" link text — bug-32 */}
          <a href="/haunted-hollow#accessibility" data-hh-id="click-here-link">click here</a>
        </div>

        {/* BUG: social icon links — no accessible name — bug-15, bug-16 */}
        <div className="hh-social-links">
          <a href="https://x.com" data-hh-id="social-twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.252 2.25H8.08l4.253 5.622L18.244 2.25zM17.1 19.77h1.833L7.084 4.126H5.117L17.1 19.77z"/>
            </svg>
          </a>
          <a href="https://instagram.com" data-hh-id="social-instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>

        <p style={{ margin: 0 }}>
          © 2026 Haunted Hollow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
