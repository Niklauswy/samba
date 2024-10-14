'use client';

import { useEffect, useState } from 'react';
//import { fetchUsers } from '@/app/API/data';
import UserTable from '@/components/UserTable';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsersData() {
            let users = await fetch('http://localhost:5000/api/users')
            let data = await users.json()
            setUsers(data);
        }
        fetchUsersData();

    }, []);

    if (!users) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <UserTable users={users} />
        </div>
    );
}
