import ConfessionSchema, { Confession } from './../model/Confession';
import dbConnect from '../lib/db';
import User from '../model/User';

export async function createNewConfession(description: string, email: string) {
    await dbConnect();

    const author = await User.findOne({ email }).exec();
    const confession = new ConfessionSchema({
        title: 'This is the title',
        description,
        author: author.id,
    });
    await confession.save();
    return confession;
}
