import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export async function GET(request) {
    const auth = getCookie('auth', { req: request, res: NextResponse });
    if (auth !== 'true') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
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