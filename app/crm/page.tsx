'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function CrmPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  async function cargarClientes() {
    try {
      setCargando(true);
      const { data } = await supabase.from('Clientes').select('*');
      if (data) setClientes(data);
    } catch (e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* Cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '15px', marginBottom: '20px' }}>
          <div>
            <a href="/" style={{ color: '#4ade80', fontSize: '13px', textDecoration: 'none' }}>← Volver al Panel</a>
            <h1 style={{ color: '#fff', fontSize: '22px', margin: '5px 0 0 0' }}>CRM de Clientes</h1>
          </div>
          <button onClick={cargarClientes} style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
            🔄 Actualizar
          </button>
        </div>

        {/* Listado */}
        {cargando ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Cargando registros...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {clientes.map((cliente, index) => (
              <div key={index} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{cliente.Nombre}</h3>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>WhatsApp: {cliente.WhatsApp} | Cédula: {cliente.Cedula}</p>
                </div>
                <a
                  href={`https://wa.me/${cliente.WhatsApp?.replace(/\D/g, '')}?text=¡Hola!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#16a34a', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}
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