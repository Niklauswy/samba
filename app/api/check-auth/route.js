
import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export async function GET(request) {
    const auth = getCookie('auth', { req: request, res: NextResponse });
    if (auth === 'true') {
        return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
}