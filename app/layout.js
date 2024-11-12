'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard Access",
  description: "Dashboard para la g",
};

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/check-auth');
      if (res.ok) {
        setIsAuthenticated(true);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
