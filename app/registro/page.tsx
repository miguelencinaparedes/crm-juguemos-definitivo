'use client';
export const dynamic = 'force-dynamic'; // Esto evita el error de prerendering
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistroJugador() {
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cedula, setCedula] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function registrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    const { error } = await supabase.from('Clientes').insert([
      { Nombre: nombre, WhatsApp: whatsapp, Cedula: cedula }
    ]);
    
    if (error) {
      alert("Error al registrar: " + error.message);
    } else {
      alert("¡Registrado con éxito!");
      setNombre(''); setWhatsapp(''); setCedula('');
    }
    setEnviando(false);
  }

  return (
    <main style={{ padding: '30px', background: '#030712', color: '#fff', minHeight: '100vh' }}>
      <form onSubmit={registrar} style={{ maxWidth: '400px', margin: '0 auto', background: '#111827', padding: '20px', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '20px', marginBottom: '20px' }}>Registro Juguemos.pro</h1>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#030712', border: '1px solid #374151', color: '#fff' }} required />
        <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#030712', border: '1px solid #374151', color: '#fff' }} required />
        <input placeholder="Cédula" value={cedula} onChange={e => setCedula(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#030712', border: '1px solid #374151', color: '#fff' }} required />
        <button disabled={enviando} style={{ width: '100%', padding: '12px', background: '#16a34a', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          {enviando ? 'Enviando...' : 'Registrarse'}
        </button>
      </form>
    </main>
  );
}