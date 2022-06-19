import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createNewConfession } from '../../../controller/confession';
import { Confession } from '../../../model/Confession';

export default async function createConfession(
    req: NextApiRequest,
    res: NextApiResponse<Confession | string>
) {
    const session = await getSession({ req });

    const { description } = JSON.parse(req.body) as Omit<Confession, 'author'>;
    const confession = await createNewConfession(
        description,
        session?.user?.email ?? ''
    );
    res.status(200).json(confession);
}
