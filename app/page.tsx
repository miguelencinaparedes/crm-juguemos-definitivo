export default function Home() {
  return (
    <main style={{ padding: '40px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111827', padding: '40px', borderRadius: '16px', border: '1px solid #1f2937' }}>
        <h1 style={{ color: '#4ade80', fontSize: '28px', marginBottom: '15px' }}>Juguemos.pro - Panel CRM</h1>
        <p style={{ color: '#9ca3af', marginBottom: '30px', fontSize: '15px' }}>
          Tu sistema de gestión y captación de clientes está activo. Accede directamente a los registros y herramientas operativas:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <a 
            href="/registro" 
            style={{ background: '#16a34a', color: '#fff', padding: '14px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px' }}
          >
            📋 Ir al Formulario de Registro
          </a>
        </div>
      </div>
    </main>
  );
}