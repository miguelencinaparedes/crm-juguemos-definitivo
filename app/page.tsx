'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // Cargar clientes iniciales y configurar tiempo real
  useEffect(() => {
    async function cargarClientes() {
      const { data, error } = await supabase
        .from('Clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al cargar clientes:', error.message);
      } else if (data) {
        setClientes(data);
      }
      setCargando(false);
    }

    cargarClientes();

    // Escuchar nuevos registros en tiempo real
    const channel = supabase
      .channel('realtime-clientes-admin')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Clientes' },
        (payload) => {
          console.log('¡Nuevo registro detectado!', payload.new);
          // Agrega el nuevo cliente automáticamente al inicio de la lista
          setClientes((prevClientes) => [payload.new, ...prevClientes]);
        }
      )
      .subscribe();

    // Limpiar suscripción al desmontar el componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-950 text-white font-sans p-6">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-extrabold text-green-400">Juguemos.pro - Panel CRM</h1>
          <span className="text-sm text-gray-400">
            Total Clientes: <strong className="text-white">{clientes.length}</strong>
          </span>
        </div>

        {cargando ? (
          <div className="text-center py-20 text-gray-400">Cargando registros...</div>
        ) : clientes.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No hay clientes registrados todavía.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientes.map((cliente, index) => (
              <div 
                key={cliente.id || cliente.Cedula || index} 
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
                <div className="flex justify-between items-start">
                  <h2 className="font-bold text-lg text-white">{cliente.Nombre}</h2>
                  <span className="px-2.5 py-1 bg-green-950 border border-green-700 text-green-300 text-xs rounded-full font-medium">
                    {cliente.Estado || 'Nuevo'}
                  </span>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>📱 <strong className="text-gray-400">WhatsApp:</strong> {cliente.WhatsApp}</p>
                  <p>🆔 <strong className="text-gray-400">Cédula:</strong> {cliente.Cedula}</p>
                </div>
                <a
                  href={`https://wa.me/${cliente.WhatsApp?.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${cliente.Nombre}! Vemos que te registraste en Juguemos.pro. Aquí tienes tus accesos y tu bono.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all text-xs shadow"
                >
                  💬 Escribir al WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}