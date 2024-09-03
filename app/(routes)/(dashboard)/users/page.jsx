'use client';

import React, {useState, useEffect} from 'react';
import SearchBar from "@/app/(routes)/(dashboard)/users/components/SearchBar";
import TabsComponent from "@/app/(routes)/(dashboard)/users/components/Tabs";
import UserTable from "@/app/(routes)/(dashboard)/users/components/UserTable";

export default function UserPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("http://localhost:5000/api/users", {
                    cache: 'no-store'
                });
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();


        const intervalId = setInterval(() => {
            fetchUsers();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const filteredUsers = users.filter(user => {
        return [user.name.toLowerCase(), user.username.toLowerCase()].some(field =>
            field.includes(searchQuery.toLowerCase())
        );
    });
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <header
                    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">

                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <TabsComponent>
                        <UserTable users={filteredUsers}/>
                    </TabsComponent>
                </main>
            </div>
        </div>
    );
}


