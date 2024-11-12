'use client';

import { useEffect, useState } from 'react';
import UserTable from '@/components/UserTable';
import UserTableSkeleton from '@/components/UserTableSkeleton';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
    const [users, setUsers] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUsersData() {
            const res = await fetch('/api/check-auth');
            if (res.status !== 200) {
                router.push('/login');
                return;
            }
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsersData();
    }, [router]);

    if (!users) {
        return <UserTableSkeleton />; 
    }

    return (
        <div>
            <UserTable users={users} />
        </div>
    );
}
