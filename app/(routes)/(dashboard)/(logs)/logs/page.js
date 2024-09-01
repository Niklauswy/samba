'use client';
import React, {useEffect, useState} from 'react';
import SearchBar from "../../(users)/components/SearchBar";
import LogTable from "../components/LogTable";
import LogFilter from "../components/LogFiltrer";

export default function Logs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({user: '', dateRange: '', ip: '', event: ''});

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await fetch("http://localhost:5000/api/logs", {
                    cache: 'no-store'
                });
                const data = await res.json();
                setLogs(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchLogs();
        const intervalId = setInterval(() => {
            fetchLogs();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);


const filteredLogs = logs.filter(({ user, ip, event, date }) => {
  const { user: filterUser, ip: filterIp, event: filterEvent, dateRange } = filters;

  const userMatch = !filterUser || user?.toLowerCase().includes(filterUser.toLowerCase());
  const ipMatch = !filterIp || ip?.includes(filterIp);
  const eventMatch = !filterEvent || event?.toLowerCase() === filterEvent.toLowerCase();

  const logDate = date.split(' ')[0];
  const [day, month, year] = logDate.split('/').map(Number);
  const logDateObj = new Date(year, month - 1, day);

  const dateRangeMatch = !dateRange || (
    dateRange.from && dateRange.to &&
    logDateObj >= new Date(dateRange.from) &&
    logDateObj <= new Date(dateRange.to)
  );



  return userMatch && ipMatch && eventMatch && dateRangeMatch;
});
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4">

                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <LogFilter logs={logs} filters={filters} setFilters={setFilters}/>
                    <LogTable logs={filteredLogs}/>
                </main>
            </div>
        </div>
    );
}