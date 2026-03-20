export function Pricing() {
  return (
    <section style={{ padding: "64px 32px", textAlign: "center" }}>
      <h2 style={{ marginBottom: 48 }}>Pricing</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
        <div style={{ padding: 32, border: "1px solid #ddd", borderRadius: 8, width: 240 }}>
          <h3>Free</h3>
          <p style={{ fontSize: 36, fontWeight: 700, margin: "16px 0" }}>$0</p>
          <p style={{ color: "#666" }}>For personal projects</p>
        </div>
        <div style={{ padding: 32, border: "2px solid #764ba2", borderRadius: 8, width: 240, background: "#faf5ff" }}>
          <h3>Pro</h3>
          <p style={{ fontSize: 36, fontWeight: 700, margin: "16px 0" }}>$19</p>
          <p style={{ color: "#666" }}>For teams</p>
        </div>
      </div>
    </section>
  );
}
