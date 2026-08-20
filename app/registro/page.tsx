'use client';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistroJugador() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase
        .from('clientes') // Asegúrate de que tu tabla en Supabase se llama clientes o ajusta el nombre aquí
        .insert([{ nombre, telefono, email }]);

      if (error) throw error;
      setEnviado(true);
    } catch (err: any) {
      setError('Hubo un error al registrarse. Inténtalo de nuevo.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-2">Juguemos.pro</h1>
        <p className="text-slate-400 text-center mb-6">Regístrate para comenzar a jugar y ganar</p>

        {enviado ? (
          <div className="bg-emerald-900/50 border border-emerald-500 text-emerald-200 p-4 rounded-lg text-center">
            <p className="font-bold text-lg mb-1">¡Registro exitoso!</p>
            <p className="text-sm">Pronto nos pondremos en contacto contigo.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded text-sm">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nombre y Apellido</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Teléfono / WhatsApp</label>
              <input
                type="text"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="+595..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="tucorreo@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
            >
              Registrarme Ahora
            </button>
          </form>
        )}
      </div>
    </main>
  );
}