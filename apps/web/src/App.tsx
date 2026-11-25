import { Routes, Route } from 'react-router-dom';
import { HauntedHollow } from './haunted-hollow/HauntedHollow';

export default function App() {
  return (
    <Routes>
      {/* Landing page — Stage 10 */}
      <Route
        path="/"
        element={
          <div
            className="text-bone bg-void min-h-screen flex items-center justify-center font-display text-4xl"
            style={{ color: '#ECE6D9', background: '#07060B' }}
          >
            POSSESSED — Coming Soon
          </div>
        }
      />

      {/* Haunted Hollow demo store — Stage 1 */}
      <Route path="/haunted-hollow/*" element={<HauntedHollow />} />
    </Routes>
  );
}
