import React, { useState } from 'react';
import { useTheme, THEMES } from '../ThemeContext';

export default function ThemePanel() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="nav-item"
        onClick={() => setOpen(o => !o)}
        title="Change theme"
        style={{ justifyContent: 'flex-start', width: '100%' }}
      >
        <span className="nav-icon">🎨</span>
        Themes
        <span style={{
          marginLeft: 'auto',
          fontSize: '0.7rem',
          background: 'var(--primary)',
          color: 'white',
          padding: '1px 7px',
          borderRadius: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
        }}>
          {THEMES.find(t => t.id === theme)?.emoji}
        </span>
      </button>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 199 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute',
            bottom: '110%',
            left: '0.5rem',
            right: '0.5rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-hover)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem',
            zIndex: 200,
            boxShadow: 'var(--shadow-card)',
            animation: 'fadeUp 0.18s ease-out',
          }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.6rem' }}>
              Choose Theme
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.5rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: theme === t.id ? '1.5px solid var(--primary)' : '1.5px solid transparent',
                    background: theme === t.id ? 'rgba(var(--primary-rgb, 13,148,136),0.1)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.15s',
                  }}
                >
                  {/* Color swatches */}
                  <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                    {t.preview.map((c, i) => (
                      <div key={i} style={{
                        width: i === 0 ? 18 : 10,
                        height: 18,
                        borderRadius: 4,
                        background: c,
                        border: '1px solid rgba(255,255,255,0.1)',
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: theme === t.id ? 700 : 400 }}>
                    {t.emoji} {t.name}
                  </span>
                  {theme === t.id && (
                    <span style={{ marginLeft: 'auto', color: 'var(--primary)', fontSize: '0.8rem' }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
