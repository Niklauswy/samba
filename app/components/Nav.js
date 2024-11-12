
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Nav() {
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
    <nav>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}