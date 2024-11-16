import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const res = await fetch('http://localhost:5000/api/users', {
            cache: 'no-store',
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching users from external API:', error);
        return NextResponse.error();
    }
}

export async function POST(request) {
    try {
        const userData = await request.json();
        // Validate required fields
        const { samAccountName, givenName, sn, password, ou, groups } = userData;

        if (!samAccountName || !givenName || !sn || !password || !ou || !groups) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        // Call the backend API endpoint
        const res = await fetch('http://localhost:5000/api/users/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }
}