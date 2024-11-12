
import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';

export async function POST(request) {
    const { username, password } = await request.json();
    // Replace with real authentication logic
    if (username === 'admin' && password === 'password') {
        const response = NextResponse.json({ message: 'Login successful' });
        setCookie('auth', 'true', { req: request, res: response });
        return response;
    }
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}