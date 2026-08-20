export default function Home() {
  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' }}>
          <h1 style={{ color: '#4ade80', fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Juguemos.pro - Panel Central</h1>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Sistema de gestión y captación de clientes.</p>
        </div>

        {/* Tarjeta de Navegación y Accesos */}
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '15px' }}>📌 Accesos Rápidos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a 
              href="/registro" 
              style={{ background: '#1f2937', color: '#fff', padding: '12px 16px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #374151' }}
            >
              <span>📋 Ir al Formulario de Registro (Landing)</span>
              <span style={{ color: '#4ade80' }}>➜</span>
            </a>
            
            <a 
              href="/registro" 
              style={{ background: '#16a34a', color: '#fff', padding: '12px 16px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>👥 Ver Panel CRM de Clientes</span>
              <span>➜</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}