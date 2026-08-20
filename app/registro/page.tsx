'use client';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistroJugador() {
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cedula, setCedula] = useState('');
  const [registrado, setRegistrado] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre || !whatsapp || !cedula) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    setCargando(true);

    const cedulaNum = Number(cedula.trim());

    // 1. Verificamos si la cédula ya existe convirtiéndola a número
    const { data: existenteCedula } = await supabase
      .from('Clientes')
      .select('Cedula')
      .eq('Cedula', cedulaNum)
      .maybeSingle();

    if (existenteCedula) {
      setCargando(false);
      alert('⚠️ Este número de cédula ya se encuentra registrado. ¡Ya tienes una cuenta activa!');
      return;
    }

    // 2. Verificamos si el WhatsApp ya existe
    const { data: existenteWp } = await supabase
      .from('Clientes')
      .select('WhatsApp')
      .eq('WhatsApp', whatsapp.trim())
      .maybeSingle();

    if (existenteWp) {
      setCargando(false);
      alert('⚠️ Este número de WhatsApp ya fue utilizado para un registro previo.');
      return;
    }

    // 3. Guardamos el nuevo registro usando el número para la cédula
    const { error } = await supabase.from('Clientes').insert([
      {
        Nombre: nombre.trim(),
        WhatsApp: whatsapp.trim(),
        Cedula: cedulaNum,
        Estado: 'Nuevo'
      }
    ]);

    setCargando(false);

    if (error) {
      alert('Error al registrarse: ' + error.message);
    } else {
      setRegistrado(true);
    }
  }

  return (
    <main className="flex min-h-screen bg-gray-950 text-white font-sans justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-green-400">Juguemos.pro</h1>
          <p className="text-sm text-gray-400 mt-2">¡Regístrate ahora y reclama tu bono de bienvenida!</p>
        </div>

        {registrado ? (
          <div className="text-center space-y-6">
            <div className="bg-green-950 border border-green-600 rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-300 mb-2">¡Cuenta creada con éxito! 🎉</h2>
              <p className="text-sm text-gray-300">Tu asesor está preparando tu bono de 20.000 Gs. Haz clic abajo para recibir tus accesos directamente en tu WhatsApp.</p>
            </div>
            
            <a 
              href={`https://wa.me/595983301903?text=${encodeURIComponent(`¡Hola! Me acabo de registrar en Juguemos.pro. Mi nombre es ${nombre} y quiero mi bono de 20.000 Gs.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg text-sm"
            >
              💬 Abrir WhatsApp y Recibir Accesos
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Nombre y Apellido</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Número de WhatsApp</label>
              <input 
                type="text" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Ej. 0991234567"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Cédula de Identidad</label>
              <input 
                type="number" 
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ej. 1234567"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500"
              />
            </div>

            <button 
              type="submit" 
              disabled={cargando}
              className="w-full mt-4 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all shadow-lg text-sm"
            >
              {cargando ? 'Verificando...' : '¡Obtener Bono y Jugar!'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}