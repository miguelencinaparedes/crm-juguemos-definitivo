'use client';
export const dynamic = 'force-dynamic'; 
import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  async function cargarClientes() {
    setCargando(true);
    const { data } = await supabase.from('Clientes').select('*');
    if (data) setClientes(data);
    setCargando(false);
  }

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#4ade80' }}>Juguemos.pro - CRM</h1>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <a href="/registro" style={{ background: '#1f2937', padding: '10px 20px', borderRadius: '8px', color: '#fff', textDecoration: 'none' }}>Ir al Registro</a>
          <button onClick={cargarClientes} style={{ background: '#16a34a', padding: '10px 20px', borderRadius: '8px', border: 'none', color: '#fff', cursor: 'pointer' }}>
            {cargando ? 'Cargando...' : '🔄 Cargar Clientes'}
          </button>
        </div>
        <div>
          {clientes.map((c, i) => (
            <div key={i} style={{ background: '#111827', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
              {c.Nombre} - {c.WhatsApp}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}