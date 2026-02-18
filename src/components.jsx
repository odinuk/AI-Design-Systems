export const COMPONENT_DEFS = {
  Button: {
    variants: {
      Primary: {
        tokens: {
          'button.primary.bg': 'color.action.primary',
          'button.primary.text': '#ffffff',
          'button.primary.radius': 'radius.component',
          'button.primary.weight': 'type.heading.weight',
          'button.primary.padding': 'space.content.gap',
        },
        render: (t, radius, weight, gap, primary) => (
          <button style={{
            background: primary, color: '#fff', border: 'none', borderRadius: radius,
            fontWeight: weight, padding: `${gap * 0.7}px ${gap * 1.2}px`, fontSize: 14,
            fontFamily: "'DM Sans', sans-serif", cursor: 'default', transition: 'all 0.35s ease',
            letterSpacing: '-0.01em', width: '100%',
          }}>Primary Action</button>
        ),
      },
      Secondary: {
        tokens: {
          'button.secondary.bg': 'color.surface.raised',
          'button.secondary.text': 'color.text.primary',
          'button.secondary.border': 'color.border.subtle',
          'button.secondary.radius': 'radius.component',
          'button.secondary.padding': 'space.content.gap',
        },
        render: (t, radius, weight, gap, primary) => (
          <button style={{
            background: t["color.surface.raised"], color: t["color.text.primary"],
            border: `1px solid ${t["color.border.subtle"]}`, borderRadius: radius,
            fontWeight: weight, padding: `${gap * 0.7}px ${gap * 1.2}px`, fontSize: 14,
            fontFamily: "'DM Sans', sans-serif", cursor: 'default', transition: 'all 0.35s ease',
            letterSpacing: '-0.01em', width: '100%',
          }}>Secondary Action</button>
        ),
      },
      Ghost: {
        tokens: {
          'button.ghost.bg': 'transparent',
          'button.ghost.text': 'color.action.primary',
          'button.ghost.radius': 'radius.component',
          'button.ghost.padding': 'space.content.gap',
        },
        render: (t, radius, weight, gap, primary) => (
          <button style={{
            background: 'transparent', color: primary, border: 'none', borderRadius: radius,
            fontWeight: weight, padding: `${gap * 0.7}px ${gap * 1.2}px`, fontSize: 14,
            fontFamily: "'DM Sans', sans-serif", cursor: 'default', transition: 'all 0.35s ease',
            letterSpacing: '-0.01em', textDecoration: 'underline', textUnderlineOffset: 3, width: '100%',
          }}>Ghost Action</button>
        ),
      },
    },
  },
  Card: {
    variants: {
      Default: {
        tokens: {
          'card.default.bg': 'color.surface.raised',
          'card.default.border': 'color.border.subtle',
          'card.default.radius': 'radius.container',
          'card.default.padding': 'space.component.padding',
        },
        render: (t) => (
          <div style={{
            background: t["color.surface.raised"], border: `1px solid ${t["color.border.subtle"]}`,
            borderRadius: t["radius.container"], padding: t["space.component.padding"], transition: 'all 0.35s ease',
          }}>
            <div style={{ height: 10, width: '60%', background: t["color.text.muted"] + '30', borderRadius: 2, marginBottom: 8 }} />
            <div style={{ height: 8, width: '100%', background: t["color.text.muted"] + '15', borderRadius: 2, marginBottom: 5 }} />
            <div style={{ height: 8, width: '80%', background: t["color.text.muted"] + '10', borderRadius: 2 }} />
          </div>
        ),
      },
      Elevated: {
        tokens: {
          'card.elevated.bg': 'color.surface.raised',
          'card.elevated.border': 'color.action.primary → 15%',
          'card.elevated.shadow': 'color.action.primary → 10%',
          'card.elevated.radius': 'radius.container',
          'card.elevated.padding': 'space.component.padding',
        },
        render: (t, r, w, g, primary) => (
          <div style={{
            background: t["color.surface.raised"], border: `1px solid ${primary}25`,
            borderRadius: t["radius.container"], padding: t["space.component.padding"],
            transition: 'all 0.35s ease', boxShadow: `0 4px 24px ${primary}15`,
          }}>
            <div style={{ height: 10, width: '60%', background: t["color.text.muted"] + '30', borderRadius: 2, marginBottom: 8 }} />
            <div style={{ height: 8, width: '100%', background: t["color.text.muted"] + '15', borderRadius: 2, marginBottom: 5 }} />
            <div style={{ height: 8, width: '80%', background: t["color.text.muted"] + '10', borderRadius: 2 }} />
          </div>
        ),
      },
      Interactive: {
        tokens: {
          'card.interactive.bg': 'color.surface.raised',
          'card.interactive.border': 'color.border.subtle',
          'card.interactive.hover.border': 'color.action.primary → 40%',
          'card.interactive.radius': 'radius.container',
          'card.interactive.padding': 'space.component.padding',
        },
        render: (t) => (
          <div style={{
            background: t["color.surface.raised"], border: `1px solid ${t["color.border.subtle"]}`,
            borderRadius: t["radius.container"], padding: t["space.component.padding"],
            transition: 'all 0.35s ease', cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ height: 10, width: 100, background: t["color.text.muted"] + '30', borderRadius: 2, marginBottom: 6 }} />
                <div style={{ height: 7, width: 60, background: t["color.text.muted"] + '15', borderRadius: 2 }} />
              </div>
              <span style={{ color: t["color.text.muted"], fontSize: 16 }}>›</span>
            </div>
          </div>
        ),
      },
    },
  },
  Input: {
    variants: {
      Default: {
        tokens: {
          'input.default.bg': 'color.surface.base',
          'input.default.border': 'color.border.subtle',
          'input.default.text': 'color.text.primary',
          'input.default.placeholder': 'color.text.muted',
          'input.default.radius': 'radius.component',
          'input.default.padding': 'space.content.gap',
        },
        render: (t, radius, w, gap) => (
          <div style={{
            background: t["color.surface.base"], border: `1px solid ${t["color.border.subtle"]}`,
            borderRadius: radius, padding: `${gap * 0.7}px ${gap * 0.8}px`, transition: 'all 0.35s ease',
            fontSize: 14, color: t["color.text.muted"], fontFamily: "'DM Sans', sans-serif",
          }}>Placeholder text...</div>
        ),
      },
      Focused: {
        tokens: {
          'input.focused.bg': 'color.surface.base',
          'input.focused.border': 'color.action.primary',
          'input.focused.ring': 'color.action.primary → 20%',
          'input.focused.text': 'color.text.primary',
          'input.focused.radius': 'radius.component',
        },
        render: (t, radius, w, gap, primary) => (
          <div style={{
            background: t["color.surface.base"], border: `1px solid ${primary}`,
            borderRadius: radius, padding: `${gap * 0.7}px ${gap * 0.8}px`, transition: 'all 0.35s ease',
            fontSize: 14, color: t["color.text.primary"], fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 0 0 3px ${primary}20`,
          }}>Active input</div>
        ),
      },
      Error: {
        tokens: {
          'input.error.bg': 'color.surface.base',
          'input.error.border': '#ef4444',
          'input.error.ring': '#ef4444 → 20%',
          'input.error.text': 'color.text.primary',
          'input.error.radius': 'radius.component',
        },
        render: (t, radius, w, gap) => (
          <div>
            <div style={{
              background: t["color.surface.base"], border: '1px solid #ef4444',
              borderRadius: radius, padding: `${gap * 0.7}px ${gap * 0.8}px`, transition: 'all 0.35s ease',
              fontSize: 14, color: t["color.text.primary"], fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 0 0 3px #ef444420', marginBottom: 6,
            }}>Invalid value</div>
            <span style={{ fontSize: 12, color: '#ef4444', fontFamily: "'DM Sans', sans-serif" }}>This field is required</span>
          </div>
        ),
      },
    },
  },
};
