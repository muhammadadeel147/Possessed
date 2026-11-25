import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HHHeader } from './components/HHHeader';
import { HHFooter } from './components/HHFooter';
import { HHCartDrawer } from './components/HHCartDrawer';
import { HHHome } from './pages/HHHome';
import { HHProduct } from './pages/HHProduct';
import { HHCheckout } from './pages/HHCheckout';
import './haunted-hollow.css';

/**
 * Haunted Hollow — intentionally inaccessible demo store.
 * This component deliberately removes the lang attribute from <html>
 * while mounted. This is the ONLY place this is allowed.
 */
export function HauntedHollow() {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  // BUG: remove lang attribute from <html> while Haunted Hollow is mounted — bug-27
  useEffect(() => {
    const html = document.documentElement;
    const originalLang = html.getAttribute('lang');
    html.removeAttribute('lang');
    return () => {
      if (originalLang) {
        html.setAttribute('lang', originalLang);
      } else {
        html.removeAttribute('lang');
      }
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="hh-root" data-hh-id="hh-root">
      {/*
        ACCESSIBLE BANNER — this banner itself must be accessible,
        per the spec requirement. It is a real landmark with real contrast.
      */}
      <div
        role="banner"
        style={{
          background: '#1a1209',
          color: '#ece6d9',
          textAlign: 'center',
          padding: '10px 16px',
          fontSize: '13px',
          lineHeight: 1.5,
          borderBottom: '1px solid #3d2e1a',
        }}
      >
        <strong>Haunted Hollow is intentionally inaccessible.</strong>{' '}
        It's a demo for{' '}
        <a
          href="/"
          style={{ color: '#7cffb2', textDecoration: 'underline' }}
        >
          Possessed
        </a>
        .
      </div>

      <HHHeader onCartOpen={() => setCartOpen(true)} />

      <Routes>
        <Route path="/" element={<HHHome />} />
        <Route path="/p/:slug" element={<HHProduct />} />
        <Route path="/checkout" element={<HHCheckout />} />
      </Routes>

      <HHFooter />
      <HHCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
