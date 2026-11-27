/**
 * /dev/spirits — temporary dev playground for testing spirits visually.
 * Not included in the production bundle.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  createPossession,
  type Possession,
  type DrainMode,
} from '@possessed/core';

const DRAIN_MODES: DrainMode[] = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];

export function SpiritsPlayground() {
  const possessionRef = useRef<Possession | null>(null);
  const acRef = useRef<AbortController | null>(null);

  const [fogOn, setFogOn] = useState(false);
  const [fogI, setFogI] = useState(0.5);
  const [drainOn, setDrainOn] = useState(false);
  const [drainI, setDrainI] = useState(0.8);
  const [drainMode, setDrainMode] = useState<DrainMode>('protanopia');
  const [tunnelOn, setTunnelOn] = useState(false);
  const [tunnelI, setTunnelI] = useState(0.6);

  // Initialise possession on mount
  useEffect(() => {
    const possession = createPossession(document, { calmMode: false });
    possessionRef.current = possession;
    return () => {
      possession.destroy();
      acRef.current?.abort();
    };
  }, []);

  const getCtx = useCallback(() => {
    acRef.current?.abort();
    const ac = new AbortController();
    acRef.current = ac;
    return possessionRef.current!.context(ac.signal);
  }, []);

  // Fog
  const toggleFog = useCallback(() => {
    const p = possessionRef.current!;
    if (fogOn) {
      p.spirits.exorcise('fog');
      setFogOn(false);
    } else {
      p.spirits.possess('fog', getCtx(), fogI);
      setFogOn(true);
    }
  }, [fogOn, fogI, getCtx]);

  const handleFogSlider = useCallback((v: number) => {
    setFogI(v);
    if (fogOn) possessionRef.current!.spirits.setIntensity('fog', v);
  }, [fogOn]);

  // Drain
  const toggleDrain = useCallback(() => {
    const p = possessionRef.current!;
    if (drainOn) {
      p.spirits.exorcise('drain');
      setDrainOn(false);
    } else {
      p.spirits.possess('drain', getCtx(), drainI);
      setDrainOn(true);
    }
  }, [drainOn, drainI, getCtx]);

  const handleDrainSlider = useCallback((v: number) => {
    setDrainI(v);
    if (drainOn) possessionRef.current!.spirits.setIntensity('drain', v);
  }, [drainOn]);

  const handleDrainMode = useCallback((mode: DrainMode) => {
    setDrainMode(mode);
    const spirit = possessionRef.current!.spirits.get('drain');
    if (spirit && 'setMode' in spirit) {
      (spirit as { setMode: (m: DrainMode) => void }).setMode(mode);
    }
  }, []);

  // Tunnel
  const toggleTunnel = useCallback(() => {
    const p = possessionRef.current!;
    if (tunnelOn) {
      p.spirits.exorcise('tunnel');
      setTunnelOn(false);
    } else {
      p.spirits.possess('tunnel', getCtx(), tunnelI);
      setTunnelOn(true);
    }
  }, [tunnelOn, tunnelI, getCtx]);

  const handleTunnelSlider = useCallback((v: number) => {
    setTunnelI(v);
    if (tunnelOn) possessionRef.current!.spirits.setIntensity('tunnel', v);
  }, [tunnelOn]);

  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        background: '#07060B',
        color: '#ECE6D9',
        minHeight: '100vh',
        padding: '32px',
      }}
    >
      <h1 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '2rem', marginBottom: '8px' }}>
        Spirits Playground
      </h1>
      <p style={{ color: '#A49FB0', marginBottom: '32px', fontSize: '14px' }}>
        Dev page — toggle each spirit on this page. The Haunted Hollow is in the
        iframe below.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {/* Fog card */}
        <SpiritCard
          name="🌫️ The Fog"
          condition="Low vision"
          active={fogOn}
          intensity={fogI}
          onToggle={toggleFog}
          onIntensity={handleFogSlider}
        />

        {/* Drain card */}
        <SpiritCard
          name="🩸 The Drain"
          condition="Colour vision deficiency"
          active={drainOn}
          intensity={drainI}
          onToggle={toggleDrain}
          onIntensity={handleDrainSlider}
          extra={
            <div style={{ marginTop: '8px' }}>
              {DRAIN_MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => handleDrainMode(m)}
                  style={{
                    marginRight: '4px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    background: drainMode === m ? '#7CFFB2' : '#1C1926',
                    color: drainMode === m ? '#07060B' : '#ECE6D9',
                    border: '1px solid #7CFFB2',
                    cursor: 'pointer',
                    borderRadius: '2px',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          }
        />

        {/* Tunnel card */}
        <SpiritCard
          name="👁️ The Tunnel"
          condition="Tunnel vision"
          active={tunnelOn}
          intensity={tunnelI}
          onToggle={toggleTunnel}
          onIntensity={handleTunnelSlider}
        />
      </div>

      {/* Haunted Hollow preview iframe */}
      <div>
        <h2 style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A49FB0', marginBottom: '8px' }}>
          Test surface — Haunted Hollow
        </h2>
        <iframe
          src="/haunted-hollow"
          title="Haunted Hollow preview"
          style={{ width: '100%', height: '600px', border: '1px solid #1C1926', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
}

interface SpiritCardProps {
  name: string;
  condition: string;
  active: boolean;
  intensity: number;
  onToggle: () => void;
  onIntensity: (v: number) => void;
  extra?: React.ReactNode;
}

function SpiritCard({ name, condition, active, intensity, onToggle, onIntensity, extra }: SpiritCardProps) {
  return (
    <div
      style={{
        background: '#121019',
        border: `1px solid ${active ? '#7CFFB2' : '#1C1926'}`,
        borderRadius: '6px',
        padding: '20px',
        minWidth: '220px',
        boxShadow: active ? '0 0 16px rgba(124,255,178,0.12)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontWeight: 600 }}>{name}</span>
        <button
          onClick={onToggle}
          aria-pressed={active}
          style={{
            padding: '4px 12px',
            background: active ? '#7CFFB2' : 'transparent',
            color: active ? '#07060B' : '#7CFFB2',
            border: '1px solid #7CFFB2',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {active ? 'On' : 'Off'}
        </button>
      </div>
      <div style={{ fontSize: '12px', color: '#A49FB0', marginBottom: '12px' }}>{condition}</div>
      <label style={{ fontSize: '12px', color: '#A49FB0', display: 'block', marginBottom: '4px' }}>
        Intensity: {Math.round(intensity * 100)}%
      </label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={intensity}
        onChange={(e) => onIntensity(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#7CFFB2' }}
        aria-label={`${name} intensity`}
      />
      {extra}
    </div>
  );
}
