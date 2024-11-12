'use client';

import { useEffect, useState } from 'react';
import UserTable from '@/components/UserTable';

export default function UsersPage() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchUsersData() {
            try {
                const res = await fetch('/api/users'); // Cambiado a ruta relativa
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsersData();
    }, []);

    if (!users) {
        return <div>Cargando...</div>; // Mensaje en español
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <UserTable users={users} />
        </div>
    );
}
