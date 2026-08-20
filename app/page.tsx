'use client';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);
  const [mensajeInput, setMensajeInput] = useState('');
  const [mensajesChat, setMensajesChat] = useState<any[]>([
    { remitente: 'cliente', texto: 'Hola, quiero crear una cuenta' },
    { remitente: 'cliente', texto: 'slots' }
  ]);

  async function fetchClientes() {
    const { data, error } = await supabase.from('Clientes').select('*');
    if (error) {
      console.error('Error al cargar clientes:', error);
    } else if (data) {
      setClientes(data);
    }
  }

  useEffect(() => {
    fetchClientes();
  }, []);

  async function actualizarEstado(nuevoEstado: string) {
    if (!clienteSeleccionado) return;
    
    const { error } = await supabase
      .from('Clientes')
      .update({ Estado: nuevoEstado })
      .eq('WhatsApp', clienteSeleccionado.WhatsApp);

    if (error) {
      alert('Error al actualizar: ' + error.message);
    } else {
      setClienteSeleccionado({ ...clienteSeleccionado, Estado: nuevoEstado });
      fetchClientes();
    }
  }

  function enviarMensaje(textoTexto?: string) {
    const textoAEnviar = textoTexto || mensajeInput;
    if (!textoAEnviar.trim()) return;

    setMensajesChat([...mensajesChat, { remitente: 'agente', texto: textoAEnviar }]);
    if (!textoTexto) setMensajeInput('');
  }

  return (
    <main className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Columna Izquierda: Conversaciones */}
      <div className="w-1/4 border-r border-gray-800 p-4 flex flex-col bg-gray-950">
        <h1 className="text-xl font-bold text-green-400 mb-4">Juguemos.pro CRM</h1>
        <div className="relative mb-3">
          <input 
            type="text" 
            placeholder="Buscar por usuario..." 
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="space-y-2 overflow-y-auto flex-1">
          {clientes.map((cliente, index) => (
            <div 
              key={index} 
              onClick={() => setClienteSeleccionado(cliente)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                clienteSeleccionado?.WhatsApp === cliente.WhatsApp ? 'bg-gray-800 border border-green-500' : 'bg-gray-900 hover:bg-gray-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{cliente.Nombre}</p>
                <span className="text-xs px-2 py-0.5 bg-green-900 text-green-300 rounded-full">
                  {cliente.Estado || 'Nuevo'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Cel: {cliente.WhatsApp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Central: Chat Activo */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {clienteSeleccionado ? (
          <>
            {/* Cabecera del Chat */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
              <div>
                <h2 className="font-bold text-lg text-white">{clienteSeleccionado.Nombre}</h2>
                <p className="text-xs text-gray-400">WhatsApp: {clienteSeleccionado.WhatsApp}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => actualizarEstado('Contactado')}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-xs rounded font-semibold"
                >
                  Marcar Contactado
                </button>
                <button 
                  onClick={() => actualizarEstado('Depósito')}
                  className="px-3 py-1 bg-green-600 hover:bg-green-500 text-xs rounded font-semibold"
                >
                  Marcar Depósito
                </button>
              </div>
            </div>

            {/* Historial de Mensajes */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-900">
              {mensajesChat.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.remitente === 'agente' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-xl text-sm ${
                    msg.remitente === 'agente' ? 'bg-green-700 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'
                  }`}>
                    {msg.texto}
                  </div>
                </div>
              ))}
            </div>

            {/* Botones de Respuesta Rápida */}
            <div className="px-6 py-2 bg-gray-950 border-t border-gray-800 flex gap-2">
              <button 
                onClick={() => enviarMensaje('Hola, te paso los datos para acceder por WhatsApp, en el Nro que registraste. Este es mi Nro 0991-672678')}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-200 rounded-lg text-xs font-semibold border border-emerald-600 transition-all"
              >
                📦 Enviar datos + bono
              </button>
              
              <button 
                onClick={() => enviarMensaje('Para realizar depósitos, aceptamos transferencias. Avisame cuando tengas tu comprobante a mano.')}
                className="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 text-blue-200 rounded-lg text-xs font-semibold border border-blue-600 transition-all"
              >
                💰 Info de depósitos
              </button>
            </div>

            {/* Input de Mensaje */}
            <div className="p-4 bg-gray-950 border-t border-gray-800 flex gap-3">
              <input 
                type="text" 
                value={mensajeInput}
                onChange={(e) => setMensajeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                placeholder="Escribí tu respuesta..."
                className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500"
              />
              <button 
                onClick={() => enviarMensaje()}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-sm transition-all"
              >
                Enviar
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center text-gray-500">
            <p className="text-lg">Selecciona un cliente de la izquierda para iniciar el chat</p>
          </div>
        )}
      </div>
    </main>
  );
}