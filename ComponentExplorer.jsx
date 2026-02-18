import { useState, useEffect } from "react";
import { COMPONENT_DEFS } from "./components.jsx";

const mono = "'DM Mono', monospace";

export default function ComponentExplorer({ tokens: t, primary, radius, headingWeight, gap, padding }) {
  const [activeComponent, setActiveComponent] = useState('Button');
  const [activeVariant, setActiveVariant] = useState('Primary');

  const componentNames = Object.keys(COMPONENT_DEFS);
  const comp = COMPONENT_DEFS[activeComponent];
  const variantNames = Object.keys(comp.variants);
  const variant = comp.variants[activeVariant];

  useEffect(() => {
    setActiveVariant(Object.keys(COMPONENT_DEFS[activeComponent].variants)[0]);
  }, [activeComponent]);

  return (
    <div style={{ maxWidth: 1280, margin: '52px auto 0', padding: '0 48px' }}>
      <div style={{ borderTop: '1px solid #18181b', paddingTop: 48 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#3f3f46', margin: '0 0 14px 0', fontFamily: mono }}>
            Extending the system
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, letterSpacing: '-0.035em',
            margin: '0 0 8px 0', lineHeight: 1.15, color: '#fafafa' }}>
            Components and variants
          </h2>
          <p style={{ fontSize: 15, color: '#3f3f46', maxWidth: 540, lineHeight: 1.6, margin: 0, letterSpacing: '-0.01em' }}>
            Component tokens reference base tokens. Change{' '}
            <span style={{ fontFamily: mono, fontSize: 13, color: '#52525b' }}>color.action.primary</span>{' '}
            and every primary variant across every component updates. Override at the component level without breaking the system.
          </p>
        </div>

        {/* Explorer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#1a1a1d',
          borderRadius: 14, overflow: 'hidden' }}>

          {/* Left: controls + preview */}
          <div style={{ background: '#0e0e11', padding: 28 }}>

            {/* Component tabs */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 9, fontFamily: mono, color: '#52525b', textTransform: 'uppercase',
                letterSpacing: '0.08em', marginBottom: 8 }}>Component</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {componentNames.map(name => (
                  <button key={name} className="tok-btn" onClick={() => setActiveComponent(name)}
                    style={{
                      background: activeComponent === name ? primary + '15' : '#18181b',
                      border: `1px solid ${activeComponent === name ? primary + '35' : '#27272a'}`,
                      borderRadius: 6, padding: '6px 14px', fontSize: 12,
                      fontFamily: "'DM Sans', sans-serif",
                      color: activeComponent === name ? '#d4d4d8' : '#52525b', fontWeight: 500,
                    }}>{name}</button>
                ))}
              </div>
            </div>

            {/* Variant tabs */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 9, fontFamily: mono, color: '#52525b', textTransform: 'uppercase',
                letterSpacing: '0.08em', marginBottom: 8 }}>Variant</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {variantNames.map(name => (
                  <button key={name} className="tok-btn" onClick={() => setActiveVariant(name)}
                    style={{
                      background: activeVariant === name ? '#27272a' : '#18181b',
                      border: `1px solid ${activeVariant === name ? '#3f3f46' : '#27272a'}`,
                      borderRadius: 6, padding: '6px 14px', fontSize: 12,
                      fontFamily: "'DM Sans', sans-serif",
                      color: activeVariant === name ? '#d4d4d8' : '#52525b', fontWeight: 500,
                    }}>{name}</button>
                ))}
              </div>
            </div>

            {/* Live preview */}
            <div style={{ background: '#08080a', borderRadius: 10, padding: 24, border: '1px solid #1a1a1d' }}>
              <p style={{ fontSize: 9, fontFamily: mono, color: '#3f3f46', textTransform: 'uppercase',
                letterSpacing: '0.08em', marginBottom: 14 }}>Live preview</p>
              {variant.render(t, radius, headingWeight, gap, primary)}
            </div>

            {/* All variants thumbnail strip */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {variantNames.map(name => {
                const v = comp.variants[name];
                return (
                  <div key={name} onClick={() => setActiveVariant(name)}
                    style={{
                      flex: 1, background: '#08080a', borderRadius: 8, padding: 12,
                      border: `1px solid ${activeVariant === name ? '#3f3f46' : '#1a1a1d'}`,
                      cursor: 'pointer', transition: 'all 0.2s ease',
                      opacity: activeVariant === name ? 1 : 0.5,
                    }}>
                    <div style={{ transform: 'scale(0.75)', transformOrigin: 'top left', pointerEvents: 'none' }}>
                      {v.render(t, radius, headingWeight, gap, primary)}
                    </div>
                    <p style={{ fontSize: 9, fontFamily: mono, color: '#52525b', marginTop: 8 }}>{name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: token resolution */}
          <div style={{ background: '#111114', padding: 28 }}>
            <p style={{ fontSize: 9, fontFamily: mono, color: '#52525b', textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: 6 }}>Token resolution</p>
            <p style={{ fontSize: 12, color: '#3f3f46', margin: '0 0 20px 0', letterSpacing: '-0.01em', lineHeight: 1.5 }}>
              Each component token points upstream to a semantic token. Change the source, everything follows.
            </p>

            {/* Resolution chain */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(variant.tokens).map(([compToken, refToken]) => {
                const isRef = typeof refToken === 'string' && !refToken.startsWith('#') && !refToken.startsWith('transparent');
                let resolvedValue = refToken;
                if (isRef) {
                  const cleanRef = refToken.split(' →')[0].trim();
                  if (t[cleanRef] !== undefined) resolvedValue = t[cleanRef];
                }
                const isColor = typeof resolvedValue === 'string' && resolvedValue.startsWith('#');

                return (
                  <div key={compToken} style={{ background: '#0e0e11', borderRadius: 8,
                    padding: '10px 14px', border: '1px solid #1a1a1d' }}>
                    <div style={{ fontSize: 11, fontFamily: mono, color: '#d4d4d8', marginBottom: 6, fontWeight: 500 }}>
                      {compToken}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 10, color: '#3f3f46' }}>↓</span>
                      <span style={{ fontSize: 10, fontFamily: mono, color: isRef ? '#8ba5d4' : '#71717a' }}>
                        {refToken}
                      </span>
                    </div>
                    {isRef && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: '#3f3f46' }}>=</span>
                        {isColor ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{
                              width: 10, height: 10, borderRadius: 3, background: resolvedValue,
                              border: '1px solid #27272a', flexShrink: 0, transition: 'background 0.3s ease',
                            }} />
                            <span style={{ fontSize: 10, fontFamily: mono, color: '#c4a96a', transition: 'color 0.3s ease' }}>
                              {resolvedValue}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: 10, fontFamily: mono, color: '#8bc4a6' }}>{resolvedValue}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hierarchy */}
            <div style={{ marginTop: 24, background: '#0e0e11', borderRadius: 8, padding: 14, border: '1px solid #1a1a1d' }}>
              <p style={{ fontSize: 9, fontFamily: mono, color: '#3f3f46', textTransform: 'uppercase',
                letterSpacing: '0.08em', marginBottom: 10 }}>Token hierarchy</p>
              {['Base tokens', 'Semantic tokens', 'Component tokens', 'Variant tokens'].map((label, i, arr) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i < arr.length - 1 ? 6 : 0 }}>
                  <div style={{
                    width: 16, height: 2, borderRadius: 1, opacity: 0.6, transition: 'background 0.3s ease',
                    background: i === 0 ? primary : i === 1 ? '#8ba5d4' : i === 2 ? '#d4d4d8' : '#71717a',
                  }} />
                  <span style={{
                    fontSize: 11, fontFamily: mono, transition: 'color 0.3s ease',
                    color: i === 0 ? primary : i === 1 ? '#8ba5d4' : i === 2 ? '#d4d4d8' : '#71717a',
                  }}>{label}</span>
                  {i < arr.length - 1 && <span style={{ fontSize: 9, color: '#3f3f46', marginLeft: 2 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
