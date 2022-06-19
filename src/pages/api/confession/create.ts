import type { NextApiRequest, NextApiResponse } from 'next';
import { createNewConfession } from '../../../controller/confession';
import { Confession } from '../../../model/Confession';

export default async function createConfession(
    req: NextApiRequest,
    res: NextApiResponse<Confession | string>
) {
    const confession = await createNewConfession();
    res.status(200).json(confession);
}
