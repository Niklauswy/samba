import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

async function getUsers() {
    const res = await fetch("http://localhost:5000/api/users", {
        cache: 'no-store'
    });
    const data = await res.json();
    return data;
}

const Page = async () => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch('/api/check-auth');
            if (res.status !== 200) {
                router.push('/login');
            }
        }
        checkAuth();
    }, [router]);

    const users = await getUsers();

    return (
        <div>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{JSON.stringify(user)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Page;