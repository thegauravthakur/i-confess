import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';
import { NextFetchEvent, NextResponse } from 'next/server';

export async function middleware(req: NextApiRequest, event: NextFetchEvent) {
    const session = await getSession({ req });
    if (!session) {
        return new Response('user not authenticated!', { status: 401 });
    }
    NextResponse.next();
}
