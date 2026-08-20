'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  async function cargarClientes() {
    setCargando(true);
    const { data } = await supabase.from('Clientes').select('*');
    if (data) {
      setClientes(data);
    }
    setCargando(false);
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '15px', marginBottom: '20px' }}>
          <h1 style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Juguemos.pro - Panel CRM</h1>
          <button 
            onClick={cargarClientes}
            style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🔄 Actualizar
          </button>
        </div>

        {cargando ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>Actualizando registros...</div>
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
                  style={{ background: '#16a34a', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}
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