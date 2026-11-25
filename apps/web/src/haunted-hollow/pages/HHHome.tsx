import { Link } from 'react-router-dom';
import { products } from '../products';

export function HHHome() {
  return (
    <>
      {/* Hero section — BUG: image has no alt, content outside landmarks */}
      <section className="hh-hero">
        {/* BUG: no alt attribute on hero image — bug-01 */}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src="/haunted-hollow/images/IMG_4821.jpg.svg"
          data-hh-id="hero-image"
        />
        <div className="hh-hero-content">
          {/* This is an h1 — but we'll use h4 below, creating a jump — bug-28 */}
          <h1>Curiosities &amp; Candles</h1>
          <p style={{ color: '#cccccc', maxWidth: '480px', lineHeight: 1.7, fontSize: '16px' }}>
            Beautifully crafted objects for the thoughtfully haunted home.
          </p>
          {/* BUG: fake div button — bug-30 */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="hh-fake-cta"
            data-hh-id="fake-button"
            onClick={() => {
              const el = document.getElementById('hh-shop');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ marginTop: '24px' }}
          >
            Shop the Collection
          </div>
        </div>
      </section>

      {/* BUG: no <main> landmark wrapping main content — bug-29 */}
      <div id="hh-shop">
        {/* BUG: decorative divider image missing alt="" — bug-07 */}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src="/haunted-hollow/images/IMG_4821.jpg.svg"
          data-hh-id="decorative-divider"
          style={{ width: '100%', height: '3px', objectFit: 'cover', opacity: 0.2 }}
        />

        <section className="hh-products">
          {/* BUG: h1 → h4 heading jump — bug-28 */}
          <h4 className="hh-section-title" style={{ textAlign: 'center' }}>
            Featured Collection
          </h4>

          <div className="hh-grid">
            {products.map((product, i) => (
              <article key={product.slug} className="hh-product-card">
                {/* BUG: image link wraps img with no alt — bug-17 */}
                <Link
                  to={`/haunted-hollow/p/${product.slug}`}
                  className="hh-product-img-link"
                  data-hh-id={`product-link-${i + 1}`}
                >
                  {/* BUG: product images have no alt attribute — bug-02..06 */}
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <img
                    src={product.image}
                    data-hh-id={`product-img-${i + 1}`}
                  />
                </Link>

                <div className="hh-product-info">
                  <p className="hh-product-name">{product.name}</p>
                  {/* BUG: low-contrast grey description — bug-18 */}
                  <p className="hh-product-desc" data-hh-id={i === 0 ? 'body-copy-contrast' : undefined}>{product.description}</p>
                  {/* BUG: low-contrast gold price — bug-19 */}
                  <p className="hh-product-price" data-hh-id={i === 0 ? 'price-contrast' : undefined}>{product.price}</p>
                </div>

                <div className="hh-product-actions">
                  <button
                    style={{
                      background: '#1a1209',
                      color: '#c9a84c',
                      border: 'none',
                      padding: '10px 20px',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Add to Basket
                  </button>

                  {/* BUG: wishlist button — icon only, no accessible name — bug-10/11/37 */}
                  <button
                    className="hh-wishlist-btn"
                    data-hh-id={i === 0 ? 'wishlist-btn-1' : i === 1 ? 'wishlist-btn-2' : i === 2 ? 'wishlist-btn-3' : undefined}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter — BUG: input with no label — bug-21 */}
        <section className="hh-newsletter">
          <h2>Join the Séance</h2>
          <p>Be first to hear about new arrivals and exclusive rituals.</p>
        {/* BUG: newsletter area — bug-21 */}
        <form
          className="hh-newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          {/*
            BUG: input has no id, no aria-label, no associated label element
            This directly triggers the axe 'label' rule — bug-21
          */}
          <input
            type="email"
            className="hh-newsletter-input"
            placeholder="Your email address"
            data-hh-id="newsletter-input"
          />
          <button type="submit" className="hh-newsletter-btn">
            Subscribe
          </button>
        </form>
        </section>

        {/* Journal preview with more bugs */}
        <section style={{ background: '#f9f5ef', padding: '60px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* BUG: heading jump continues */}
            <h4 className="hh-section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>
              From the Journal
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { title: 'The Art of Candlemaking', excerpt: 'How we source our wax and fragrance ingredients.' },
                { title: 'Caring for Cast Iron', excerpt: 'Keep your raven sentinels looking pristine.' },
                { title: 'Reading the Tarot', excerpt: 'A beginner\'s guide to the Rider-Hollow deck.' },
              ].map((post) => (
                <article key={post.title} style={{ background: '#fff', padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1a1209' }}>
                    {post.title}
                  </h3>
                  {/* BUG: low-contrast grey body copy — bug-18 */}
                  <p style={{ color: '#aaaaaa', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>
                    {post.excerpt}
                  </p>
                  <a href="/haunted-hollow" style={{ color: '#6b4c2a', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    Read more →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
