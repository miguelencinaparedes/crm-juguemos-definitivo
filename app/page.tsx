'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [vista, setVista] = useState<'registro' | 'crm'>('registro');
  
  // Estados para el Registro
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cedula, setCedula] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Estados para el CRM
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  async function registrarJugador(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    const { error } = await supabase.from('Clientes').insert([
      { Nombre: nombre, WhatsApp: whatsapp, Cedula: cedula }
    ]);
    
    if (error) {
      alert("Error al registrar: " + error.message);
    } else {
      alert("¡Registro exitoso!");
      setNombre(''); setWhatsapp(''); setCedula('');
    }
    setEnviando(false);
  }

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
    <main style={{ padding: '40px 20px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        
        {/* Selector de Vistas Superior */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', background: '#111827', padding: '6px', borderRadius: '10px', border: '1px solid #1f2937' }}>
          <button 
            onClick={() => setVista('registro')} 
            style={{ flex: 1, padding: '10px', background: vista === 'registro' ? '#16a34a' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            📋 Registrarse
          </button>
          <button 
            onClick={() => setVista('crm')} 
            style={{ flex: 1, padding: '10px', background: vista === 'crm' ? '#16a34a' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            👥 Ver CRM (Clientes)
          </button>
        </div>

        {/* VISTA 1: REGISTRO */}
        {vista === 'registro' && (
          <form onSubmit={registrarJugador} style={{ background: '#111827', border: '1px solid #1f2937', padding: '24px', borderRadius: '12px' }}>
            <h1 style={{ fontSize: '22px', marginBottom: '8px', color: '#4ade80' }}>Juguemos.pro</h1>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>Completa tus datos para registrarte.</p>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#9ca3af', marginBottom: '5px' }}>Nombre</label>
              <input placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: '100%', padding: '10px', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff' }} required />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#9ca3af', marginBottom: '5px' }}>WhatsApp</label>
              <input placeholder="Ej: 595981234567" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} style={{ width: '100%', padding: '10px', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff' }} required />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#9ca3af', marginBottom: '5px' }}>Cédula</label>
              <input placeholder="Tu número de cédula" value={cedula} onChange={e => setCedula(e.target.value)} style={{ width: '100%', padding: '10px', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff' }} required />
            </div>

            <button disabled={enviando} style={{ width: '100%', padding: '12px', background: '#16a34a', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              {enviando ? 'Registrando...' : 'Completar Registro'}
            </button>
          </form>
        )}

        {/* VISTA 2: CRM */}
        {vista === 'crm' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Listado de Clientes ({clientes.length})</h1>
              <button onClick={cargarClientes} style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
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
                      <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>📱 {cliente.WhatsApp} | 🆔 {cliente.Cedula}</p>
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
          </div>
        )}

      </div>
    </main>
  );
}