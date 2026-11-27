import { Routes, Route } from 'react-router-dom';
import { HauntedHollow } from './haunted-hollow/HauntedHollow';
import { SpiritsPlayground } from './dev/SpiritsPlayground';

export default function App() {
  return (
    <Routes>
      {/* Landing page — Stage 10 */}
      <Route
        path="/"
        element={
          <div
            style={{
              color: '#ECE6D9',
              background: '#07060B',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"IM Fell English SC", serif',
              fontSize: '2.5rem',
            }}
          >
            POSSESSED — Coming Soon
          </div>
        }
      />

      {/* Haunted Hollow demo store — Stage 1 */}
      <Route path="/haunted-hollow/*" element={<HauntedHollow />} />

      {/* Dev playground — Stage 2 */}
      <Route path="/dev/spirits" element={<SpiritsPlayground />} />
    </Routes>
  );
}
