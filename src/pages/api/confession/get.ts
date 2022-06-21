import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllConfessions } from '../../../controller/confession';
import { Confession } from '../../../model/Confession';

export default async function getConfession(
    req: NextApiRequest,
    res: NextApiResponse<Confession | string>
) {
    const allConfessions = await getAllConfessions();
    console.log(allConfessions);
    res.status(200).json(allConfessions);
}
