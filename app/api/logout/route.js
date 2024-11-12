
import { NextResponse } from 'next/server';
import { deleteCookie } from 'cookies-next';

export async function POST(request) {
    const response = NextResponse.json({ message: 'Logout successful' });
    deleteCookie('auth', { req: request, res: response });
    return response;
}