'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function PaginaCRM() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  async function cargar() {
    setCargando(true);
    const { data, error } = await supabase.from('Clientes').select('*');
    if (error) {
      alert("Error al cargar: " + error.message);
    } else if (data) {
      setClientes(data);
    }
    setCargando(false);
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <main style={{ padding: '40px 20px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <a href="/" style={{ color: '#4ade80', fontSize: '13px', textDecoration: 'none' }}>← Volver al Inicio</a>
            <h1 style={{ color: '#fff', fontSize: '24px', margin: '5px 0 0 0' }}>Panel CRM ({clientes.length})</h1>
          </div>
          <button onClick={cargar} style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            🔄 Actualizar
          </button>
        </div>

        {cargando ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>Cargando registros...</div>
        ) : clientes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No hay clientes registrados aún.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clientes.map((c, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#fff' }}>{c.Nombre}</h3>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>📱 {c.WhatsApp} | 🆔 {c.Cedula}</p>
                </div>
                <a
                  href={`https://wa.me/${c.WhatsApp?.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${c.Nombre}! Vemos que te registraste en Juguemos.pro.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#16a34a', color: '#fff', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  💬 Escribir
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}