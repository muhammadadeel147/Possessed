import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../products';

export function HHProduct() {
  const { slug } = useParams<{ slug: string }>();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.slug === slug) ?? products[0]!;

  return (
    /* BUG: no <main> landmark */
    <div>
      <div style={{ background: '#f3ede3', padding: '12px 24px', fontSize: '12px', color: '#888' }}>
        <Link to="/haunted-hollow" style={{ color: '#6b4c2a' }}>Home</Link>
        {' · '}
        <Link to="/haunted-hollow#shop" style={{ color: '#6b4c2a' }}>Shop</Link>
        {' · '}
        <span>{product.name}</span>
      </div>

      <div className="hh-detail">
        <div className="hh-detail-img-wrap">
          {/* BUG: product detail image has no alt — bug-33 */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            src={product.image}
            data-hh-id="product-detail-img"
          />
        </div>

        <div>
          <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b4c2a', fontWeight: 600 }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '28px', fontVariant: 'small-caps', margin: '8px 0 4px', color: '#1a1209' }}>
            {product.name}
          </h1>
          {/* BUG: price low contrast — bug-19 */}
          <p style={{ fontSize: '22px', color: '#c9a84c', fontWeight: 600, marginBottom: '20px' }}>
            {product.price}
          </p>

          {/* BUG: long description in low-contrast grey — bug-34 */}
          <p className="hh-detail-description" data-hh-id="product-detail-contrast">
            {product.longDescription}
          </p>

          {/* Quantity selector — BUG: tiny buttons with no accessible names — bug-12, bug-13, bug-25 */}
          <div className="hh-qty-wrapper">
            {/* BUG: no aria-label — bug-12 */}
            <button
              className="hh-qty-btn"
              data-hh-id="qty-minus"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="hh-qty-display">{qty}</span>
            {/* BUG: no aria-label — bug-13 */}
            <button
              className="hh-qty-btn"
              data-hh-id="qty-plus"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* BUG: fake div button — bug-30 (second instance on product page) */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="hh-fake-cta"
            onClick={() => alert('Added to basket')}
            style={{ width: '100%', marginBottom: '12px' }}
          >
            Add to Basket
          </div>

          <button
            style={{
              width: '100%',
              padding: '14px',
              background: 'none',
              border: '1px solid #1a1209',
              color: '#1a1209',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Add to Wishlist
          </button>

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.7 }}>
              Free shipping on orders over £75. Standard delivery 3–5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
