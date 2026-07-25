import React from 'react';
import { Head } from '@inertiajs/react';

export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head title="403 Prohibido" />
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Acceso prohibido</h2>
      <p className="text-gray-700 mb-6">No tienes permisos para acceder a esta página.</p>
      <a href="/public" className="text-blue-600 hover:underline">Volver al inicio</a>
    </div>
  );
}
