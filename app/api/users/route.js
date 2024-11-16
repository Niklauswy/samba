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
        const response = await fetch('http://localhost:5000/api/users/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data, { status: 200 });
        } else {
            return NextResponse.json(data, { status: response.status || 500 });
        }
    } catch (error) {
        console.error('Error in POST /api/users:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}