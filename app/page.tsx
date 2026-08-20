'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [vista, setVista] = useState<'menu' | 'crm'>('menu');
  const [cajeroSeleccionado, setCajeroSeleccionado] = useState('Cajero 1 - Juan');
  const cajerosDisponibles = ['Cajero 1 - Juan', 'Cajero 2 - María', 'Cajero 3 - Carlos', 'Cajero 4 - Soporte General'];

  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  async function cargarClientes() {
    try {
      setCargando(true);
      const { data, error } = await supabase.from('Clientes').select('*');
      if (data) {
        setClientes(data);
      } else if (error) {
        console.error('Error Supabase:', error.message);
      }
    } catch (e) {
      console.error('Excepción:', e);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    if (vista === 'crm') {
      cargarClientes();
    }
  }, [vista]);

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        
        {vista === 'menu' ? (
          <>
            {/* Encabezado */}
            <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' }}>
              <h1 style={{ color: '#4ade80', fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Juguemos.pro - Panel Central</h1>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Sistema de gestión, captación y distribución de cajeros.</p>
            </div>

            {/* Accesos Rápidos */}
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
                
                <button 
                  onClick={() => setVista('crm')}
                  style={{ background: '#16a34a', color: '#fff', padding: '12px 16px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left' }}
                >
                  <span>👥 Ver Panel CRM de Clientes</span>
                  <span>➜</span>
                </button>
              </div>
            </div>

            {/* Control de Cajeros */}
            <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
              <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '10px' }}>⚡ Control de Cajeros Activos</h2>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '15px' }}>
                Selecciona el cajero que estará recibiendo los nuevos leads o los chats directos de los jugadores:
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                {cajerosDisponibles.map((cajero, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCajeroSeleccionado(cajero)}
                    style={{
                      background: cajeroSeleccionado === cajero ? '#2563eb' : '#1f2937',
                      color: '#fff',
                      border: '1px solid #374151',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {cajero}
                  </button>
                ))}
              </div>

              <div style={{ background: '#030712', padding: '12px', borderRadius: '8px', border: '1px solid #1f2937', fontSize: '13px', color: '#9ca3af' }}>
                🟢 Cajero activo en turno: <strong style={{ color: '#4ade80' }}>{cajeroSeleccionado}</strong>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Vista del CRM de Clientes */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '15px', marginBottom: '20px' }}>
              <div>
                <button 
                  onClick={() => setVista('menu')} 
                  style={{ background: 'none', border: 'none', color: '#4ade80', fontSize: '13px', cursor: 'pointer', padding: 0, marginBottom: '6px', display: 'inline-block' }}
                >
                  ← Volver al Panel Central
                </button>
                <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Juguemos.pro - CRM de Clientes</h1>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>Total: <strong style={{ color: '#fff' }}>{clientes.length}</strong></span>
                <button 
                  onClick={cargarClientes}
                  style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  🔄 Actualizar
                </button>
              </div>
            </div>

            {cargando ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>Cargando registros...</div>
            ) : clientes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>No hay clientes registrados todavía.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {clientes.map((cliente, index) => (
                  <div key={index} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                    <div>
                      <h2 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '18px' }}>{cliente.Nombre}</h2>
                      <p style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>📱 WhatsApp: {cliente.WhatsApp} | 🆔 Cédula: {cliente.Cedula}</p>
                    </div>
                    <a
                      href={`https://wa.me/${cliente.WhatsApp?.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${cliente.Nombre}! Vemos que te registraste en Juguemos.pro. Aquí tienes tus accesos y tu bono de bienvenida.`)}`}
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
          </>
        )}

      </div>
    </main>
  );
}