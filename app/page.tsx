export default function Home() {
  return (
    <main style={{ padding: '60px 20px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: '450px', width: '100%', background: '#111827', border: '1px solid #1f2937', padding: '30px', borderRadius: '14px' }}>
        <h1 style={{ color: '#4ade80', fontSize: '28px', marginBottom: '6px' }}>Juguemos.pro</h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '25px' }}>Sistema de Registro y CRM</p>

        <a 
          href="/registro" 
          style={{ display: 'block', background: '#16a34a', color: '#fff', padding: '14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}
        >
          🚀 Ir al Formulario de Registro
        </a>
      </div>
    </main>
  );
}