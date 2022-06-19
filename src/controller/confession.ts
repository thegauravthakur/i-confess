import dbConnect from '../lib/db';
import ConfessionSchema from '../model/Confession';

export async function createNewConfession() {
    await dbConnect();

    const confession = new ConfessionSchema({
        title: 'This is the title',
        author: 'Gaurav',
        description: 'hey there!',
    });
    await confession.save();
    return confession;
}
