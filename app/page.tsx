'use client';
import { useState } from 'react';

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando,setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function cargarClientes() {
    try {
      setCargando(true);
      setErrorMsg('');
      // Importación dinámica para que Vercel no rompa la compilación en el servidor
      const { supabase } = await import('./supabaseClient');
      const { data, error } = await supabase.from('Clientes').select('*');
      
      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        setClientes(data);
      }
    } catch (e: any) {
      setErrorMsg(e.toString());
    } finally {
      setCargando(false);
    }
  }

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* Encabezado y Accesos */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '15px', marginBottom: '20px' }}>
          <div>
            <h1 style={{ color: '#4ade80', fontSize: '22px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Juguemos.pro - Panel CRM</h1>
            <a href="/registro" style={{ color: '#38bdf8', fontSize: '13px', textDecoration: 'none' }}>Ir al Formulario de Registro ➜</a>
          </div>
          <button 
            onClick={cargarClientes}
            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🔄 Cargar / Actualizar Clientes
          </button>
        </div>

        {errorMsg && (
          <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px' }}>
            Error: {errorMsg}
          </div>
        )}

        {/* Listado */}
        {cargando ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>Conectando y cargando registros...</div>
        ) : clientes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
            Haz clic en el botón <strong>"🔄 Cargar / Actualizar Clientes"</strong> para ver los registros.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clientes.map((cliente, index) => (
              <div key={index} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                <div>
                  <h2 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '18px' }}>{cliente.Nombre}</h2>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>📱 WhatsApp: {cliente.WhatsApp} | 🆔 Cédula: {cliente.Cedula}</p>
                </div>
                <a
                  href={`https://wa.me/${cliente.WhatsApp?.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${cliente.Nombre}! Vemos que te registraste en Juguemos.pro.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#16a34a', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  💬 Escribir al WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}