import { withDBConnection } from '../lib/db';
import ConfessionSchema, { Confession } from '../model/Confession';

export async function createNewConfession() {
    return await withDBConnection<Confession>(async () => {
        const confession = new ConfessionSchema({
            title: 'This is the title',
            author: 'Gaurav',
            description: 'hey there!',
        });
        await confession.save();
        return confession;
    });
}
