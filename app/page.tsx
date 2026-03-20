import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
          minHeight: '100vh',
          background: '#12100c',
          color: '#e8c96a',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
      <h1 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', marginBottom: 16, textAlign: 'center' }}>
        FPT FUDA · Grand Exhibition 
      </h1>
      <p style={{ opacity: 0.85, marginBottom: 32, textAlign: 'center' }}>
        Triển lãm câu lạc bộ FPT University Đà Nẵng
      </p>
      <Link
        href="/game-club-fpt.html"
        style={{
          padding: '14px 32px',
          background: 'transparent',
          border: '1px solid rgba(201,168,76,.5)',
          borderTop: '2px solid #c9a84c',
          color: '#e8c96a',
          fontSize: 12,
          letterSpacing: 3,
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        Vào triển lãm
      </Link>
    </main>
  );
}
