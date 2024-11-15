'use client';
import React from 'react';
import Image from 'next/image';
import '@/app/globals.css'; // Asegúrate de importar los estilos globales

export const metadata = {
  title: 'Autenticación',
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo con logos */}
      <div className="w-1/2 relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500">
          {/* Separador en zig-zag */}
          <svg
            className="absolute inset-y-0 right-0 h-full w-16 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 50,100 0,100" />
          </svg>
        </div>
        <div className="flex flex-col items-center justify-center h-full relative z-10 px-6">
          <Image
            src="/uabcLogo.png"
            alt="UABC Logo"
            width={200}
            height={200}
            className="mb-8"
          />
          <Image
            src="/facultadLogo.png"
            alt="Facultad Logo"
            width={150}
            height={150}
          />
        </div>
      </div>
      {/* Lado derecho con formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}