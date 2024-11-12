'use client';

import { useEffect, useState } from 'react';
import UserTable from '@/components/UserTable';
import UserTableSkeleton from '@/components/UserTableSkeleton';

export default function UsersPage() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchUsersData() {
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsersData();
    }, []);

    if (!users) {
        return <UserTableSkeleton />; 
    }

    return (
        <div>
            <UserTable users={users} />
        </div>
    );
}
