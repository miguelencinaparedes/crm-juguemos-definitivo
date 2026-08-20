'use client';
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{ padding: '60px 20px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', background: '#111827', border: '1px solid #1f2937', padding: '30px', borderRadius: '12px' }}>
        <h1 style={{ color: '#4ade80', fontSize: '26px', marginBottom: '10px' }}>Juguemos.pro</h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '25px' }}>
          Panel principal del sistema de registros y CRM.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a 
            href="/registro" 
            style={{ background: '#16a34a', color: '#fff', padding: '14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}
          >
            📋 Ir al Formulario de Registro
          </a>
        </div>
      </div>
    </main>
  );
}