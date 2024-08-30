'use client';
import React, {useState} from 'react';
import SearchBar from "../components/SearchBar";
import TabsComponent from "../components/Tabs";
import UserTable from "../components/UserTable";
import {Breadcrumb, BreadcrumbItem, BreadcrumbSeparator} from "@/components/ui/breadcrumb";

export default function UsesPages() {
    const [searchQuery, setSearchQuery] = useState('');

    const users = [
   {
            id: 2,
            username: "Batman",
            name: "Bruce Wayne, el caballero de la noche",
            ou: "MAT",
            group: "estudiante",
            totalLogs: 12,
            lastLogin: "2023-07-12 10:41 AM",
            image: ""
        },{
            id: 3,
            username: "Superman",
            name: "Clark Kent",
            ou: "FIS",
            group: "estudiante",
            totalLogs: 12,
            lastLogin: "2023-07-12 10:23 AM",
        },{
            id: 4,
            username: "Flash",
            name: "Barry Allen",
            ou: "FIS",
            group: "estudiante",
            totalLogs: 12,
            lastLogin: "2023-07-11 10:23 AM",

        },{
            id: 5,
            username: "Wonder woman",
            name: "Diana Prince",
            ou: "CS",
            group: "estudiante",
            totalLogs: 12,
            lastLogin: "2023-07-11 10:23 AM",

        },{
            id: 6,
            username: "Aquaman",
            name: "Arthur Curry",
            ou: "CDD",
            group: "estudiante",
            totalLogs: 11111,
            lastLogin: "2021-07-11 10:23 AM",
        }


    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


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