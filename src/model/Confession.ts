import { Schema, model, models, Document } from 'mongoose';

export interface Confession extends Document {
    title: string;
    description: string;
    author: string;
}

export const ConfessionSchema = new Schema<Confession>({
    title: String,
    description: String,
    author: String,
});

export default models.Confession || model('Confession', ConfessionSchema);
