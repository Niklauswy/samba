'use client';
import React, { useEffect, useState } from 'react';

const Groups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchGroups() {
            try {
                const res = await fetch("http://localhost:5000/api/groups", {
                    cache: 'no-store'
                });
                const data = await res.json();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }

        fetchGroups();
    }, []);

    return (
        <div>
            {groups.map(group => (
                <div key={group.id}>
                    <h1 className="font-bold">{group.name}</h1>
                    {group.users.map(user => (
                        <p key={user}>{user}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Groups;