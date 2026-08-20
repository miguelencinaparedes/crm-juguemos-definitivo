'use client';
import { useState } from 'react';

export default function Home() {
  // Estado para simular la asignación de cajeros
  const [cajeroSeleccionado, setCajeroSeleccionado] = useState('Cajero 1 - Juan');
  const cajerosDisponibles = ['Cajero 1 - Juan', 'Cajero 2 - María', 'Cajero 3 - Carlos', 'Cajero 4 - Soporte General'];

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' }}>
          <h1 style={{ color: '#4ade80', fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Juguemos.pro - Panel Central</h1>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Sistema de gestión, captación y distribución de cajeros.</p>
        </div>

        {/* Tarjeta de Navegación y Accesos */}
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
            
            <a 
              href="/crm" 
              style={{ background: '#16a34a', color: '#fff', padding: '12px 16px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>👥 Ver Panel CRM de Clientes</span>
              <span>➜</span>
            </a>
          </div>
        </div>

        {/* Módulo de Asignación de Cajeros */}
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
                  fontWeight: 'bold',
                  transition: 'background 0.2s'
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

      </div>
    </main>
  );
}