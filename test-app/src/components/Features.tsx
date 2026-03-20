export function Features() {
  const features = [
    { title: "Visual Editing", desc: "Click and drag components to reorder them instantly." },
    { title: "Source Sync", desc: "Changes write directly to your JSX files in real time." },
    { title: "Zero Config", desc: "Works with any Next.js or Vite project out of the box." },
  ];

  return (
    <section style={{ padding: "64px 32px", background: "#f8f9fa" }}>
      <h2 style={{ textAlign: "center", marginBottom: 48 }}>Features</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 900, margin: "0 auto" }}>
        {features.map((f) => (
          <div key={f.title} style={{ padding: 24, background: "white", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
