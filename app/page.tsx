'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    async function cargarClientes() {
      const { data } = await supabase.from('Clientes').select('*');
      if (data) setClientes(data);
    }

    cargarClientes();

    // Suscripción en tiempo real
    const channel = supabase
      .channel('realtime-clientes-admin')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Clientes' },
        (payload) => {
          setClientes((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-950 text-white font-sans p-6 justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold text-green-400">Juguemos.pro - Panel CRM</h1>
          <span className="text-sm text-gray-400">Total Clientes: {clientes.length}</span>
        </div>

        {clientes.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Cargando o sin registros...</div>
        ) : (
          <div className="space-y-3">
            {clientes.map((cliente, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center shadow">
                <div>
                  <h2 className="font-bold text-lg text-white">{cliente.Nombre}</h2>
                  <p className="text-sm text-gray-400">WhatsApp: {cliente.WhatsApp} | Cédula: {cliente.Cedula}</p>
                </div>
                <a
                  href={`https://wa.me/${cliente.WhatsApp?.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg text-xs"
                >
                  💬 WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}