import { Document } from 'mongoose';
import dbConnect from '../lib/db';
import UserSchema, { User } from '../model/User';

export async function createMergeUser(user: User) {
    await dbConnect();

    const exists = await UserSchema.exists({ email: user.email }).exec();
    if (!exists) {
        const newUser = new UserSchema(user);
        await newUser.save();
        return newUser;
    }
}

export async function getUserDetails(email: string): Promise<User & Document> {
    const user = await UserSchema.findOne({ email }).lean().exec();
    return user;
}
