import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

const FOCUS_KEY = 'kaap10_active_focus_session';
const POS_KEY = 'kaap10_widget_pos';
const VIS_KEY = 'kaap10_widget_visible';

function fmtTime(s) {
  s = Math.max(0, Math.floor(s));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const p = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${p(h)}:${p(m)}:${p(sec)}` : `${p(m)}:${p(sec)}`;
}

// Clean SVG icons (zero emoji / zero encoding dependencies)
const IcoPause = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>;
const IcoPlay  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>;
const IcoMinus = () => <svg width="11" height="11" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" fill="none"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcoClose = () => <svg width="11" height="11" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoExpand = () => <svg width="11" height="11" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>;
const IcoPill = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="8" width="18" height="8" rx="4"/></svg>;
const IcoPip  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 22 2 22 7"/><line x1="12" y1="12" x2="22" y2="2"/></svg>;
const IcoFocus = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>;

function PiPContent({ snap, onPause, onResume, onClose }) {
  const { isActive, mode, secondsRemaining, elapsedSeconds } = snap;
  const display = mode === 'countdown' ? fmtTime(secondsRemaining) : fmtTime(elapsedSeconds);
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#0a0a0c', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', boxSizing: 'border-box', padding: '16px' }}>
      <div style={{ fontSize: '0.62rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
        {isActive ? 'FOCUSING' : 'PAUSED'}
      </div>
      <div style={{ fontSize: '3.2rem', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '-0.04em', color: isActive ? '#ff4d4f' : '#888', lineHeight: 1 }}>
        {display}
      </div>
      <div style={{ fontSize: '0.62rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {mode === 'countdown' ? 'remaining' : 'elapsed'}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
        <button
          onClick={isActive ? onPause : onResume}
          style={{ background: isActive ? 'rgba(255,77,79,0.18)' : 'rgba(82,196,26,0.18)', color: isActive ? '#ff4d4f' : '#52c41a', border: `1px solid ${isActive ? 'rgba(255,77,79,0.45)' : 'rgba(82,196,26,0.45)'}`, borderRadius: '8px', padding: '6px 18px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700 }}
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.06)', color: '#888', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '6px 12px', fontSize: '0.82rem', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function GlobalTimerWidget() {
  const [visible, setVisible] = useState(() => {
    try { return localStorage.getItem(VIS_KEY) === '1'; } catch (_) { return false; }
  });
  const [snap, setSnap] = useState({ isActive: false, mode: 'countdown', secondsRemaining: 25 * 60, elapsedSeconds: 0, selectedPreset: 25 * 60 });
  const [size, setSize] = useState('expanded');
  const [pipOpen, setPipOpen] = useState(false);
  const [pipWin, setPipWin] = useState(null);
  const [pos, setPos] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem(POS_KEY));
      if (s && typeof s.x === 'number') return s;
    } catch (_) {}
    return { x: typeof window !== 'undefined' ? Math.max(10, window.innerWidth - 270) : 900, y: 80 };
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const ref = useRef(null);

  // Parse timer from raw state string
  const parseTimerState = useCallback((raw) => {
    if (!raw) return;
    try {
      const d = JSON.parse(raw);
      if (!d.startedAt) return;
      const elapsed = Math.floor((Date.now() - d.startedAt) / 1000) + (d.accumulated || 0);
      const preset = d.totalPreset || 25 * 60;
      if (d.mode === 'stopwatch') {
        setSnap({ isActive: !!d.isActive, mode: 'stopwatch', secondsRemaining: 0, elapsedSeconds: elapsed, selectedPreset: 0 });
      } else {
        const rem = Math.max(0, preset - elapsed);
        setSnap({ isActive: !!d.isActive && rem > 0, mode: 'countdown', secondsRemaining: rem, elapsedSeconds: elapsed, selectedPreset: preset });
      }
    } catch (_) {}
  }, []);

  // Poll timer state from localStorage & listen to storage events across tabs
  useEffect(() => {
    const poll = () => {
      try {
        const raw = localStorage.getItem(FOCUS_KEY);
        parseTimerState(raw);
      } catch (_) {}
    };
    poll();
    const id = setInterval(poll, 500);

    // Cross-tab storage change listener
    const onStorage = (e) => {
      if (e.key === FOCUS_KEY) {
        parseTimerState(e.newValue);
      } else if (e.key === VIS_KEY) {
        setVisible(e.newValue === '1');
      } else if (e.key === POS_KEY && e.newValue) {
        try {
          const p = JSON.parse(e.newValue);
          if (p && typeof p.x === 'number') setPos(p);
        } catch (_) {}
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(id);
      window.removeEventListener('storage', onStorage);
    };
  }, [parseTimerState]);

  // Listen for widget open/close events
  useEffect(() => {
    const onOpen = () => { setVisible(true); localStorage.setItem(VIS_KEY, '1'); };
    const onClose = () => { setVisible(false); localStorage.removeItem(VIS_KEY); };
    window.addEventListener('focusWidget:open', onOpen);
    window.addEventListener('focusWidget:close', onClose);
    return () => {
      window.removeEventListener('focusWidget:open', onOpen);
      window.removeEventListener('focusWidget:close', onClose);
    };
  }, []);

  useEffect(() => { localStorage.setItem(POS_KEY, JSON.stringify(pos)); }, [pos]);

  const startDrag = useCallback((cx, cy) => {
    dragging.current = true;
    offset.current = { x: cx - pos.x, y: cy - pos.y };
  }, [pos]);

  const onMouseDown = useCallback((e) => {
    if (e.target.closest('button')) return;
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  }, [startDrag]);

  const onTouchStart = useCallback((e) => {
    if (e.target.closest('button')) return;
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
  }, [startDrag]);

  useEffect(() => {
    const mv = (cx, cy) => {
      if (!dragging.current) return;
      const widgetWidth = size === 'expanded' ? 240 : size === 'mini' ? 190 : 130;
      const widgetHeight = size === 'expanded' ? 140 : 50;
      const maxX = Math.max(8, window.innerWidth - widgetWidth - 8);
      const maxY = Math.max(8, window.innerHeight - widgetHeight - 80); // avoid mobile bottom nav
      setPos({
        x: Math.max(8, Math.min(maxX, cx - offset.current.x)),
        y: Math.max(8, Math.min(maxY, cy - offset.current.y)),
      });
    };
    const mm = (e) => mv(e.clientX, e.clientY);
    const tm = (e) => {
      if (e.touches && e.touches[0]) {
        mv(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', tm, { passive: true });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', tm);
      window.removeEventListener('touchend', up);
    };
  }, [size]);

  const handlePause = useCallback(() => {
    window.dispatchEvent(new CustomEvent('focusWidget:pause'));
    // Also update localStorage so other tabs pause immediately
    try {
      const raw = localStorage.getItem(FOCUS_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        d.isActive = false;
        d.accumulated = snap.elapsedSeconds;
        d.startedAt = Date.now();
        localStorage.setItem(FOCUS_KEY, JSON.stringify(d));
      }
    } catch (_) {}
  }, [snap.elapsedSeconds]);

  const handleResume = useCallback(() => {
    window.dispatchEvent(new CustomEvent('focusWidget:resume'));
    try {
      const raw = localStorage.getItem(FOCUS_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        d.isActive = true;
        d.startedAt = Date.now();
        localStorage.setItem(FOCUS_KEY, JSON.stringify(d));
      }
    } catch (_) {}
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.removeItem(VIS_KEY);
    window.dispatchEvent(new CustomEvent('focusWidget:close'));
  };

  const handleNavigateToFocus = () => {
    const isTracker = window.location.pathname.includes('/tracker');
    if (isTracker) {
      window.dispatchEvent(new CustomEvent('tracker:setTab', { detail: 'focus' }));
    } else {
      window.location.href = '/tracker?tab=focus';
    }
  };

  const hasPiP = typeof window !== 'undefined' && 'documentPictureInPicture' in window;

  const openPiP = useCallback(async () => {
    if (!hasPiP) return;
    try {
      const pip = await window.documentPictureInPicture.requestWindow({ width: 240, height: 180 });
      [...document.styleSheets].forEach((sheet) => {
        try {
          const el = pip.document.createElement('style');
          el.textContent = [...sheet.cssRules].map((r) => r.cssText).join('\n');
          pip.document.head.appendChild(el);
        } catch (_) {}
      });
      pip.document.title = 'Focus Timer';
      pip.document.documentElement.style.cssText = 'height:100%;margin:0;padding:0;background:#0a0a0c;';
      pip.document.body.style.cssText = 'height:100%;margin:0;padding:0;background:#0a0a0c;';
      setPipWin(pip);
      setPipOpen(true);
      pip.addEventListener('pagehide', () => { setPipOpen(false); setPipWin(null); });
    } catch (e) { console.warn('PiP:', e); }
  }, [hasPiP]);

  const closePiP = useCallback(() => {
    if (pipWin) { try { pipWin.close(); } catch (_) {} }
    setPipOpen(false);
    setPipWin(null);
  }, [pipWin]);

  if (!visible) return null;

  const { isActive, mode, secondsRemaining, elapsedSeconds, selectedPreset } = snap;
  const display = mode === 'countdown' ? fmtTime(secondsRemaining) : fmtTime(elapsedSeconds);
  const progress = mode === 'countdown' && selectedPreset > 0 ? Math.round(((selectedPreset - secondsRemaining) / selectedPreset) * 100) : 0;

  const base = { position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999, userSelect: 'none', touchAction: 'none' };
  const glass = 'rgba(12,12,14,0.97)';
  const bdr = 'rgba(255,255,255,0.09)';
  const shadow = '0 20px 60px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.4)';
  const accent = isActive ? '#ff4d4f' : '#888';
  const green = '#52c41a';
  const btnH = { width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#666', borderRadius: '5px', padding: 0 };

  /* PILL */
  if (size === 'pill') return ReactDOM.createPortal(
    <div ref={ref} onMouseDown={onMouseDown} onTouchStart={onTouchStart}
      style={{ ...base, cursor: 'grab', display: 'flex', alignItems: 'center', gap: '8px', background: glass, border: `1px solid ${isActive ? 'rgba(255,77,79,0.35)' : bdr}`, borderRadius: '999px', padding: '6px 14px', boxShadow: shadow, backdropFilter: 'blur(20px)' }}>
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: isActive ? green : '#444', flexShrink: 0 }} />
      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1rem', color: accent, letterSpacing: '-0.03em', minWidth: '52px' }}>{display}</span>
      <span style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{isActive ? 'focus' : 'paused'}</span>
      <button onClick={() => setSize('expanded')} style={btnH} title="Expand"><IcoExpand /></button>
      <button onClick={handleClose} style={{ ...btnH, color: '#ff4d4f' }} title="Close"><IcoClose /></button>
    </div>,
    document.body
  );

  /* MINI */
  if (size === 'mini') return ReactDOM.createPortal(
    <div ref={ref} onMouseDown={onMouseDown} onTouchStart={onTouchStart}
      style={{ ...base, cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px', background: glass, border: `1px solid ${bdr}`, borderRadius: '12px', padding: '10px 14px', boxShadow: shadow, backdropFilter: 'blur(20px)', minWidth: '190px' }}>
      <div>
        <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.55rem', color: accent, letterSpacing: '-0.04em', lineHeight: 1 }}>{display}</div>
        <div style={{ fontSize: '0.58rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '2px' }}>{mode === 'countdown' ? 'remaining' : 'elapsed'}</div>
      </div>
      <button onClick={isActive ? handlePause : handleResume} style={{ marginLeft: 'auto', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isActive ? 'rgba(255,77,79,0.15)' : 'rgba(82,196,26,0.15)', border: `1px solid ${isActive ? 'rgba(255,77,79,0.35)' : 'rgba(82,196,26,0.35)'}`, borderRadius: '8px', cursor: 'pointer', color: isActive ? '#ff4d4f' : green, padding: 0 }}>
        {isActive ? <IcoPause /> : <IcoPlay />}
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <button onClick={() => setSize('expanded')} style={btnH} title="Expand"><IcoExpand /></button>
        <button onClick={() => setSize('pill')} style={btnH} title="Pill"><IcoPill /></button>
        <button onClick={handleClose} style={{ ...btnH, color: '#ff4d4f' }} title="Close"><IcoClose /></button>
      </div>
    </div>,
    document.body
  );

  /* EXPANDED */
  return ReactDOM.createPortal(
    <>
      <div ref={ref} onMouseDown={onMouseDown} onTouchStart={onTouchStart}
        style={{ ...base, cursor: 'grab', width: '240px', background: glass, border: `1px solid ${bdr}`, borderRadius: '16px', boxShadow: shadow, backdropFilter: 'blur(20px)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 9px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.025)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ color: isActive ? green : '#555', display: 'flex' }}><IcoFocus /></span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isActive ? '#ccc' : '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{isActive ? 'Focusing' : 'Paused'}</span>
          </div>
          <div style={{ display: 'flex', gap: '3px' }}>
            <button onClick={() => setSize('mini')} style={btnH} title="Mini"><IcoMinus /></button>
            <button onClick={() => setSize('pill')} style={btnH} title="Pill Mode"><IcoPill /></button>
            <button onClick={handleNavigateToFocus} style={{ ...btnH, color: '#888' }} title="Open in Focus Tab"><IcoExpand /></button>
            <button onClick={handleClose} style={{ ...btnH, color: '#ff4d4f' }} title="Close"><IcoClose /></button>
          </div>
        </div>

        {/* Time display */}
        <div style={{ padding: '20px 16px 10px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '3.2rem', fontWeight: 800, letterSpacing: '-0.05em', color: accent, lineHeight: 1 }}>{display}</div>
          <div style={{ fontSize: '0.62rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '5px' }}>{mode === 'countdown' ? 'remaining' : 'elapsed'}</div>
          {mode === 'countdown' && selectedPreset > 0 && (
            <>
              <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', marginTop: '14px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: isActive ? 'linear-gradient(90deg,#ff4d4f,#ff7875)' : '#333', borderRadius: '99px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '0.56rem', color: '#444' }}>0:00</span>
                <span style={{ fontSize: '0.58rem', color: '#666', fontWeight: 700 }}>{progress}%</span>
                <span style={{ fontSize: '0.56rem', color: '#444' }}>{fmtTime(selectedPreset)}</span>
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', padding: '4px 12px 14px' }}>
          <button onClick={isActive ? handlePause : handleResume}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 0', borderRadius: '10px', border: 'none', background: isActive ? 'rgba(255,77,79,0.15)' : 'rgba(82,196,26,0.12)', color: isActive ? '#ff4d4f' : green, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
            {isActive ? <IcoPause /> : <IcoPlay />} {isActive ? 'Pause' : 'Resume'}
          </button>
          {hasPiP && !pipOpen && (
            <button onClick={openPiP} title="Float above all apps"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '9px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#777', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
              <IcoPip /> PiP
            </button>
          )}
          {pipOpen && (
            <button onClick={closePiP}
              style={{ display: 'flex', alignItems: 'center', padding: '9px 12px', borderRadius: '10px', border: '1px solid rgba(255,77,79,0.25)', background: 'rgba(255,77,79,0.08)', color: '#ff4d4f', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
              Close PiP
            </button>
          )}
        </div>
      </div>

      {pipOpen && pipWin && ReactDOM.createPortal(
        <PiPContent snap={snap} onPause={handlePause} onResume={handleResume} onClose={closePiP} />,
        pipWin.document.body
      )}
    </>,
    document.body
  );
}

export default function Root({ children }) {
  return (
    <>
      {children}
      <GlobalTimerWidget />
    </>
  );
}
