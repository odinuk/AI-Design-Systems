import { useState, useEffect } from "react";
import ComponentExplorer from "./ComponentExplorer.jsx";

/*
  "The New Design System" v3 — Bidirectional Flow
  
  THE KEY INSIGHT: The canvas writes back.
  
  Column 1 (Brain) → Column 2 (Sketchpad) = normal flow
  Column 2 (Sketchpad) → Column 1 (Brain) = the magic
  
  When you noodle on the canvas, tokens update backwards.
  The ripple reverses. The loop closes.
  
  Four-step cycle: Prompt → Noodle → Sync → Ship
*/

const DEFAULT_TOKENS = {
  "color.action.primary": "#7c3aed",
  "color.surface.base": "#0a0a0b",
  "color.surface.raised": "#18181b",
  "color.border.subtle": "#27272a",
  "color.text.primary": "#fafafa",
  "color.text.muted": "#52525b",
  "radius.component": 12,
  "radius.container": 16,
  "type.heading.weight": 600,
  "type.body.weight": 400,
  "space.content.gap": 16,
  "space.component.padding": 16,
};

const EDITABLE_TOKENS = {
  "color.action.primary": {
    options: [
      { label: "Violet", value: "#7c3aed" },
      { label: "Blue", value: "#2563eb" },
      { label: "Emerald", value: "#059669" },
      { label: "Rose", value: "#e11d48" },
      { label: "Amber", value: "#d97706" },
    ]
  },
  "radius.component": {
    options: [
      { label: "2", value: 2 },
      { label: "8", value: 8 },
      { label: "12", value: 12 },
      { label: "24", value: 24 },
    ]
  },
  "type.heading.weight": {
    options: [
      { label: "400", value: 400 },
      { label: "500", value: 500 },
      { label: "600", value: 600 },
      { label: "700", value: 700 },
    ]
  },
  "space.content.gap": {
    options: [
      { label: "8", value: 8 },
      { label: "16", value: 16 },
      { label: "24", value: 24 },
      { label: "32", value: 32 },
    ]
  },
};

const EDITABLE_KEYS = Object.keys(EDITABLE_TOKENS);
const COLOR_CYCLE = ["#7c3aed", "#2563eb", "#059669", "#e11d48", "#d97706"];

export default function DesignSystemDemo() {
  const [tokens, setTokens] = useState(DEFAULT_TOKENS);
  const [flowDirection, setFlowDirection] = useState(null);
  const [phase, setPhase] = useState(0);
  const [lastChanged, setLastChanged] = useState(null);
  const [changeSource, setChangeSource] = useState(null);
  const [syncFlash, setSyncFlash] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const updateFromBrain = (key, value) => {
    setTokens(prev => ({ ...prev, [key]: value }));
    setFlowDirection("forward");
    setChangeSource("brain");
    setLastChanged(key);
    setTimeout(() => setFlowDirection(null), 900);
  };

  const updateFromCanvas = (key, value) => {
    setTokens(prev => ({ ...prev, [key]: value }));
    setFlowDirection("reverse");
    setChangeSource("canvas");
    setLastChanged(key);
    setSyncFlash(true);
    setTimeout(() => {
      setFlowDirection("forward-from-sync");
      setTimeout(() => setFlowDirection(null), 600);
    }, 700);
    setTimeout(() => setSyncFlash(false), 1200);
  };

  const t = tokens;
  const primary = t["color.action.primary"];
  const radius = t["radius.component"];
  const headingWeight = t["type.heading.weight"];
  const gap = t["space.content.gap"];
  const padding = t["space.component.padding"];

  return (
    <div style={{
      background: "#08080a",
      minHeight: "100vh",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#e4e4e7",
      overflow: "hidden",
    }}>

      {/* Header */}
      <header style={{
        padding: "56px 48px 0",
        maxWidth: 1280,
        margin: "0 auto",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#3f3f46", margin: "0 0 16px 0",
          fontFamily: "'DM Mono', monospace",
        }}>The future of design systems</p>
        <h1 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700,
          letterSpacing: "-0.035em", margin: "0 0 10px 0", lineHeight: 1.1, color: "#fafafa",
        }}>
          Semantic tokens are the system.<br />
          <span style={{ color: "#3f3f46" }}>Everything else is a surface.</span>
        </h1>
        <p style={{
          fontSize: 15, color: "#8a8f98", maxWidth: 600, lineHeight: 1.6, margin: 0,
          letterSpacing: "-0.01em",
        }}>
          Tokens describe intent, not values. Change a token on the left — watch it flow right.
          Noodle on the canvas in the middle — watch it flow{" "}
          <em style={{ color: "#22c55e", fontStyle: "normal" }}>back</em>.
        </p>
      </header>

      {/* Flow legend */}
      <div style={{
        maxWidth: 1280, margin: "28px auto 0", padding: "0 48px",
        display: "flex", gap: 32,
        opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.5s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: primary, opacity: 0.7,
            transition: "background 0.3s ease",
          }} />
          <span style={{ fontSize: 13, color: "#71717a", letterSpacing: "-0.01em" }}>
            Edit a token — changes flow <span style={{ color: "#a1a1aa" }}>right</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#22c55e", opacity: 0.7,
          }} />
          <span style={{ fontSize: 13, color: "#71717a", letterSpacing: "-0.01em" }}>
            Noodle on the canvas — it syncs <span style={{ color: "#22c55e" }}>back</span>
          </span>
        </div>
      </div>

      {/* Three-panel layout */}
      <div style={{
        maxWidth: 1280, margin: "20px auto 0", padding: "0 48px",
        display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: 0,
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>

        {/* ─── COLUMN 1: THE BRAIN ─── */}
        <div style={{
          background: "#0e0e11", borderRadius: "12px 0 0 12px", padding: 22,
          display: "flex", flexDirection: "column",
          border: "1px solid #1a1a1d", borderRight: "none",
          animation: syncFlash ? "syncPulse 0.8s ease" : "none",
        }}>
          <PanelHeader num="01" title="The Brain" file="tokens.json" desc="Source of truth. Reads and writes." />

          <FlowBar
            direction={flowDirection === "reverse" ? "left" : flowDirection === "forward" ? "right" : null}
            color={flowDirection === "reverse" ? "#22c55e" : primary}
          />

          <div style={{
            background: "#08080a", borderRadius: 8, padding: "12px 14px", marginBottom: 14,
            fontFamily: "'DM Mono', monospace", fontSize: 10, lineHeight: 1.85,
            border: "1px solid #1a1a1d", flex: 1, overflow: "auto",
          }}>
            <span style={{ color: "#3f3f46" }}>{"{"}</span>
            {Object.entries(tokens).map(([key, val], i, arr) => {
              const isEditable = EDITABLE_KEYS.includes(key);
              const isChanged = lastChanged === key;
              const isReverse = isChanged && changeSource === "canvas";
              return (
                <div key={key} style={{
                  paddingLeft: 12, marginLeft: -4, marginRight: -4,
                  paddingRight: 4, paddingTop: 1, paddingBottom: 1, borderRadius: 3,
                  background: isChanged ? (isReverse ? "#22c55e0c" : primary + "0c") : "transparent",
                  borderLeft: isReverse ? "2px solid #22c55e30" : "2px solid transparent",
                  transition: "all 0.4s ease",
                }}>
                  <span style={{ color: isEditable ? "#8ba5d4" : "#3f3f46" }}>"{key}"</span>
                  <span style={{ color: "#3f3f46" }}>: </span>
                  <span style={{
                    color: typeof val === "string" ? "#c4a96a" : "#8bc4a6",
                    transition: "all 0.3s ease",
                  }}>
                    {typeof val === "string" ? `"${val}"` : val}
                  </span>
                  {isReverse && (
                    <span style={{
                      fontSize: 8, color: "#22c55e", marginLeft: 6,
                      opacity: syncFlash ? 1 : 0, transition: "opacity 0.3s ease",
                    }}>← canvas</span>
                  )}
                  {i < arr.length - 1 && <span style={{ color: "#3f3f46" }}>,</span>}
                </div>
              );
            })}
            <span style={{ color: "#3f3f46" }}>{"}"}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(EDITABLE_TOKENS).map(([key, config]) => (
              <TokenPicker key={key} tokenKey={key} options={config.options}
                value={tokens[key]} onChange={(val) => updateFromBrain(key, val)} accent={primary} />
            ))}
          </div>
        </div>

        {/* ─── COLUMN 2: THE SKETCHPAD ─── */}
        <div style={{
          background: "#111114", padding: 22, position: "relative",
          borderTop: "1px solid #1a1a1d", borderBottom: "1px solid #1a1a1d",
        }}>
          <PanelHeader num="02" title="The Sketchpad" file="Figma / Canvas"
            desc="Noodle here. Changes sync back to the brain." />

          <FlowBar
            direction={
              flowDirection === "forward" ? "right"
              : flowDirection === "reverse" ? "left"
              : flowDirection === "forward-from-sync" ? "right"
              : null
            }
            color={
              flowDirection === "reverse" ? "#22c55e"
              : flowDirection === "forward-from-sync" ? "#22c55e"
              : primary
            }
          />

          <div style={{
            background: t["color.surface.base"], borderRadius: t["radius.container"],
            border: `1px solid ${t["color.border.subtle"]}`, padding: padding + 6,
            transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            {/* Card — click to cycle colour */}
            <div className="canvas-interactive"
              onClick={() => {
                const idx = COLOR_CYCLE.indexOf(primary);
                const next = COLOR_CYCLE[(idx + 1) % COLOR_CYCLE.length];
                updateFromCanvas("color.action.primary", next);
              }}
              title="Click to change color.action.primary"
              style={{
                background: t["color.surface.raised"], borderRadius: radius,
                padding: padding, border: `1px solid ${t["color.border.subtle"]}`,
                marginBottom: gap, position: "relative",
              }}
            >
              <div style={{
                position: "absolute", top: 8, right: 10,
              }}><span className="canvas-hint">click → color</span></div>

              <div style={{
                display: "flex", alignItems: "center", gap: gap * 0.6,
                marginBottom: gap * 0.8,
                transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: radius * 0.5,
                  background: primary + "18", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: radius * 0.25,
                    background: primary,
                    transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                </div>
                <div>
                  <div style={{ height: 9, width: 80, background: t["color.text.muted"] + "30", borderRadius: 2, marginBottom: 4 }} />
                  <div style={{ height: 7, width: 52, background: t["color.text.muted"] + "18", borderRadius: 2 }} />
                </div>
              </div>
              <div style={{ height: 8, width: "100%", background: t["color.text.muted"] + "15", borderRadius: 2, marginBottom: 6 }} />
              <div style={{ height: 8, width: "72%", background: t["color.text.muted"] + "10", borderRadius: 2 }} />
            </div>

            {/* Radius slider */}
            <div style={{
              background: t["color.surface.raised"], borderRadius: radius,
              padding: "12px 14px", border: `1px solid ${t["color.border.subtle"]}`,
              marginBottom: gap, transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#a1a1aa", fontWeight: 500 }}>radius.component</span>
                <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#d4d4d8", fontWeight: 500 }}>{radius}px</span>
              </div>
              <input type="range" min={0} max={32} step={1} value={radius}
                onChange={(e) => updateFromCanvas("radius.component", Number(e.target.value))} />
              <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center" }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{
                    width: 32, height: 32, borderRadius: radius,
                    background: primary + "20", border: `1px solid ${primary}30`,
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                ))}
              </div>
            </div>

            {/* Spacing slider */}
            <div style={{
              background: t["color.surface.raised"], borderRadius: radius,
              padding: "12px 14px", border: `1px solid ${t["color.border.subtle"]}`,
              marginBottom: gap, transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#a1a1aa", fontWeight: 500 }}>space.content.gap</span>
                <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#d4d4d8", fontWeight: 500 }}>{gap}px</span>
              </div>
              <input type="range" min={4} max={40} step={1} value={gap}
                onChange={(e) => updateFromCanvas("space.content.gap", Number(e.target.value))} />
              <div style={{
                display: "flex", flexDirection: "column", gap: gap, marginTop: 10,
                transition: "gap 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{
                    height: 6, width: `${50 + i * 18}%`,
                    background: t["color.text.muted"] + "18", borderRadius: 2,
                  }} />
                ))}
              </div>
            </div>

            {/* Weight selector */}
            <div style={{
              background: t["color.surface.raised"], borderRadius: radius,
              padding: "12px 14px", border: `1px solid ${t["color.border.subtle"]}`,
              marginBottom: gap, transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#a1a1aa", fontWeight: 500 }}>type.heading.weight</span>
                <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#d4d4d8", fontWeight: 500 }}>{headingWeight}</span>
              </div>
              <div style={{
                display: "flex", gap: 4, background: "#0a0a0b",
                borderRadius: 8, padding: 3,
              }}>
                {[400, 500, 600, 700].map(w => (
                  <button key={w}
                    onClick={() => updateFromCanvas("type.heading.weight", w)}
                    style={{
                      flex: 1, padding: "7px 0", border: "none",
                      borderRadius: 6, fontSize: 12, fontFamily: "'DM Mono', monospace",
                      fontWeight: w, cursor: "pointer",
                      background: headingWeight === w ? primary + "20" : "transparent",
                      color: headingWeight === w ? "#d4d4d8" : "#52525b",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
              {/* Preview text */}
              <p style={{
                fontSize: 14, fontWeight: headingWeight, color: "#d4d4d8",
                textAlign: "center", margin: "10px 0 0 0",
                transition: "font-weight 0.3s ease", letterSpacing: "-0.02em",
              }}>
                The quick brown fox
              </p>
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 6, marginTop: 12,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: changeSource === "canvas" ? "#22c55e" : primary,
              opacity: 0.4, transition: "background 0.4s ease",
            }} />
            <span style={{ fontSize: 10, color: "#3f3f46", fontFamily: "'DM Mono', monospace" }}>
              {changeSource === "canvas" ? "noodled — syncing back to tokens" : "live — reading from tokens.json"}
            </span>
          </div>
        </div>

        {/* ─── COLUMN 3: SHIP IT ─── */}
        <div style={{
          background: "#0e0e11", borderRadius: "0 12px 12px 0", padding: 22,
          border: "1px solid #1a1a1d", borderLeft: "none",
        }}>
          <PanelHeader num="03" title="Ship It" file="git push → production"
            desc="Tokens compile. No handoff required." />

          <FlowBar
            direction={
              flowDirection === "forward" ? "right"
              : flowDirection === "forward-from-sync" ? "right"
              : null
            }
            color={flowDirection === "forward-from-sync" ? "#22c55e" : primary}
          />

          <div style={{
            background: "#08080a", borderRadius: 8, padding: "12px 14px",
            fontFamily: "'DM Mono', monospace", fontSize: 10, lineHeight: 1.9,
            border: "1px solid #1a1a1d", marginBottom: 14,
          }}>
            <TLine c="#3f3f46">$ git diff tokens.json</TLine>
            {lastChanged ? (
              <>
                <TLine c="#3f3f46">
                  <span style={{ opacity: 0.4 }}>{"  "}@@ {lastChanged} @@</span>
                </TLine>
                <TLine c="#5b3a3a">
                  {"  "}- "{lastChanged}": {typeof DEFAULT_TOKENS[lastChanged] === "string"
                    ? `"${DEFAULT_TOKENS[lastChanged]}"` : DEFAULT_TOKENS[lastChanged]}
                </TLine>
                <TLine c="#3a5b3a">
                  {"  "}+ "{lastChanged}": {typeof tokens[lastChanged] === "string"
                    ? `"${tokens[lastChanged]}"` : tokens[lastChanged]}
                </TLine>
                {changeSource === "canvas" && (
                  <TLine c="#3f3f46">
                    <span style={{ color: "#22c55e", opacity: 0.5 }}>{"  "}# synced from canvas</span>
                  </TLine>
                )}
              </>
            ) : (
              <TLine c="#3f3f46">{"  "}no changes</TLine>
            )}
            <div style={{ height: 8 }} />
            <TLine c="#3f3f46">$ npm run build:tokens</TLine>
            <TLine c="#3f3f46"><span style={{ color: primary, transition: "color 0.3s ease" }}>✓</span> css variables compiled</TLine>
            <TLine c="#3f3f46"><span style={{ color: primary, transition: "color 0.3s ease" }}>✓</span> figma variables synced</TLine>
            <TLine c="#3f3f46"><span style={{ color: primary, transition: "color 0.3s ease" }}>✓</span> components rebuilt</TLine>
            <div style={{ height: 8 }} />
            <TLine c="#3f3f46">$ git push origin main</TLine>
            <TLine c={primary}>✓ deployed to production</TLine>
          </div>

          <p style={{
            fontSize: 9, fontFamily: "'DM Mono', monospace", color: "#3f3f46",
            textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px 0",
          }}>Generated outputs</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              { name: "variables.css", from: "tokens.json" },
              { name: "tokens.ts", from: "tokens.json" },
              { name: "figma-variables", from: "tokens.json" },
              { name: "Button.tsx", from: "color.action.primary" },
              { name: "Card.tsx", from: "radius.component" },
            ].map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "6px 9px", background: "#08080a", borderRadius: 4,
                border: "1px solid #1a1a1d",
              }}>
                <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#52525b" }}>{f.name}</span>
                <span style={{ fontSize: 8, fontFamily: "'DM Mono', monospace", color: "#3f3f46" }}>← {f.from}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Variants Explorer */}
      <ComponentExplorer tokens={t} primary={primary} radius={radius} headingWeight={headingWeight} gap={gap} padding={padding} />

      {/* The Four Steps */}
      <div style={{
        maxWidth: 1280, margin: "52px auto 0", padding: "0 48px",
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: "0.15s",
      }}>
        <div style={{
          borderTop: "1px solid #18181b", paddingTop: 36,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28,
        }}>
          {[
            { num: "01", step: "Prompt", head: "AI generates the foundation", body: "Describe what you need. AI reads your tokens and brief, generates components that are on-brand from the start.", color: primary },
            { num: "02", step: "Noodle", head: "Refine on the canvas", body: "Drag, adjust, feel. The spatial decisions that live in your hands, not in language. This is where design instinct lives.", color: "#e4e4e7" },
            { num: "03", step: "Sync", head: "Canvas writes back", body: "Your refinements flow back into the tokens automatically. The 3px tweak becomes a system-level decision.", color: "#22c55e" },
            { num: "04", step: "Ship", head: "Push to production", body: "Tokens compile to CSS, TypeScript, and Figma variables. One git push. No handoff. No translation layer.", color: "#71717a" },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: "#3f3f46" }}>{item.num}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: item.color,
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em",
                  textTransform: "uppercase", transition: "color 0.3s ease",
                }}>{item.step}</span>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d8", margin: "0 0 5px 0", letterSpacing: "-0.02em" }}>{item.head}</h3>
              <p style={{ fontSize: 12, color: "#8a8f98", margin: 0, lineHeight: 1.6, letterSpacing: "-0.01em" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Essay section */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{
          borderTop: "1px solid #18181b", marginTop: 56,
          paddingTop: 56, paddingBottom: 80, maxWidth: 600,
        }}>
          <p style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#3f3f46", margin: "0 0 16px 0",
            fontFamily: "'DM Mono', monospace",
          }}>The question nobody's answered yet</p>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700,
            letterSpacing: "-0.035em", margin: "0 0 28px 0", lineHeight: 1.15, color: "#fafafa",
          }}>
            What happens when you<br />
            need to <span style={{ color: "#52525b" }}>feel</span> the design?
          </h2>
          <div style={{
            display: "flex", flexDirection: "column", gap: 20,
            fontSize: 15, color: "#8a8f98", lineHeight: 1.7, letterSpacing: "-0.01em",
          }}>
            <p style={{ margin: 0 }}>
              There are two modes of design thinking. The verbal mode — "make the button bigger, add more spacing" — works
              as prompts. You describe intent, AI executes. That's what tokens and briefs enable.
            </p>
            <p style={{ margin: 0 }}>
              Then there's the spatial mode. You drag something 3 pixels left and it suddenly <em style={{ color: "#a1a1aa", fontStyle: "normal" }}>feels</em> right.
              You squint at a layout and twenty years of pattern recognition tells you something's off before you can
              say what. That's pre-verbal. It lives in your hands and eyes, not in language. You can't prompt it.
            </p>
            <p style={{ margin: 0 }}>
              So the workflow becomes a split. AI generates a strong first pass from your tokens and brief — that's
              70% instantly. Then you pull it into a spatial canvas and <em style={{ color: "#a1a1aa", fontStyle: "normal" }}>noodle</em>. You do the thing language can't reach.
              Those refinements either flow back into tokens if they're systematic, or stay as one-off tuning in the implementation.
            </p>
            <p style={{ margin: 0 }}>
              The missing piece is the round-trip. AI to canvas is getting good. Canvas back to tokens is still
              clunky. The dream: AI generates a component, you adjust a corner radius in Figma because
              it <em style={{ color: "#a1a1aa", fontStyle: "normal" }}>feels</em> better, and that change flows back
              to <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#52525b" }}>radius.component</span> automatically.
            </p>
            <p style={{ margin: 0, color: "#d4d4d8" }}>
              The designers who'll thrive are the ones who can articulate intent clearly enough to direct AI <em style={{ fontStyle: "normal" }}>and</em> still
              feel when something's 3 pixels off. You need both halves now. The prompt and the hand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelHeader({ num, title, file, desc }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{
          fontSize: 9, fontFamily: "'DM Mono', monospace", color: "#3f3f46",
          background: "#18181b", padding: "2px 6px", borderRadius: 3,
        }}>{num}</span>
        <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#3f3f46" }}>{file}</span>
      </div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: "#fafafa", margin: "0 0 2px 0", letterSpacing: "-0.03em" }}>{title}</h2>
      <p style={{ fontSize: 11, color: "#3f3f46", margin: 0, letterSpacing: "-0.01em" }}>{desc}</p>
    </div>
  );
}

function TokenPicker({ tokenKey, options, value, onChange, accent }) {
  const isColor = typeof value === "string" && value.startsWith("#");
  return (
    <div>
      <label style={{
        fontSize: 9, fontFamily: "'DM Mono', monospace", color: "#52525b",
        display: "block", marginBottom: 4,
      }}>{tokenKey}</label>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {options.map(opt => {
          const active = opt.value === value;
          return (
            <button key={String(opt.value)} className="tok-btn" onClick={() => onChange(opt.value)}
              style={{
                background: active ? accent + "15" : "#18181b",
                border: `1px solid ${active ? accent + "35" : "#27272a"}`,
                borderRadius: 5, padding: "3px 8px", fontSize: 10,
                fontFamily: isColor ? "'DM Sans', sans-serif" : "'DM Mono', monospace",
                color: active ? "#d4d4d8" : "#52525b",
                display: "flex", alignItems: "center", gap: 5,
              }}>
              {isColor && <span style={{ width: 7, height: 7, borderRadius: "50%", background: opt.value, flexShrink: 0 }} />}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FlowBar({ direction, color }) {
  return (
    <div style={{
      height: 2, background: "#1a1a1d", position: "relative",
      overflow: "hidden", marginBottom: 12, borderRadius: 1,
    }}>
      {direction === "right" && (
        <div key={`r-${Date.now()}`} style={{
          position: "absolute", top: 0, height: "100%", width: 50,
          background: `linear-gradient(90deg, transparent, ${color}90, transparent)`,
          borderRadius: 1, animation: "flowRight 0.7s ease forwards",
        }} />
      )}
      {direction === "left" && (
        <div key={`l-${Date.now()}`} style={{
          position: "absolute", top: 0, height: "100%", width: 50,
          background: `linear-gradient(90deg, transparent, ${color}90, transparent)`,
          borderRadius: 1, animation: "flowLeft 0.7s ease forwards",
        }} />
      )}
    </div>
  );
}

function FlowLegendItem({ color, label, direction }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 24, height: 2, background: color, borderRadius: 1,
        position: "relative", opacity: 0.6,
      }}>
        <div style={{
          position: "absolute",
          [direction === "forward" ? "right" : "left"]: -3, top: -2,
          width: 0, height: 0,
          borderTop: "3px solid transparent", borderBottom: "3px solid transparent",
          [direction === "forward" ? "borderLeft" : "borderRight"]: `4px solid ${color}`,
        }} />
      </div>
      <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#3f3f46" }}>{label}</span>
    </div>
  );
}

function TLine({ children, c }) {
  return (
    <div style={{ color: c, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{children}</div>
  );
}
