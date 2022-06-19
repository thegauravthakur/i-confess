import { Schema, model, models } from 'mongoose';

export interface User {
    name: string;
    email: string;
    avatar: string;
}

export const UserSchema = new Schema<User>({
    name: String,
    email: String,
    avatar: String,
});

export default models.User || model('User', UserSchema);
