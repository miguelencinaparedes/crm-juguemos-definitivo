'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase.from('Clientes').select('*');
      if (data) setClientes(data);
    }
    cargar();
  }, []);

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#4ade80', fontSize: '24px', marginBottom: '20px' }}>Juguemos.pro - Panel CRM</h1>
      <p style={{ marginBottom: '20px' }}>Total de clientes: {clientes.length}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {clientes.map((c, i) => (
          <div key={i} style={{ background: '#111827', padding: '15px', borderRadius: '8px', border: '1px solid #1f2937' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#fff' }}>{c.Nombre}</h3>
            <p style={{ margin: '0', color: '#9ca3af', fontSize: '14px' }}>WhatsApp: {c.WhatsApp} | Cédula: {c.Cedula}</p>
          </div>
        ))}
      </div>
    </main>
  );
}