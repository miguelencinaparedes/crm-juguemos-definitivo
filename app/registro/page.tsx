'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistroJugador() {
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cedula, setCedula] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [registrado, setRegistrado] = useState(false);

  async function registrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    const { error } = await supabase.from('Clientes').insert([
      { Nombre: nombre, WhatsApp: whatsapp, Cedula: cedula }
    ]);
    
    if (error) {
      alert("Error al registrar: " + error.message);
    } else {
      setRegistrado(true);
      setNombre(''); setWhatsapp(''); setCedula('');
    }
    setEnviando(false);
  }

  // Estilo para el Logo Explosivo en CSS
  const logoExplosivoStyle = {
    fontFamily: '"Arial Black", "Arial", sans-serif',
    fontSize: '28px',
    fontWeight: '900',
    color: '#4ade80', // Verde neón principal
    textTransform: 'uppercase',
    letterSpacing: '1px',
    position: 'relative',
    display: 'inline-block',
    marginBottom: '20px',
    // Efecto de sombra para el "borde" explosivo
    textShadow: `
      3px 3px 0px #16a34a, 
      -3px 3px 0px #16a34a, 
      3px -3px 0px #16a34a, 
      -3px -3px 0px #16a34a,
      6px 6px 10px rgba(0,0,0,0.5)
    `,
    padding: '10px 5px', // Un poco de espacio para la sombra
  };

  // Estilo para el icono del bono 20K
  const bonoIconoStyle = {
    position: 'absolute',
    top: '-15px',
    right: '-30px',
    background: '#fbbf24', // Amarillo vibrante
    color: '#111827', // Texto oscuro
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '15px',
    border: '2px solid #fff',
    transform: 'rotate(10deg)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    zIndex: 1,
  };

  return (
    <main style={{ padding: '30px 20px', background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#111827', border: '1px solid #1f2937', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
        
        {/* ---> AQUI ESTA EL LOGO CREADO CON CSS <--- */}
        <div style={logoExplosivoStyle}>
          JUGUEMOS.PRO
          <span style={bonoIconoStyle}>+20K Bono</span>
        </div>
        
        {registrado ? (
          // Mensaje de éxito (mantenemos el estilo anterior)
          <div style={{ background: '#166534', border: '1px solid #16a34a', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>🎉</div>
            <h2 style={{ fontSize: '22px', color: '#fff', marginBottom: '10px', fontWeight: 'bold' }}>¡Cuenta creada con éxito!</h2>
            <p style={{ color: '#bbf7d0', fontSize: '15px', marginBottom: '25px', lineHeight: '1.4' }}>
              Tu asesor está preparando tu bono de 20.000 Gs.<br/>
              Haz clic abajo para recibir tus accesos.
            </p>
            <a
              href="https://wa.me/595986457358?text=Hola,%20ya%20me%20registré%20en%20Juguemos.pro"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: '100%', display: 'block', padding: '14px', background: '#16a34a', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px' }}
            >
              💬 Abrir WhatsApp y Recibir Accesos
            </a>
          </div>
        ) : (
          // El formulario de registro
          <form onSubmit={registrar}>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '25px' }}>¡Regístrate ahora y reclama tu bono de bienvenida!</p>
            
            <div style={{ marginBottom: '18px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#9ca3af', marginBottom: '6px', fontWeight: '500' }}>Nombre y Apellido</label>
              <input placeholder="Tu nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: '100%', padding: '12px', background: '#030712', border: '1px solid #374151', borderRadius: '8px', color: '#fff', fontSize: '15px' }} required />
            </div>

            <div style={{ marginBottom: '18px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#9ca3af', marginBottom: '6px', fontWeight: '500' }}>Número de WhatsApp</label>
              <input placeholder="+595..." value={whatsapp} onChange={e => setWhatsapp(e.target.value)} style={{ width: '100%', padding: '12px', background: '#030712', border: '1px solid #374151', borderRadius: '8px', color: '#fff', fontSize: '15px' }} required />
            </div>

            <div style={{ marginBottom: '25px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#9ca3af', marginBottom: '6px', fontWeight: '500' }}>Cédula de Identidad</label>
              <input placeholder="Número de cédula" value={cedula} onChange={e => setCedula(e.target.value)} style={{ width: '100%', padding: '12px', background: '#030712', border: '1px solid #374151', borderRadius: '8px', color: '#fff', fontSize: '15px' }} required />
            </div>

            <button disabled={enviando} style={{ width: '100%', padding: '14px', background: '#16a34a', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#15803d'} onMouseOut={e => e.currentTarget.style.background = '#16a34a'}>
              {enviando ? 'Registrando...' : '¡Obtener Bono y Jugar!'}
            </button>
          </form>
        )}

      </div>
    </main>
  );
}