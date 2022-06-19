import { withDBConnection } from '../lib/db';
import UserSchema, { User } from '../model/User';

export async function createMergeUser(user: User) {
    await withDBConnection(async () => {
        const exists = await UserSchema.exists({ email: user.email }).exec();
        if (!exists) {
            const newUser = new UserSchema(user);
            await newUser.save();
        }
    });
}
