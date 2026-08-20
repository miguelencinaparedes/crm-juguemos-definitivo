'use client';
import { useState } from 'react';

export default function Home() {
  const [cajeroSeleccionado, setCajeroSeleccionado] = useState('Cajero 1 - Juan');
  const cajerosDisponibles = ['Cajero 1 - Juan', 'Cajero 2 - María', 'Cajero 3 - Carlos', 'Cajero 4 - Soporte General'];

  return (
    <main style={{ padding: '40px 20px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        
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

          <a 
            href="/crm" 
            style={{ background: '#16a34a', padding: '14px', borderRadius: '10px', color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>👥 Ver Listado de Clientes (CRM)</span>
            <span>➜</span>
          </a>
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

      </div>
    </main>
  );
}