export function Navbar() {
  return (
    <nav style={{ padding: "16px 32px", background: "#1a1a2e", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: 700 }}>SketchUI Demo</span>
      <div style={{ display: "flex", gap: 24 }}>
        <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Features</a>
        <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Pricing</a>
        <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Docs</a>
      </div>
    </nav>
  );
}
