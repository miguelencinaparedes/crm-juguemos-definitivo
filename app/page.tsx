'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function AdminPanel() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  async function cargarClientes() {
    try {
      setCargando(true);
      setErrorMsg('');
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

  useEffect(() => {
    cargarClientes();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#fff', padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '15px', marginBottom: '20px' }}>
          <div>
            <h1 style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Juguemos.pro - Panel CRM</h1>
            <p style={{ color: '#9ca3af', fontSize: '13px', margin: '4px 0 0 0' }}>Administración de clientes y registros</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>Total: <strong style={{ color: '#fff' }}>{clientes.length}</strong></span>
            <button 
              onClick={cargarClientes}
              style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              🔄 Actualizar Lista
            </button>
          </div>
        </div>

        {/* Mensaje de error si ocurre */}
        {errorMsg && (
          <div style={{ background: '#7f1d1d', border: '1px solid #dc2626', color: '#fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px' }}>
            Error al conectar con la base de datos: {errorMsg}
          </div>
        )}

        {/* Contenido principal */}
        {cargando ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>Cargando panel...</div>
        ) : clientes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>No hay clientes registrados todavía.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {clientes.map((cliente, index) => (
              <div key={cliente.id || index} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '16px' }}>{cliente.Nombre || 'Sin Nombre'}</h3>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>
                    📱 WhatsApp: <strong>{cliente.WhatsApp}</strong> | 🆔 Cédula: <strong>{cliente.Cedula}</strong>
                  </p>
                </div>
                <a
                  href={`https://wa.me/${cliente.WhatsApp?.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${cliente.Nombre}! Vemos que te registraste en Juguemos.pro. Aquí tienes tus accesos y tu bono de bienvenida.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#16a34a', color: '#fff', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  💬 Escribir WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}