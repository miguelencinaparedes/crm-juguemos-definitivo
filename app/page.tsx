'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Si no existen las variables, no rompemos la app, solo avisamos en consola
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = url && key ? createClient(url, key) : null;

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  async function cargarClientes() {
    if (!supabase) {
      alert("Error: Las variables de entorno de Supabase no están configuradas en Vercel.");
      return;
    }
    setCargando(true);
    const { data } = await supabase.from('Clientes').select('*');
    if (data) setClientes(data);
    setCargando(false);
  }

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: '#4ade80' }}>Juguemos.pro - CRM</h1>
      <button 
        onClick={cargarClientes} 
        style={{ background: '#16a34a', padding: '10px 20px', borderRadius: '8px', border: 'none', color: '#fff', cursor: 'pointer' }}
      >
        {cargando ? 'Cargando...' : '🔄 Cargar Clientes'}
      </button>
      <div style={{ marginTop: '20px' }}>
        {clientes.map((c: any, i: number) => (
          <div key={i} style={{ background: '#111827', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
            {c.Nombre} - {c.WhatsApp}
          </div>
        ))}
      </div>
    </main>
  );
}