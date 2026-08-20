export default function Home() {
  return (
    <main style={{ padding: '50px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#4ade80', fontSize: '32px' }}>Juguemos.pro</h1>
      <p style={{ color: '#9ca3af', marginBottom: '40px' }}>Selecciona una opción:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px', margin: '0 auto' }}>
        <a href="/registro" style={{ background: '#16a34a', padding: '15px', borderRadius: '10px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          Ir al Registro
        </a>
      </div>
    </main>
  );
}