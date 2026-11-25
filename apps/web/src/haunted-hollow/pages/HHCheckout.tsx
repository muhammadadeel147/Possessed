export function HHCheckout() {
  return (
    /* BUG: no <main> landmark */
    <div>
      <div className="hh-checkout">
        <h1 style={{ fontSize: '24px', fontVariant: 'small-caps', marginBottom: '32px', color: '#1a1209' }}>
          Checkout
        </h1>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* BUG: inputs with placeholder but no label — bug-22, bug-23, bug-24 */}
          <div className="hh-field">
            {/* BUG: no <label> — bug-22 */}
            <input
              type="text"
              placeholder="Full name"
              data-hh-id="checkout-name-input"
            />
          </div>

          <div className="hh-field">
            {/* BUG: no <label> — bug-23 */}
            <input
              type="email"
              placeholder="Email address"
              data-hh-id="checkout-email-input"
            />
          </div>

          <div className="hh-field">
            <input
              type="text"
              placeholder="Address line 1"
              style={{ width: '100%', padding: '12px 14px', border: '1px solid #ddd', marginBottom: '16px', fontSize: '15px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="hh-field">
              <input
                type="text"
                placeholder="City"
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
              />
            </div>
            <div className="hh-field">
              <input
                type="text"
                placeholder="Postcode"
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px' }} className="hh-field">
            {/* BUG: select with no label — bug-31 */}
            <select data-hh-id="shipping-select">
              <option value="">Select shipping method</option>
              <option value="standard">Standard (3–5 days) — Free</option>
              <option value="express">Express (1–2 days) — £8.95</option>
              <option value="next-day">Next Day — £14.95</option>
            </select>
          </div>

          <hr style={{ margin: '32px 0', borderColor: '#ddd' }} />

          <h2 style={{ fontSize: '18px', fontVariant: 'small-caps', marginBottom: '20px', color: '#1a1209' }}>
            Payment
          </h2>

          <div className="hh-field">
            {/* BUG: no <label> — bug-24 */}
            <input
              type="text"
              placeholder="Card number"
              data-hh-id="checkout-card-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              type="text"
              placeholder="MM / YY"
              style={{ padding: '12px 14px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
            />
            <input
              type="text"
              placeholder="CVV"
              style={{ padding: '12px 14px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: '32px',
              width: '100%',
              padding: '16px',
              background: '#1a1209',
              color: '#c9a84c',
              border: 'none',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Complete Order
          </button>
        </form>
      </div>
    </div>
  );
}
