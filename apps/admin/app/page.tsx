// Landing — redirects to login or /projects depending on session.
// Implementation: Epic 2 + Epic 3.

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Possible CMS</h1>
      <p>Pre-v0.1 — admin shell not yet implemented.</p>
      <p>See <code>docs/PRD.md</code> and <code>docs/ARCHITECTURE.md</code>.</p>
    </main>
  )
}
