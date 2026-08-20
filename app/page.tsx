'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [vista, setVista] = useState<'menu' | 'crm'>('menu');
  const [cajeroSeleccionado, setCajeroSeleccionado] = useState('Cajero 1 - Juan');
  const cajerosDisponibles = ['Cajero 1 - Juan', 'Cajero 2 - María', 'Cajero 3 - Carlos', 'Cajero 4 - Soporte General'];

  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando,setCargando] = useState(false);

  async function cargarClientes() {
    setCargando(true);
    const { data } = await supabase.from('Clientes').select('*');
    if (data) setClientes(data);
    setCargando(false);
  }

  useEffect(() => {
    if (vista === 'crm') {
      cargarClientes();
    }
  }, [vista]);

  return (
    <main style={{ padding: '30px 20px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '750px' }}>
        
        {vista === 'menu' ? (
          <>
            {/* Encabezado */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ color: '#4ade80', fontSize: '28px', marginBottom: '8px' }}>Juguemos.pro</h1>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Panel de Control y Distribución de Cajeros</p>
            </div>
            
            {/* Botones de Acceso */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              <a 
                href="/registro" 
                style={{ background: '#1f2937', border: '1px solid #374151', padding: '14px', borderRadius: '10px', color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>📋 Ir al Formulario de Registro</span>
                <span style={{ color: '#4ade80' }}>➜</span>
              </a>

              <button 
                onClick={() => setVista('crm')}
                style={{ background: '#16a34a', border: 'none', padding: '14px', borderRadius: '10px', color: '#fff', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', width: '100%', textAlign: 'left' }}
              >
                <span>👥 Ver Listado de Clientes (CRM)</span>
                <span>➜</span>
              </button>
            </div>

            {/* Módulo de Cajeros */}
            <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ fontSize: '16px', color: '#fff', marginBottom: '10px' }}>⚡ Control de Cajeros Activos</h2>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '15px' }}>
                Selecciona el cajero que atenderá los chats:
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                {cajerosDisponibles.map((cajero, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCajeroSeleccionado(cajero)}
                    style={{
                      background: cajeroSeleccionado === cajero ? '#2563eb' : '#1f2937',
                      color: '#fff',
                      border: '1px solid #374151',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {cajero}
                  </button>
                ))}
              </div>

              <div style={{ background: '#030712', padding: '10px', borderRadius: '6px', fontSize: '13px', color: '#9ca3af', border: '1px solid #1f2937' }}>
                🟢 Cajero activo: <strong style={{ color: '#4ade80' }}>{cajeroSeleccionado}</strong>
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
                  style={{ background: 'none', border: 'none', color: '#4ade80', fontSize: '13px', cursor: 'pointer', padding: 0, marginBottom: '6px' }}
                >
                  ← Volver al Panel
                </button>
                <h1 style={{ color: '#fff', fontSize: '22px', margin: '4px 0 0 0' }}>CRM de Clientes ({clientes.length})</h1>
              </div>
              <button 
                onClick={cargarClientes} 
                style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                🔄 Actualizar
              </button>
            </div>

            {cargando ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Cargando registros...</div>
            ) : clientes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>No hay clientes registrados todavía.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {clientes.map((cliente, index) => (
                  <div key={index} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#fff' }}>{cliente.Nombre}</h3>
                      <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>📱 WhatsApp: {cliente.WhatsApp} | 🆔 Cédula: {cliente.Cedula}</p>
                    </div>
                    <a
                      href={`https://wa.me/${cliente.WhatsApp?.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${cliente.Nombre}! Vemos que te registraste en Juguemos.pro.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: '#16a34a', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap' }}
                    >
                      💬 Escribir
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