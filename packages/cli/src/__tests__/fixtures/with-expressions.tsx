export default function Page() {
  return (
    <main>
      <Navbar />
      {showHero && <Hero />}
      <Features />
    </main>
  );
}
