import type { NextApiRequest, NextApiResponse } from 'next';
import { createNewConfession } from '../../../controller/confession';
import { Confession } from '../../../model/Confession';
import { getSession } from 'next-auth/react';

export default async function createConfession(
    req: NextApiRequest,
    res: NextApiResponse<Confession | string>
) {
    const session = await getSession({ req });
    if (session) {
        const confession = await createNewConfession();
        res.status(200).json(confession);
    } else res.status(401).send('user needs to be logged in!');
}
