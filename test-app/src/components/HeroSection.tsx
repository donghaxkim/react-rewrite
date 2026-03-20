export function HeroSection() {
  return (
    <section style={{ padding: "80px 32px", textAlign: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>Build Visually</h1>
      <p style={{ fontSize: 20, opacity: 0.9, maxWidth: 600, margin: "0 auto 32px" }}>
        Drag, drop, and rearrange your React components directly in the browser.
      </p>
      <button style={{ padding: "12px 32px", fontSize: 16, background: "white", color: "#764ba2", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
        Get Started
      </button>
    </section>
  );
}
