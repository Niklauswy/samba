'use client'; // Esto es importante para habilitar el renderizado en el cliente

import { useEffect, useState } from 'react';
import { fetchUsers } from '@/app/API/data';
import UserTable from '@/components/UserTable';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchInitialUsers = async () => {
            const initialUsers = await fetchUsers();
            setUsers(initialUsers);
        };

        fetchInitialUsers();

        const intervalId = setInterval(async () => {
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <UserTable users={users} />
        </div>
    );
}
