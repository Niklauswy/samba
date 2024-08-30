'use client';
import React, { useState } from 'react';
import SearchBar from "../../(users)/components/SearchBar";
import LogTable from "../components/LogTable";
import LogFilter from "../components/LogFiltrer";

export default function Logs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ user: '', dateRange: '', ip: '', eventType: '' });

    const logs = [
        { id: 1, user: "Batman", action: "Connect", ip: "141.231.211.313", timestamp: "2023-07-12 10:41 AM" },
        { id: 2, user: "Superman", action: "Connect", ip: "141.211.211.313", timestamp: "2023-07-12 10:23 AM" },
        { id: 3, user: "Flash", action: "Connect", ip: "111.211.211.313", timestamp: "2023-07-11 10:23 AM" },
        { id: 4, user: "Wonder Woman", action: "Connect", ip: "101.211.211.313", timestamp: "2023-07-11 10:23 AM" },
        { id: 5, user: "Aquaman", action: "Connect", ip: "111.211.211.393", timestamp: "2021-07-11 10:23 AM" },
        { id: 6, user: "Batman", action: "Disconnect", ip: "141.231.211.313", timestamp: "2023-07-12 10:41 AM" },
        { id: 7, user: "Benedicto", action: "Disconnect", ip: "141.211.211.313", timestamp: "2023-07-12 10:23 AM" },
        { id: 8, user: "Blanco", action: "Disconnect", ip: "111.211.211.313", timestamp: "2023-07-11 10:23 AM" },
        { id: 9, user: "Bueno", action: "Disconnect", ip: "101.211.211.313", timestamp: "2023-07-11 10:23 AM" },
        { id: 10, user: "Alameda", action: "Disconnect", ip: "101.211.211.313", timestamp: "2023-07-11 10:23 AM" },
    ];

    const filteredLogs = logs.filter(log => {
        return (
            log.user.toLowerCase().includes(filters.user.toLowerCase()) &&
            log.ip.includes(filters.ip) &&
            log.action.toLowerCase().includes(filters.eventType.toLowerCase()) &&
            (!filters.dateRange || (new Date(log.timestamp) >= new Date(filters.dateRange[0]) && new Date(log.timestamp) <= new Date(filters.dateRange[1])))
        );
    });

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4">

                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <LogFilter logs={logs} filters={filters} setFilters={setFilters} />
                    <LogTable logs={filteredLogs} />
                </main>
            </div>
        </div>
    );
}